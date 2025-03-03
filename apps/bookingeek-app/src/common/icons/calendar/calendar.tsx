import { IconProps } from "../../types/icon-props";

export default function CalendarIcon({ color, size }: IconProps) {
  const computedSize = size || 24;
  const computedColor = color ? color : "currentColor";

  return (
    <svg
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={computedColor}
      width={computedSize}
      height={computedSize}
      strokeWidth={0.2}
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
    </svg>
  );
}
