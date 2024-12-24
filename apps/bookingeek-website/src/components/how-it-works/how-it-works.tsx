import "./how-it-works.css";

const STEPS = [
  {
    title: "Add your resources",
    img: "/prints/resources-list.png",
    description:
      "Venues, services, vehicles, people. Add whatever you offer for your customers.",
  },
  {
    title: "Set up availability dates and times",
    img: "/prints/availability.png",
    description: `Add rules to say when your resources are available, unavailable or have different prices. Specify dates, 
    times, ranges and/or slots..`,
  },
  {
    title: "Start getting reservations",
    img: "/prints/calendar-view.png",
    description: `Once your resource are set up, share their links with your customers, so they can start making reservations.`,
  },
  {
    title: "Custoemrs get up to date",
    img: "/prints/reservation-done.png",
    description:
      "Venues, services, vehicles, people. Add whatever you offer for your customers.",
  },
  {
    title: "Your reservations in the palm of your hand",
    img: "/prints/reservations-list.png",
    description:
      "Venues, services, vehicles, people. Add whatever you offer for your customers.",
  },
  {
    title: "Get in control of everything",
    img: "/prints/resource-management.png",
    description:
      "Venues, services, vehicles, people. Add whatever you offer for your customers.",
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-wrapper">
      <section className="how-it-works">
        <h1>How it works</h1>
        <ul>
          {STEPS.map(({ title, description, img }) => (
            <li key={title}>
              <div className="heading">
                <h1>{title}</h1>
                <p>{description}</p>
              </div>
              <img src={img} alt={title} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
