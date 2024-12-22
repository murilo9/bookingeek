export default function Button(props: {
  children?: JSX.Element | string | number;
  color: "primary" | "secondary" | "danger";
}) {
  return <button {...props} />;
}
