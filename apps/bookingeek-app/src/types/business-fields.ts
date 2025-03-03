// Possible business fields
export type BusinessField =
  | "healthcare"
  | "beauty-and-wellbeing"
  | "education"
  | "professional-services"
  | "trades-and-services"
  | "arts-and-entretainment"
  | "event-venues"
  | "storages";

// Used to render options lists in forms
export const BUSINESS_FIELDS: Record<BusinessField, string> = {
  "beauty-and-wellbeing": "Beauty & Wellbeing",
  healthcare: "Healthcare",
  education: "Education",
  "professional-services": "Professional Services",
  "trades-and-services": "Trades & Services",
  "arts-and-entretainment": "Arts & Entretainment",
  "event-venues": "Event Venues",
  storages: "Storages",
};
