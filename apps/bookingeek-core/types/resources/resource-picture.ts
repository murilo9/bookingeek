export type ResourceIconName =
  | "user"
  | "place"
  | "service"
  | "bed"
  | "car"
  | "building"
  | "table";

/**
 * A resource's picture or icon.
 */
export class ResourcePicture {
  // Resource icon. Applied if src array is empty.
  icon: ResourceIconName;
  // Resource picture(s) array. Can be empty.
  src: Array<string>;
}
