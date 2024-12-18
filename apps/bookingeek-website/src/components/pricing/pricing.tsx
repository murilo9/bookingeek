import CheckIcon from "@/icons/check";
import ButtonBlack from "../button-black/button-black";
import "./pricing.css";

const PRICES = [
  {
    title: "Lite",
    price: "FREE",
    description:
      "Perfect for individuals and small businesses getting started with online booking.",
    items: [
      "Up to 100 Reservations per Month",
      "Up to 3 users",
      "Up to 3 resources",
    ],
  },
  {
    title: "Pro",
    price: "$ 25.00 /month",
    description:
      "Get rid of restrictions and offer online payments. Recommended for businesses with higher amount of bookings per month.",
    items: [
      "Unlimited Reservations",
      "Unlimited Users",
      "Unlimited Resources",
      "Online Payments",
      "Integration With Google Calendar",
    ],
  },
  {
    title: "Pro Flex",
    price: "5% fee per reservation",
    description:
      "Get Pro and pay as you go. Recommended for businesses with lower amount of bookings per month.",
    items: [
      "Unlimited Reservations",
      "Unlimited Users",
      "Unlimited Resources",
      "Online Payments",
      "Integration With Google Calendar",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="header">
        <h1>The right plan for you, whoever you are</h1>
        <p>
          Get started with Bookingeek for free or upgrade to unlock powerful
          features that will streamline your booking process and help you grow
          your business.
        </p>
      </div>
      <ul className="price-cards">
        {PRICES.map((price) => (
          <div className="price-card" key={price.title}>
            <div className="price-card__header">
              <h1>{price.title}</h1>
              <h2>{price.price}</h2>
              <p>{price.description}</p>
            </div>
            <ul className="items-list">
              {price.items.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
            <ButtonBlack>Start Now</ButtonBlack>
          </div>
        ))}
      </ul>
    </section>
  );
}
