import { IconProps } from "../../types/icon-props";

export default function ResourcesIcon({ color, size }: IconProps) {
  const computedSize = size || 24;
  const computedColor = color ? color : "currentColor";

  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={computedColor}
      width={computedSize}
      height={computedSize}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V7C3 7.53043 3.21071 8.03914 3.58579 8.41421C3.96086 8.78929 4.46957 9 5 9H7C7.53043 9 8.03914 8.78929 8.41421 8.41421C8.78929 8.03914 9 7.53043 9 7V5C9 4.46957 8.78929 3.96086 8.41421 3.58579C8.03914 3.21071 7.53043 3 7 3H5ZM5 11C4.46957 11 3.96086 11.2107 3.58579 11.5858C3.21071 11.9609 3 12.4696 3 13V15C3 15.5304 3.21071 16.0391 3.58579 16.4142C3.96086 16.7893 4.46957 17 5 17H7C7.53043 17 8.03914 16.7893 8.41421 16.4142C8.78929 16.0391 9 15.5304 9 15V13C9 12.4696 8.78929 11.9609 8.41421 11.5858C8.03914 11.2107 7.53043 11 7 11H5ZM11 5C11 4.46957 11.2107 3.96086 11.5858 3.58579C11.9609 3.21071 12.4696 3 13 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V7C17 7.53043 16.7893 8.03914 16.4142 8.41421C16.0391 8.78929 15.5304 9 15 9H13C12.4696 9 11.9609 8.78929 11.5858 8.41421C11.2107 8.03914 11 7.53043 11 7V5ZM11 13C11 12.4696 11.2107 11.9609 11.5858 11.5858C11.9609 11.2107 12.4696 11 13 11H15C15.5304 11 16.0391 11.2107 16.4142 11.5858C16.7893 11.9609 17 12.4696 17 13V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17H13C12.4696 17 11.9609 16.7893 11.5858 16.4142C11.2107 16.0391 11 15.5304 11 15V13Z"
        fill="black"
      />
    </svg>
  );
}
