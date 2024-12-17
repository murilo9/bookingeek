import "./button-black.css";

export default function ButtonBlack({
  children,
  className,
}: {
  children: JSX.Element | string;
  className?: string;
}) {
  return (
    <button className={`button-black ${className || ""}`}>{children}</button>
  );
}
