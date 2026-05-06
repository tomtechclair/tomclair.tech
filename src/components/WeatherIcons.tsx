import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 64 64",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
});

/* Reusable cloud path (puffy, iOS-like) */
const CLOUD_PATH =
  "M16 50c-5.5 0-9.5-4-9.5-9 0-4.6 3.5-8.4 8-8.9 0.6-4.2 4.2-7.4 8.6-7.4 1.6 0 3.1 0.4 4.4 1.2 2.3-4.4 6.9-7.4 12.2-7.4 7.6 0 13.8 6.1 13.8 13.7 0 0.6 0 1.2-0.1 1.8 3.5 0.9 6.1 4 6.1 7.7 0 4.4-3.6 8-8 8H16Z";

const SMALL_CLOUD_PATH =
  "M22 32c-3.5 0-6.3-2.7-6.3-6 0-3.1 2.4-5.7 5.5-6 0.4-2.7 2.7-4.8 5.5-4.8 1 0 2 0.3 2.8 0.7 1.5-2.8 4.4-4.7 7.8-4.7 4.9 0 8.8 3.9 8.8 8.7 0 0.4 0 0.8-0.1 1.2 2.2 0.6 3.9 2.6 3.9 5 0 2.8-2.3 5-5 5H22Z";

/* ---------- ICONS ---------- */

