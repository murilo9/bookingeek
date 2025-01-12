import { IconProps } from "../../types/icon-props";

export default function ServiceIcon({ color, size }: IconProps) {
  const computedSize = size || 24;
  const computedColor = color ? color : "currentColor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={computedColor}
      width={computedSize}
      height={computedSize}
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M80-200v-80h800v80H80Zm40-120v-40q0-128 78.5-226T400-710v-10q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720v10q124 26 202 124t78 226v40H120Zm82-80h556q-14-104-93-172t-185-68q-106 0-184.5 68T202-400Zm278 0Z" />
    </svg>
  );
}