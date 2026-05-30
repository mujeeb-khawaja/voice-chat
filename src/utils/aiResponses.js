/**
 * aiResponses.js
 * --------------
 * Mock AI response logic — keyword matching until a real LLM is wired up.
 *
 * How it works:
 *   1. Scan the user message for any keyword in the `rules` array.
 *   2. Return the matching response.
 *   3. If nothing matches, return a random fallback reply.
 */

// Each rule maps a list of trigger keywords to a response string.
const rules = [
  {
    keywords: ['hello', 'hi', 'hey', 'howdy', 'greetings'],
    response: "Hello! How can I help you today?",
  },
  {
    keywords: ['how are you', "how's it going", 'how do you do'],
    response: "I'm doing great, thanks for asking! How can I assist you?",
  },
  {
    keywords: ['your name', 'who are you', 'what are you', 'what is your name'],
    response: "I'm your AI voice assistant, powered by cutting-edge technology. Nice to meet you!",
  },
  {
    keywords: ['help', 'assist', 'support', 'what can you do'],
    response: "I can answer questions, have a conversation, or just keep you company. What do you need?",
  },
  {
    keywords: ['weather', 'temperature', 'forecast', 'rain', 'sunny'],
    response: "I don't have live weather data yet, but that integration is coming soon!",
  },
  {
    keywords: ['time', 'date', 'today', "what day"],
    response: `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`,
  },
  {
    keywords: ['joke', 'funny', 'laugh', 'humor'],
    response: "Why don't scientists trust atoms? Because they make up everything! 😄",
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'grateful'],
    response: "You're very welcome! Is there anything else I can help you with?",
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'farewell', 'ciao'],
    response: "Goodbye! Have a wonderful day. Feel free to come back anytime! 👋",
  },
  {
    keywords: ['yes', 'yeah', 'sure', 'absolutely', 'of course'],
    response: "Great! What would you like to do next?",
  },
  {
    keywords: ['no', 'nope', 'not really', 'never mind'],
    response: "No problem at all! Just let me know if anything else comes up.",
  },
  {
    keywords: ['amazing', 'awesome', 'cool', 'great', 'nice', 'wow'],
    response: "Glad you think so! Anything else I can help you with?",
  },
  {
    keywords: ['react', 'javascript', 'coding', 'programming', 'code'],
    response: "React is a fantastic library! Are you building something interesting with it?",
  },
  {
    keywords: ['music', 'song', 'play', 'listen'],
    response: "I love music! I can't play songs yet, but that's definitely on the roadmap.",
  },
  {
    keywords: ['love', 'like', 'enjoy'],
    response: "That's wonderful! Passion makes everything better. Tell me more!",
  },
]

// Fallback replies when no keyword matches
const fallbacks = [
  "That's interesting! Tell me more.",
  "I'm still learning, but I'm here to help. Could you elaborate?",
  "Great point! How can I assist you further?",
  "I see. Is there something specific you'd like to explore?",
  "Hmm, let me think about that... What else is on your mind?",
  "Interesting! I'm not sure I have the full picture yet — can you say more?",
]

/**
 * Returns a canned AI response for the given user message.
 * @param {string} userMessage - Raw text from the user.
 * @returns {string} - AI response string.
 */
export function getAIResponse(userMessage) {
  const lower = userMessage.toLowerCase()

  // Try each rule in order; return the first match.
  for (const { keywords, response } of rules) {
    if (keywords.some(kw => lower.includes(kw))) {
      return response
    }
  }

  // No match — return a random fallback.
  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}
