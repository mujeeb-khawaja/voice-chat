/**
 * speaker.js
 * ----------
 * TTS fallback chain:
 *   1. PRIMARY:  Gemini TTS (gemini-2.5-flash-preview-tts)
 *   2. FALLBACK: ElevenLabs — triggered automatically on Gemini quota/429 errors
 *
 * Callbacks:
 *   onStart()           — audio playback began
 *   onEnd()             — audio finished (or was stopped normally)
 *   onError(msg)        — both providers failed
 *   onFallback(reason)  — switched to ElevenLabs; reason: 'quota' | 'error'
 */

import { generateGeminiVoice, stopGeminiTts } from '../api/geminiTts';
import { generateElevenLabsVoice, stopElevenLabsTts } from '../api/elevenLabsTts';

export function stopSpeaking() {
  stopGeminiTts();
  stopElevenLabsTts();
  if (globalThis.speechSynthesis) {
    globalThis.speechSynthesis.cancel();
  }
}

function isQuotaError(msg) {
  const s = (msg || '').toLowerCase();
  return s.includes('429') || s.includes('quota') || s.includes('resource_exhausted') || s.includes('rate limit') || s.includes('rate_limit');
}

export function speakText(text, { onStart, onEnd, onError, onFallback } = {}) {
  stopSpeaking();

  const geminiKey     = import.meta.env.VITE_GEMINI_API_KEY;
  const elevenLabsKey = import.meta.env.VITE_ELEVEN_LABS_API_KEY;

  const tryElevenLabs = (geminiErr) => {
    const reason = isQuotaError(geminiErr) ? 'quota' : 'error';
    console.log(`[Speaker] Falling back to ElevenLabs (reason: ${reason}).`);
    onFallback?.(reason);

    if (!elevenLabsKey) {
      const msg = geminiErr
        ? `Gemini TTS failed and no ElevenLabs key found. Gemini error: ${geminiErr}`
        : 'No TTS API keys configured.';
      console.error(`[Speaker] ❌ ${msg}`);
      onError?.(msg);
      onEnd?.();
      return;
    }

    generateElevenLabsVoice(text, {
      onStart: () => {
        console.log('[Speaker] ✅ ElevenLabs TTS playing.');
        onStart?.();
      },
      onEnd: () => { onEnd?.(); },
      onError: (elevenErr) => {
        const msg = `Both TTS providers failed.\nGemini: ${geminiErr || 'n/a'}\nElevenLabs: ${elevenErr}`;
        console.error(`[Speaker] ❌ ${msg}`);
        onError?.(msg);
        onEnd?.();
      },
    });
  };

  // ── PRIMARY: Gemini TTS ────────────────────────────────────────────────────
  if (geminiKey) {
    console.log('[Speaker] Trying PRIMARY: Gemini TTS (Aoede)...');

    generateGeminiVoice(text, {
      onStart: () => {
        console.log('[Speaker] ✅ Gemini TTS playing.');
        onStart?.();
      },
      onEnd: () => { onEnd?.(); },
      onError: (geminiErr) => {
        console.warn(`[Speaker] ⚠️ Gemini TTS failed: ${geminiErr}`);
        tryElevenLabs(geminiErr);
      },
    });

    return;
  }

  // ── No Gemini key — use ElevenLabs directly ───────────────────────────────
  if (elevenLabsKey) {
    console.log('[Speaker] No Gemini key. Using ElevenLabs directly...');
    generateElevenLabsVoice(text, {
      onStart: () => { console.log('[Speaker] ✅ ElevenLabs TTS playing.'); onStart?.(); },
      onEnd: () => { onEnd?.(); },
      onError: (elevenErr) => {
        console.error(`[Speaker] ❌ ElevenLabs failed: ${elevenErr}`);
        onError?.(elevenErr);
        onEnd?.();
      },
    });
    return;
  }

  // ── Both missing ────────────────────────────────────────────────────────────
  const msg = 'No TTS keys found. Add VITE_GEMINI_API_KEY or VITE_ELEVEN_LABS_API_KEY to .env.';
  console.error(`[Speaker] ❌ ${msg}`);
  onError?.(msg);
  onEnd?.();
}
