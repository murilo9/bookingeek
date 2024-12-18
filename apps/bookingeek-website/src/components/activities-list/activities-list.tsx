import "./activities-list.css";

const ACTIVITIES = [
  {
    title: "Healthcare",
    img: "/healthcare.jpg",
  },
  {
    title: "Beauty & Wellness",
    img: "/hairdryer.jpg",
  },
  {
    title: "Education",
    img: "/teacher.jpg",
  },
  {
    title: "Professional Services",
    img: "/lawyer.jpg",
  },
  {
    title: "Trades & Services",
    img: "/trades.jpg",
  },
  {
    title: "Arts & Entretainment",
    img: "/magician.jpg",
  },
  {
    title: "Event Venues",
    img: "/venue.jpg",
  },
  {
    title: "Storages",
    img: "/storage.jpg",
  },
];

export default function ActivitiesList() {
  return (
    <section className="activities-list">
      <div className="header">
        <h1>Any business, any size, any industry.</h1>
        <p>
          From solopreneurs to large enterprises, Bookingeek provides the tools
          and flexibility to manage bookings for businesses of all shapes and
          sizes. No matter your industry, we&apos;ve got you covered.
        </p>
      </div>
      <div className="hr" />
      <ul className="body">
        {ACTIVITIES.map(({ title, img }) => (
          <li key={title}>
            <img src={img} alt={title} />
            <h1>{title}</h1>
          </li>
        ))}
      </ul>
    </section>
  );
}
