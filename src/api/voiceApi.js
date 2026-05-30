/**
 * voiceApi.js  —  Rumik AI "Silk" TTS integration
 * -------------------------------------------------
 * Uses the WebSocket streaming endpoint for real-time, low-latency playback.
 *
 * Flow:
 *   1. POST /v1/tts/ws-connect  → { ws_url, token }   (mint a one-shot session)
 *   2. WebSocket connect(ws_url?token=...)
 *   3. Send synthesis JSON frame
 *   4. Receive raw PCM int16 @ 24 kHz mono in binary frames
 *   5. Decode each chunk → Web Audio API float32 buffer → schedule playback
 *   6. Terminal { type: "done" } closes the connection
 *
 * Docs: https://silk-api.rumik.ai  (Bearer token = VITE_RUMIK_API_KEY)
 */

const BASE_URL = 'https://silk-api.rumik.ai'

// Reuse a single AudioContext across calls (browsers block creation outside a
// user gesture, but the context was already created by the mic click).
let sharedAudioCtx = null

function getAudioContext() {
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new AudioContext({ sampleRate: 24000 })
  }
  // Resume in case the browser suspended it
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume()
  }
  return sharedAudioCtx
}

/**
 * Synthesise `text` via Rumik Silk and stream audio straight to the speakers.
 *
 * @param {string}   text         - The text to speak.
 * @param {object}   [callbacks]
 * @param {Function} [callbacks.onError]  - Called with an error message string.
 * @param {Function} [callbacks.onStart]  - Called just before audio starts playing.
 * @param {Function} [callbacks.onEnd]    - Called when playback / streaming is done.
 */
export async function generateVoice(text, { onError, onStart, onEnd } = {}) {
  const apiKey = import.meta.env.VITE_RUMIK_API_KEY

  // ── Guard: key missing ──────────────────────────────────────────────────
  if (!apiKey) {
    const msg =
      'VITE_RUMIK_API_KEY is not set. ' +
      'Add it to ai-voice-chat/.env and restart the dev server.'
    console.error('[RumikAPI]', msg)
    onError?.(msg)
    onEnd?.()
    return
  }

  try {
    // ── Step 1: Mint a one-shot WebSocket session ──────────────────────────
    console.log('[RumikAPI] Minting WebSocket session…')

    const mintRes = await fetch(`${BASE_URL}/v1/tts/ws-connect`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: 'mulberry', text }),
    })

    if (!mintRes.ok) {
      // Try to parse the { error, code } body Rumik returns on errors
      let errMsg
      try {
        const body = await mintRes.json()
        errMsg = body.error || `HTTP ${mintRes.status}`
      } catch {
        errMsg = `HTTP ${mintRes.status} ${mintRes.statusText}`
      }
      throw new Error(errMsg)
    }

    const { ws_url, token } = await mintRes.json()
    console.log('[RumikAPI] Session minted, connecting to WebSocket…')

    // ── Step 2: Set up Web Audio API for streaming playback ───────────────
    const audioCtx = getAudioContext()
    // `playAt` is a wall-clock cursor; we schedule each PCM chunk right after
    // the previous one so there are no gaps or overlaps.
    let playAt = audioCtx.currentTime

    onStart?.()

    // ── Step 3: Open WebSocket, send synthesis frame, receive PCM ─────────
    await new Promise((resolve, reject) => {
      const ws = new WebSocket(`${ws_url}?token=${encodeURIComponent(token)}`)
      ws.binaryType = 'arraybuffer'

      ws.onopen = () => {
        console.log('[RumikAPI] WebSocket open — sending synthesis request')
        ws.send(
          JSON.stringify({
            text,
            description: "calm female narrator",
            // We omit the speaker parameter so it uses the 'description' female voice
            f0_up_key: 0,
          })
        )
      }

      ws.onmessage = (e) => {
        // Binary frame → PCM int16 little-endian @ 24 kHz mono
        if (e.data instanceof ArrayBuffer) {
          const pcm = new Int16Array(e.data)

          // Create a float32 mono AudioBuffer for the Web Audio API
          const audioBuf = audioCtx.createBuffer(1, pcm.length, 24000)
          const channel = audioBuf.getChannelData(0)
          for (let i = 0; i < pcm.length; i++) {
            // int16 [-32768, 32767] → float32 [-1.0, 1.0]
            channel[i] = pcm[i] / 32768
          }

          // Schedule this chunk to play immediately after the previous one
          const src = audioCtx.createBufferSource()
          src.buffer = audioBuf
          src.connect(audioCtx.destination)

          // Avoid drift: if we're behind (e.g. a slow chunk), catch up
          playAt = Math.max(playAt, audioCtx.currentTime)
          src.start(playAt)
          playAt += audioBuf.duration
        } else {
          // Text frame — either { type: "done" } or { error: "..." }
          try {
            const msg = JSON.parse(e.data)
            if (msg.type === 'done') {
              console.log('[RumikAPI] Stream complete')
              ws.close()
            } else if (msg.error) {
              reject(new Error(msg.error))
              ws.close()
            }
          } catch {
            // Ignore non-JSON text frames
          }
        }
      }

      ws.onclose  = () => resolve()
      ws.onerror  = () => reject(new Error('WebSocket connection error — check network or CORS'))
    })

  } catch (err) {
    const msg = err.message || 'Unknown voice API error'
    console.error('[RumikAPI] Error:', msg)
    onError?.(msg)
  } finally {
    onEnd?.()
  }
}
