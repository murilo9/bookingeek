// Retrieves a kebab-case slug for a name
export const getSlug = (name: string) =>
  name
    .trim()
    .normalize("NFD") // Decomposes characters into base + diacritic
    .replace(/[\u0300-\u036f]/g, "") // Removes diacritic marks
    .replace(/ç/g, "c") // Converts 'ç' to 'c'
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .join("-")
    .toLowerCase();
