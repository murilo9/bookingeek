import { IconProps } from "../../types/icon-props";

export default function RadioEmptyIcon({ color, size }: IconProps) {
  const computedSize = size || 24;
  const computedColor = color ? color : "currentColor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke={computedColor}
      width={computedSize}
      height={computedSize}
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
    </svg>
  );
}
