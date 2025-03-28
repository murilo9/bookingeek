import "./mobile-menu.css";

const COMPANY_LINKS = [
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "Sign In",
    href: "https://app.bookingeek.com",
  },
  {
    title: "Sign Up",
    href: "https://app.bookingeek.com",
  },
];

export default function MobileMenu() {
  return (
    <div className="mobile-menu">
      <ul className="links-list">
        {COMPANY_LINKS.map((link) => (
          <li key={link.title}>
            <a href={link.href} target="_blank">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
