export const validateSlug = (slug: string) =>
  new RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).test(slug);
