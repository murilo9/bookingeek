import MenuIcon from "@/icons/menu";
import "./header.css";
import ButtonBlack from "../button-black/button-black";

export default function Header() {
  return (
    <header>
      <div className="left-container">
        <img src="/logo.svg" alt="Logo" className="logo" />
        <img src="/bookingeek.svg" alt="Bookingeek" className="bookingeek" />
      </div>
      <div className="right-container">
        <ul className="desktop-links">
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <button>Sign In</button>
          </li>
          <ButtonBlack>Sign Up</ButtonBlack>
        </ul>
        <button className="mobile-menu">
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}
