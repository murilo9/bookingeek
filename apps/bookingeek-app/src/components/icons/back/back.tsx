import { IconProps } from "../../../types/icon-props";

export default function BackIcon({ color, size }: IconProps) {
  const computedSize = size || 24;
  const computedColor = color ? color : "currentColor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke={computedColor}
      width={computedSize}
      height={computedSize}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
}
