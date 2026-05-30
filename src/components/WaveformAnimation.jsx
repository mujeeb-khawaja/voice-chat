/**
 * WaveformAnimation
 * -----------------
 * Renders 7 vertical bars that bounce up and down like an audio waveform.
 * When `isActive` is false the bars collapse to their minimum height.
 *
 * Props:
 *   isActive  {boolean}  Whether the microphone is currently listening.
 */

const BAR_DELAYS = ['0s', '0.1s', '0.2s', '0.3s', '0.15s', '0.25s', '0.05s']

export default function WaveformAnimation({ isActive }) {
  return (
    <div
      className="flex items-center gap-[3px]"
      style={{ height: '24px' }}
      aria-hidden="true"
    >
      {BAR_DELAYS.map((delay, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full bg-purple-400 transition-all duration-200 ${
            isActive ? 'animate-waveform' : ''
          }`}
          style={{
            animationDelay: delay,
            /* When not active, keep bars at min height */
            height: isActive ? undefined : '4px',
          }}
        />
      ))}
    </div>
  )
}
