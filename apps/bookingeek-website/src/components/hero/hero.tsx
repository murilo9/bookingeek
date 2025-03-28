import ButtonBlack from "../button-black/button-black";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="body">
        <h1>Say goodbye to scheduling stress. Say hello to growth.</h1>
        <p>
          Stop wasting time with complicated scheduling. We offer only the tools
          you really need.
        </p>
        <ButtonBlack href="https://app.bookingeek.com">
          Simplify Your Scheduling
        </ButtonBlack>
      </div>
      <div className="img"></div>
    </section>
  );
}
