import PropTypes from 'prop-types'
import { Bot } from 'lucide-react'

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  const time = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  /* ── User message (right-aligned) ── */
  if (isUser) {
    return (
      <div className="flex justify-end items-end gap-2">
        <div className="max-w-[75%]">
          <div className="bg-linear-to-br from-purple-600 to-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed shadow-lg">
            {message.text}
          </div>
          <p className="text-[11px] text-gray-600 mt-1 text-right pr-1">{time}</p>
        </div>

        <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shrink-0 mb-5">
          U
        </div>
      </div>
    )
  }

  /* ── AI message (left-aligned) ── */
  return (
    <div className="flex items-end gap-2">
      <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-700 to-blue-700 flex items-center justify-center shrink-0 mb-5">
        <Bot size={14} className="text-white" />
      </div>

      <div className="max-w-[75%]">
        <div className="bg-[#1e1e2a] text-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed border border-[#2e2e3e] shadow-lg">
          {message.text}

          {/* Blinking cursor while typing effect is running */}
          {message.isTyping && (
            <span
              className="inline-block w-0.5 h-3.5 bg-purple-400 ml-1 align-middle animate-pulse"
              aria-hidden="true"
            />
          )}
        </div>

        {!message.isTyping && (
          <p className="text-[11px] text-gray-600 mt-1 pl-1">{time}</p>
        )}
      </div>
    </div>
  )
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.oneOf(['user', 'ai']).isRequired,
    text: PropTypes.string.isRequired,
    isTyping: PropTypes.bool,
    timestamp: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
}
