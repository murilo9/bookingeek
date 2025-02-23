/**
 * Returns a object in the { year: number, month: number, day: number } format from a Date object.
 */
export const getDateDefFromDate = (
  date: Date
): { year: number; month: number; day: number } => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return { year, month, day };
};
