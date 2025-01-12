export const RESOURCE_CHECKOUT_TYPES: Record<ResourceCheckoutType, string> = {
  'in-loco-online': 'In-loco & online',
  'in-loco-only': 'In-loco only',
  'online-only': 'Online only',
};

export type ResourceCheckoutType =
  | 'in-loco-online'
  | 'online-only'
  | 'in-loco-only';
