interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="logo-cube" x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
          <stop offset="100%" stopColor="#c7d2fe" stopOpacity={0.8} />
        </linearGradient>
      </defs>
      {/* 圆角背景 */}
      <rect width="64" height="64" rx="14" fill="url(#logo-bg)" />
      {/* 前面 */}
      <polygon
        points="20,24 38,18 38,40 20,46"
        fill="rgba(255,255,255,0.15)"
        stroke="url(#logo-cube)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 右面 */}
      <polygon
        points="38,18 52,26 52,48 38,40"
        fill="rgba(255,255,255,0.08)"
        stroke="url(#logo-cube)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 顶面 */}
      <polygon
        points="20,24 34,16 52,26 38,18"
        fill="rgba(255,255,255,0.22)"
        stroke="url(#logo-cube)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 顶点发光 */}
      <circle cx="20" cy="24" r="2.5" fill="white" opacity={0.9} />
      <circle cx="52" cy="26" r="2" fill="white" opacity={0.6} />
      <circle cx="34" cy="16" r="2" fill="white" opacity={0.7} />
    </svg>
  )
}
