// Possible business' refunding types
export type BusinessRefundType = "partial" | "total";

// Used to render options lists in forms
export const BUSINESS_REFUND_TYPES: Record<BusinessRefundType, string> = {
  partial: "Partial",
  total: "Total",
};
