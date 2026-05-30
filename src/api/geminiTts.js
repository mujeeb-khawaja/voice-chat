/**
 * geminiTts.js — Google Gemini 2.5 Flash TTS integration
 * -------------------------------------------------------
 * Uses the Gemini generateContent API with a TTS model to synthesize speech.
 * Returns base64-encoded audio which is decoded and played via the Web Audio API.
 *
 * Voice: "Aoede" — a natural, warm female voice from Google's TTS roster.
 * Docs: https://ai.google.dev/api/generate-content#v1beta.GenerationConfig
 */

const GEMINI_TTS_MODEL = 'gemini-2.5-flash-preview-tts';
const VOICE_NAME = 'Aoede'; // Natural warm female voice

let sharedAudioCtx = null;

function getAudioContext(sampleRate = 24000) {
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new AudioContext({ sampleRate });
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

// Convert base64 string to ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binaryStr = atob(base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return bytes.buffer;
}

// Track current playing source so we can stop it
let currentSource = null;
let wasStopped = false; // flag: true when stopped manually (barge-in), suppresses onEnd

export function stopGeminiTts() {
  if (currentSource) {
    wasStopped = true;
    try {
      currentSource.stop();
    } catch (e) { /* already stopped */ }
    currentSource = null;
  }
}

/**
 * Synthesise `text` via Gemini TTS and play it via Web Audio.
 *
 * @param {string}   text         - The text to speak
 * @param {object}   [callbacks]
 * @param {Function} [callbacks.onStart]  - Called when audio starts playing
 * @param {Function} [callbacks.onEnd]    - Called when audio finishes
 * @param {Function} [callbacks.onError]  - Called with error string on failure
 */
export async function generateGeminiVoice(text, { onStart, onEnd, onError } = {}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    onError?.('VITE_GEMINI_API_KEY is missing — cannot use Gemini TTS.');
    onEnd?.();
    return;
  }

  try {
    console.log('[GeminiTTS] Requesting speech synthesis...');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_TTS_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text }],
            },
          ],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: VOICE_NAME,
                },
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Gemini TTS HTTP ${response.status}: ${errBody}`);
    }

    const data = await response.json();

    // Extract the base64 audio from the response
    const audioPart = data.candidates?.[0]?.content?.parts?.find(
      (p) => p.inlineData?.mimeType?.startsWith('audio/')
    );

    if (!audioPart?.inlineData?.data) {
      throw new Error('Gemini TTS returned no audio data in response.');
    }

    const mimeType = audioPart.inlineData.mimeType; // e.g. "audio/pcm;rate=24000"
    const base64Audio = audioPart.inlineData.data;
    const audioBuffer = base64ToArrayBuffer(base64Audio);

    console.log(`[GeminiTTS] Received audio (${mimeType}), playing...`);

    // Parse sample rate from mime type if present
    const rateMatch = mimeType.match(/rate=(\d+)/);
    const sampleRate = rateMatch ? parseInt(rateMatch[1], 10) : 24000;

    // Decode PCM int16 and play via Web Audio
    const audioCtx = getAudioContext(sampleRate);
    const pcm = new Int16Array(audioBuffer);
    const floatBuffer = audioCtx.createBuffer(1, pcm.length, sampleRate);
    const channel = floatBuffer.getChannelData(0);

    for (let i = 0; i < pcm.length; i++) {
      channel[i] = pcm[i] / 32768;
    }

    const source = audioCtx.createBufferSource();
    currentSource = source;
    wasStopped = false; // reset flag for this new playback
    source.buffer = floatBuffer;
    source.connect(audioCtx.destination);

    source.onended = () => {
      currentSource = null;
      if (wasStopped) {
        // Interrupted by user — do NOT call onEnd to avoid loop re-trigger
        console.log('[GeminiTTS] Playback interrupted by user (barge-in). onEnd suppressed.');
        wasStopped = false;
        return;
      }
      console.log('[GeminiTTS] Playback finished naturally.');
      onEnd?.();
    };

    onStart?.();
    source.start(0);

  } catch (err) {
    const msg = err.message || 'Unknown Gemini TTS error';
    console.error('[GeminiTTS] Error:', msg);
    onError?.(msg);
    onEnd?.();
  }
}
