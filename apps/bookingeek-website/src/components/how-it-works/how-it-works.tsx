import "./how-it-works.css";

const STEPS = [
  {
    title: "1. Add your resources",
    description:
      "Venues, services, vehicles, people. Add whatever you offer for your customers.",
  },
  {
    title: "2. Set up availability dates and times",
    description: `Add rules to say when your resources are available. Specify dates, 
    times, ranges and/or slots. You can also add specific rules for when your resources 
    will not be available, or have different prices.`,
  },
  {
    title: "3. Start getting reservations",
    description: `Once your resource are set up, share their links with your customers, so they can start making reservations.`,
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-wrapper">
      <section className="how-it-works">
        <h1>How it works</h1>
        <ol>
          {STEPS.map(({ title, description }) => (
            <li key={title}>
              <h1>{title}</h1>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
