import { IconProps } from "../../../types/icon-props";

export default function BuildingIcon({ color, size }: IconProps) {
  const computedSize = size || 24;
  const computedColor = color ? color : "currentColor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      stroke={computedColor}
      width={computedSize}
      height={computedSize}
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M80-120v-720h400v160h400v560H80Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h320v-400H480v80h80v80h-80v80h80v80h-80v80Zm160-240v-80h80v80h-80Zm0 160v-80h80v80h-80Z" />
    </svg>
  );
}
