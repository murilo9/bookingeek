import GithubIcon from "@/icons/github";
import "./footer.css";

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
  {
    title: "Support",
    href: "",
  },
  {
    title: "Terms of Use",
    href: "",
  },
];

const PARTNER_LINKS = [
  {
    title: "Sitehenger",
    href: "https://sitehenger.com",
  },
  {
    title: "Sanni Salokangas",
    href: "https://www.sannisalokangas.com/",
  },
];

const MEDIA_CREDITS = [
  {
    title: "Thirdman",
    href: "https://www.pexels.com/@thirdman/",
  },
  {
    title: "Natallia Photo",
    href: "https://www.pexels.com/@natallia-photo-311038782/",
  },
  {
    title: "Andrea Piacquadio",
    href: "https://www.pexels.com/@olly/",
  },
  {
    title: "Sora Shimazaki",
    href: "https://www.pexels.com/@sora-shimazaki/",
  },
  {
    title: "Nikolay Ivanov",
    href: "https://www.pexels.com/@nikolay-ivanov-167131/",
  },
  {
    title: "Bae Jun",
    href: "https://www.pexels.com/@bae-jun-193018126/",
  },
  {
    title: "Airam Dato-on",
    href: "https://www.pexels.com/@airamdphoto/",
  },
];

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <footer>
        <div className="body">
          <div className="left-content">
            <div className="left-content__header">
              <h1>Bookingeek</h1>
              <p>Your scheduling&apos;s new best friend.</p>
            </div>
            <ul className="social-links">
              <li>
                <a href="https://github.com/murilo9/bookingeek">
                  <GithubIcon size="32" />
                </a>
              </li>
            </ul>
          </div>
          <div className="right-content">
            <ul className="links-list">
              <li>Company</li>
              {COMPANY_LINKS.map((link) => (
                <li key={link.title}>
                  <a href={link.href}>{link.title}</a>
                </li>
              ))}
            </ul>
            <ul className="links-list">
              <li>Partners</li>
              {PARTNER_LINKS.map((link) => (
                <li key={link.title}>
                  <a href={link.href} target="_blank">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hr"></div>
        <div className="footer">
          <p>
            Media by{" "}
            {MEDIA_CREDITS.map(({ href, title }, index) => (
              <>
                {index ? " | " : null}
                <a href={href} target="blank" key={title}>
                  {title}
                </a>
              </>
            ))}
          </p>
          <p>Bookingeek - {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
