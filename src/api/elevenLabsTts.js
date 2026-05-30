/**
 * elevenLabsTts.js — ElevenLabs TTS integration
 * -----------------------------------------------
 * Fetches MP3 audio from ElevenLabs and plays it via the HTML Audio element.
 * Used as a fallback when Gemini TTS hits quota limits.
 */

let currentAudio = null;
let wasStopped = false;

export function stopElevenLabsTts() {
  if (currentAudio) {
    wasStopped = true;
    try {
      currentAudio.pause();
      if (currentAudio._objectUrl) {
        URL.revokeObjectURL(currentAudio._objectUrl);
      }
    } catch (_) {}
    currentAudio = null;
  }
}

/**
 * @param {string}   text
 * @param {object}   [callbacks]
 * @param {Function} [callbacks.onStart]
 * @param {Function} [callbacks.onEnd]
 * @param {Function} [callbacks.onError]
 */
export async function generateElevenLabsVoice(text, { onStart, onEnd, onError } = {}) {
  const apiKey = import.meta.env.VITE_ELEVEN_LABS_API_KEY;
  const voiceId = import.meta.env.VITE_VOICE_ID;

  if (!apiKey || !voiceId) {
    onError?.('VITE_ELEVEN_LABS_API_KEY or VITE_VOICE_ID not set in .env');
    onEnd?.();
    return;
  }

  try {
    console.log('[ElevenLabsTTS] Requesting synthesis...');

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`ElevenLabs HTTP ${response.status}: ${errBody}`);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const audio = new Audio(objectUrl);
    audio._objectUrl = objectUrl;
    currentAudio = audio;
    wasStopped = false;

    audio.onended = () => {
      URL.revokeObjectURL(objectUrl);
      currentAudio = null;
      if (wasStopped) {
        wasStopped = false;
        return;
      }
      console.log('[ElevenLabsTTS] Playback finished naturally.');
      onEnd?.();
    };

    audio.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      currentAudio = null;
      onError?.('ElevenLabs audio playback error');
      onEnd?.();
    };

    console.log('[ElevenLabsTTS] Playing audio...');
    onStart?.();
    await audio.play();

  } catch (err) {
    const msg = err.message || 'Unknown ElevenLabs TTS error';
    console.error('[ElevenLabsTTS] Error:', msg);
    onError?.(msg);
    onEnd?.();
  }
}
