export type ResourceIconName =
  | 'user'
  | 'place'
  | 'service'
  | 'bed'
  | 'car'
  | 'building'
  | 'table';

export type ResourceIconPicture = {
  icon: ResourceIconName;
};

export type ResourceUrlPicture = {
  src: Array<string>;
};

/**
 * A resource's picture or icon.
 */
export type ResourcePicture = ResourceUrlPicture | ResourceIconPicture;
