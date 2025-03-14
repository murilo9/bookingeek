export type UpdateBusinessPayload = {
  name: string;
  slug: string;
  address: string;
  phone: string;
  pictureUrl: string | null;
  refundingPolicy: {
    doesRefund: boolean;
    refundType: "partial" | "total";
    description: string;
  };
};
