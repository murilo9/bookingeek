import "./button-black.css";

export default function ButtonBlack({
  children,
  className,
  href,
}: {
  children: JSX.Element | string;
  className?: string;
  href?: string;
}) {
  return href ? (
    <a href={href}>
      <button className={`button-black ${className || ""}`}>{children}</button>
    </a>
  ) : (
    <button className={`button-black ${className || ""}`}>{children}</button>
  );
}
