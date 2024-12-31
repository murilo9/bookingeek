// Possible types for businesses' resources
export type BusinessResourcesType =
  | "venues"
  | "services"
  | "people"
  | "vehicles";

// Used to render options list in forms
export const BUSINESS_RESOURCE_TYPES = {
  venues:
    "Venues that people can rent (e.g.: sportive courts, salons, bedrooms).",
  services:
    "Services that are executed by someone (e.g.: haircutting, coaching, teaching).",
  people:
    "People that will execute services (e.g.: a haircutters, doctors, coaches).",
  vehicles: "Vehicles that people can rent (e.g.: cars, trucks, bikes).",
};
