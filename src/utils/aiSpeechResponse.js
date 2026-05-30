/**
 * aiSpeechResponse.js
 * -------------------
 * Integrates with the Google Gemini API to provide a live, dynamic "brain" for the voice assistant.
 * Handles API calls, processes Roman Urdu/English natively, and handles visual theme modifications.
 * ALL hardcoded fallback AI responses have been removed. If the Gemini key is missing, it will error out.
 */

export async function getGeminiResponse(userQuery, currentTheme) {
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!geminiKey) {
    const errorMsg = 'VITE_GEMINI_API_KEY is not defined in your .env file. The AI brain is currently offline.';
    console.error(`[GeminiAPI] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  try {
    console.log('[GeminiAPI] Sending query:', userQuery);
    
    // System instruction to keep responses brief and conversational
    const systemPrompt = 
      "You are Aura, a futuristic AI voice assistant for a luxury watch store called Timeless. " +
      "You are in a live voice conversation with the user. Speak naturally and freely — like a real human. " +
      "Give complete, thoughtful responses. Do not artificially cut yourself short. " +
      "Do not output any markdown formatting, asterisks, bullet points, or list structures — only plain spoken text. " +
      "If the user speaks Roman Urdu or Urdu (e.g., 'Ap itni short short responses q deti ho'), reply fully in Roman Urdu/Hindi. " +
      "If the user asks you to change your visual theme, color, or orb color (e.g. to blue, green, red, gold, pink, or purple), " +
      "you must end your response with a special tag: [THEME:color_name] where color_name is one of: blue, green, red, gold, pink, purple. " +
      "If the user wants to view, browse, navigate to, or see a specific watch or collection, " +
      "you must end your response with a special tag: [ROUTE:route_name] where route_name is one of: " +
      "home (landing page / main showroom), executive-black, rose-gold, carbon-racer, mens-hub (Men's collection overview), " +
      "mens-classic, mens-sports, noir-chic, womens-hub (Women's collection overview), womens-elegant, womens-fashion. " +
      "Examples: \n" +
      "- 'Certainly! Let's take a look at the Carbon Racer. [ROUTE:carbon-racer]'\n" +
      "- 'Sure, changing my theme to green. [THEME:green]'\n" +
      "- 'Welcome to the Men's collection hub. [ROUTE:mens-hub]'";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUser: ${userQuery}` }]
            }
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1000
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    let textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Clean up response text (strip out asterisks or markdown code blocks which sound bad in TTS)
    textResponse = textResponse.replace(/[*#`_\-]/g, '').trim();

    // Check for theme updates in the response
    let themeChange = null;
    const themeMatch = textResponse.match(/\[THEME:(\w+)\]/);
    if (themeMatch) {
      themeChange = themeMatch[1].toLowerCase();
      // Remove the tag from the text we speak
      textResponse = textResponse.replace(/\[THEME:\w+\]/, '').trim();
    }

    // Check for route changes in the response
    let routeChange = null;
    const routeMatch = textResponse.match(/\[ROUTE:([\w\-]+)\]/);
    if (routeMatch) {
      routeChange = routeMatch[1].toLowerCase();
      // Remove the tag from the text we speak
      textResponse = textResponse.replace(/\[ROUTE:[\w\-]+\]/, '').trim();
    }

    // Determine if user wanted to say goodbye
    const lowerQuery = userQuery.toLowerCase();
    const isGoodbye = lowerQuery.includes('goodbye') || 
                      lowerQuery.includes('bye bye') || 
                      (lowerQuery.includes('exit') && lowerQuery.length < 8);

    return {
      text: textResponse || "I heard you, but I couldn't generate a reply.",
      themeChange,
      routeChange,
      isGoodbye
    };

  } catch (error) {
    console.error('[GeminiAPI] Error generating response:', error);
    throw error;
  }
}
