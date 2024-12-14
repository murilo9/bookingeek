export type ResourceIconPicture = {
  icon: string;
};
export type ResourceUrlPicture = {
  src: Array<string>;
};

/**
 * A resource's picture or icon.
 */
export type ResourcePicture = ResourceUrlPicture | ResourceIconPicture;
