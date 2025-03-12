import { IconProps } from "../../../types/icon-props";

export default function ToggleOffIcon({ size }: IconProps) {
  const computedSize = size || 24;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={computedSize}
      height={computedSize}
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="12" y="7" width="16" height="10" rx="5" fill="#777777" />
      <g filter="url(#filter0_d_378_173)">
        <rect x="4" y="4" width="16" height="16" rx="8" fill="#F8F8F8" />
      </g>
      <defs>
        <filter
          id="filter0_d_378_173"
          x="0"
          y="0"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_378_173"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_378_173"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