export const SunIcon = ({ size = 32, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <radialGradient id="sun-core" cx="38%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#FFFCE0" />
        <stop offset="35%" stopColor="#FFE066" />
        <stop offset="75%" stopColor="#FFA522" />
        <stop offset="100%" stopColor="#E26A00" />
      </radialGradient>
      <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE066" stopOpacity="0.55" />
        <stop offset="60%" stopColor="#FFB02E" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#FFB02E" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="sun-ray" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF1A8" />
        <stop offset="100%" stopColor="#FFA522" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#sun-glow)" />
    {Array.from({ length: 8 }).map((_, i) => (
      <rect
        key={i}
        x="30"
        y="2"
        width="4"
        height="10"
        rx="2"
        fill="url(#sun-ray)"
        transform={`rotate(${i * 45} 32 32)`}
      />
    ))}
    <circle cx="32" cy="32" r="14" fill="url(#sun-core)" stroke="#E26A00" strokeWidth="0.5" />
    <ellipse cx="27" cy="26" rx="6" ry="3.2" fill="#FFFBE5" opacity="0.6" />
    <circle cx="36" cy="36" r="2" fill="#FFFBE5" opacity="0.35" />
  </svg>
);

export const CloudSunIcon = ({ size = 32, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <radialGradient id="cs-core" cx="40%" cy="38%" r="65%">
        <stop offset="0%" stopColor="#FFF6C2" />
        <stop offset="60%" stopColor="#FFC83D" />
        <stop offset="100%" stopColor="#F58A07" />
      </radialGradient>
      <radialGradient id="cs-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD24A" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FFD24A" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="cs-cloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBFDFF" />
        <stop offset="55%" stopColor="#DCE5F0" />
        <stop offset="100%" stopColor="#A6B5C8" />
      </linearGradient>
      <linearGradient id="cs-cloud-hl" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="22" cy="20" r="16" fill="url(#cs-glow)" />
    {Array.from({ length: 8 }).map((_, i) => (
      <rect key={i} x="20.8" y="2" width="2.4" height="6" rx="1.2" fill="#FFC83D" transform={`rotate(${i * 45} 22 20)`} />
    ))}
    <circle cx="22" cy="20" r="9" fill="url(#cs-core)" />
    <path d={CLOUD_PATH} fill="url(#cs-cloud)" stroke="#7C8DA3" strokeWidth="0.6" />
    <path d="M14 36c0-3.5 2.6-6.4 6-6.9" stroke="url(#cs-cloud-hl)" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const CloudIcon = ({ size = 32, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <linearGradient id="c-cloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBFDFF" />
        <stop offset="55%" stopColor="#D6E0EC" />
        <stop offset="100%" stopColor="#94A6BC" />
      </linearGradient>
      <linearGradient id="c-cloud-hl" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d={CLOUD_PATH} fill="url(#c-cloud)" stroke="#738499" strokeWidth="0.6" />
    <path d="M14 36c0-3.5 2.6-6.4 6-6.9" stroke="url(#c-cloud-hl)" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const CloudsIcon = ({ size = 32, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <linearGradient id="cs2-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#8A99AE" />
      </linearGradient>
      <linearGradient id="cs2-fg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBFDFF" />
        <stop offset="55%" stopColor="#D6E0EC" />
        <stop offset="100%" stopColor="#94A6BC" />
      </linearGradient>
    </defs>
    <g transform="translate(8 -6) scale(0.75)">
      <path d={CLOUD_PATH} fill="url(#cs2-bg)" opacity="0.85" stroke="#6E7E94" strokeWidth="0.6" />
    </g>
    <path d={CLOUD_PATH} fill="url(#cs2-fg)" stroke="#738499" strokeWidth="0.6" transform="translate(-2 6)" />
  </svg>
);

export const RainIcon = ({ size = 32, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <linearGradient id="r-cloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D8E0EA" />
        <stop offset="100%" stopColor="#6F7E94" />
      </linearGradient>
      <linearGradient id="r-drop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#9BD2FF" />
        <stop offset="100%" stopColor="#1F6FCC" />
      </linearGradient>
    </defs>
    <g transform="translate(0 -8)">
      <path d={CLOUD_PATH} fill="url(#r-cloud)" stroke="#5C6B82" strokeWidth="0.6" />
    </g>
    {[
      [20, 46],
      [30, 48],
      [40, 46],
      [25, 56],
      [36, 56],
    ].map(([x, y], i) => (
      <path
        key={i}
        d={`M${x} ${y} q-1.2 3 -1.2 4.5 a2 2 0 0 0 4 0 c0 -1.5 -1.2 -1.5 -2.8 -4.5 Z`}
        fill="url(#r-drop)"
        stroke="#1A5AAB"
        strokeWidth="0.4"
      />
    ))}
  </svg>
);

export const HeavyRainIcon = ({ size = 32, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <linearGradient id="hr-cloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B8C4D4" />
        <stop offset="100%" stopColor="#52617A" />
      </linearGradient>
      <linearGradient id="hr-drop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#9BD2FF" />
        <stop offset="100%" stopColor="#1456A8" />
      </linearGradient>
    </defs>
    <g transform="translate(0 -10)">
      <path d={CLOUD_PATH} fill="url(#hr-cloud)" stroke="#3F4D63" strokeWidth="0.6" />
    </g>
    {[
      [16, 44],
      [24, 46],
      [32, 44],
      [40, 46],
      [48, 44],
      [20, 55],
      [28, 57],
      [36, 55],
      [44, 57],
    ].map(([x, y], i) => (
      <path
        key={i}
        d={`M${x} ${y} q-1.2 3 -1.2 4.5 a2 2 0 0 0 4 0 c0 -1.5 -1.2 -1.5 -2.8 -4.5 Z`}
        fill="url(#hr-drop)"
        stroke="#0F4A94"
        strokeWidth="0.4"
      />
    ))}
  </svg>
);

export const StormIcon = ({ size = 32, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <linearGradient id="st-cloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A8B4C6" />
        <stop offset="100%" stopColor="#2E394C" />
      </linearGradient>
      <linearGradient id="st-bolt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF5A8" />
        <stop offset="55%" stopColor="#FFC83D" />
        <stop offset="100%" stopColor="#FF7A00" />
      </linearGradient>
    </defs>
    <g transform="translate(0 -10)">
      <path d={CLOUD_PATH} fill="url(#st-cloud)" stroke="#1F2A3C" strokeWidth="0.6" />
    </g>
    <path
      d="M34 38 L22 56 L30 56 L26 64 L42 44 L34 44 L38 38 Z"
      fill="url(#st-bolt)"
      stroke="#B36100"
      strokeWidth="0.7"
      strokeLinejoin="round"
      filter="drop-shadow(0 0 2px #FFC83D)"
    />
  </svg>
);

export const SnowIcon = ({ size = 32, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <linearGradient id="sn-cloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F5F9FF" />
        <stop offset="100%" stopColor="#8FA3BF" />
      </linearGradient>
      <radialGradient id="sn-flake" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#BFE0FF" />
      </radialGradient>
    </defs>
    <g transform="translate(0 -10)">
      <path d={CLOUD_PATH} fill="url(#sn-cloud)" stroke="#6F82A0" strokeWidth="0.6" />
    </g>
    {[
      [18, 47],
      [30, 51],
      [42, 47],
      [24, 58],
      [36, 58],
      [48, 54],
    ].map(([cx, cy], i) => (
      <g key={i}>
        <g stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" filter="drop-shadow(0 0 1px #BFE0FF)">
          <line x1={cx} y1={cy - 3.4} x2={cx} y2={cy + 3.4} />
          <line x1={cx - 3.4} y1={cy} x2={cx + 3.4} y2={cy} />
          <line x1={cx - 2.4} y1={cy - 2.4} x2={cx + 2.4} y2={cy + 2.4} />
          <line x1={cx - 2.4} y1={cy + 2.4} x2={cx + 2.4} y2={cy - 2.4} />
        </g>
        <circle cx={cx} cy={cy} r="1.2" fill="url(#sn-flake)" />
      </g>
    ))}
  </svg>
);

export const WindIcon = ({ size = 32, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <linearGradient id="w-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#E5EEFA" stopOpacity="0.3" />
        <stop offset="40%" stopColor="#E5EEFA" />
        <stop offset="100%" stopColor="#B8C9DD" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#w-line)" strokeWidth="3.5" strokeLinecap="round">
      <path d="M6 22 H40 a6 6 0 1 0 -6 -6" />
      <path d="M4 34 H50 a7 7 0 1 1 -7 7" />
      <path d="M10 46 H34 a5 5 0 1 0 -5 -5" />
    </g>
  </svg>
);

export const FogIcon = ({ size = 32, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <linearGradient id="fg-cloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#8A99AE" />
      </linearGradient>
    </defs>
    <g transform="translate(0 -14)">
      <path d={CLOUD_PATH} fill="url(#fg-cloud)" stroke="#7384A0" strokeWidth="0.6" />
    </g>
    {[44, 51, 58].map((y, i) => (
      <line
        key={i}
        x1={i === 1 ? 4 : 8}
        y1={y}
        x2={i === 1 ? 60 : 56}
        y2={y}
        stroke="#D7E1ED"
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0.95 - i * 0.18}
      />
    ))}
  </svg>
);

export const MoonIcon = ({ size = 32, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <radialGradient id="mn-g" cx="35%" cy="35%" r="80%">
        <stop offset="0%" stopColor="#FFFBE3" />
        <stop offset="55%" stopColor="#F4D97C" />
        <stop offset="100%" stopColor="#B98724" />
      </radialGradient>
      <radialGradient id="mn-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#FFE9A8" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="28" r="26" fill="url(#mn-glow)" />
    <path
      d="M46 38 A20 20 0 1 1 26 12 A16 16 0 0 0 46 38 Z"
      fill="url(#mn-g)"
      stroke="#9B7220"
      strokeWidth="0.8"
    />
    <circle cx="36" cy="22" r="1.8" fill="#B98724" opacity="0.55" />
    <circle cx="40" cy="30" r="1.2" fill="#B98724" opacity="0.45" />
    <circle cx="32" cy="34" r="0.9" fill="#B98724" opacity="0.4" />
  </svg>
);

export const CloudMoonIcon = ({ size = 32, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <radialGradient id="cm-moon" cx="35%" cy="35%" r="80%">
        <stop offset="0%" stopColor="#FFF8DC" />
        <stop offset="60%" stopColor="#F2D684" />
        <stop offset="100%" stopColor="#C99B3C" />
      </radialGradient>
      <linearGradient id="cm-cloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBFDFF" />
        <stop offset="55%" stopColor="#DCE5F0" />
        <stop offset="100%" stopColor="#A6B5C8" />
      </linearGradient>
    </defs>
    <path
      d="M34 24 A12 12 0 1 1 22 9 A10 10 0 0 0 34 24 Z"
      fill="url(#cm-moon)"
      stroke="#A87E2A"
      strokeWidth="0.7"
    />
    <path d={CLOUD_PATH} fill="url(#cm-cloud)" stroke="#7C8DA3" strokeWidth="0.6" />
  </svg>
);

/* Small UI icons */
export const DropletIcon = ({ size = 16, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <defs>
      <linearGradient id="dp-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A8DBFF" />
        <stop offset="100%" stopColor="#1F6FCC" />
      </linearGradient>
    </defs>
    <path
      d="M32 6 C20 22 14 32 14 42 a18 18 0 0 0 36 0 C50 32 44 22 32 6 Z"
      fill="url(#dp-g)"
      stroke="#1A5AAB"
      strokeWidth="1.5"
    />
    <ellipse cx="24" cy="36" rx="3.5" ry="6" fill="#FFFFFF" opacity="0.4" />
  </svg>
);

export const WindSmallIcon = WindIcon;

export const EyeIcon = ({ size = 16, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path
      d="M4 32 C12 18 22 12 32 12 s20 6 28 20 c-8 14 -18 20 -28 20 S12 46 4 32 Z"
      fill="none"
      stroke="#E5EEFA"
      strokeWidth="3"
    />
    <circle cx="32" cy="32" r="8" fill="#E5EEFA" />
    <circle cx="29" cy="29" r="2.5" fill="#1F2937" />
  </svg>
);
