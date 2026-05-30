import fs from 'fs';

// Read .env file manually
const envFile = fs.readFileSync('.env', 'utf-8');
const geminiKeyLine = envFile.split('\n').find(line => line.startsWith('VITE_GEMINI_API_KEY='));
const apiKey = geminiKeyLine ? geminiKeyLine.split('=')[1].trim() : null;

if (!apiKey) {
  console.error("❌ ERROR: VITE_GEMINI_API_KEY is missing in your .env file.");
  process.exit(1);
}

console.log(`Testing Gemini TTS API Key: ${apiKey.substring(0, 10)}...`);

async function testGeminiTTS() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: "Hello, I am Aura, your voice assistant. How can I help you today?" }],
          },
        ],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: 'Aoede',
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`❌ HTTP Error: ${response.status}`);
      console.error(`Details: ${errBody}`);
      return;
    }

    const data = await response.json();
    const audioPart = data.candidates?.[0]?.content?.parts?.find(
      (p) => p.inlineData?.mimeType?.startsWith('audio/')
    );

    if (audioPart?.inlineData?.data) {
      const byteLength = Math.round((audioPart.inlineData.data.length * 3) / 4);
      console.log(`✅ Gemini TTS is working!`);
      console.log(`   Voice: Aoede (female)`);
      console.log(`   MIME type: ${audioPart.inlineData.mimeType}`);
      console.log(`   Audio data size: ~${(byteLength / 1024).toFixed(1)} KB`);
    } else {
      console.error("❌ No audio data found in response. Full response:");
      console.log(JSON.stringify(data, null, 2));
    }

  } catch (error) {
    console.error("❌ Network or Fetch Error:", error.message);
  }
}

testGeminiTTS();
