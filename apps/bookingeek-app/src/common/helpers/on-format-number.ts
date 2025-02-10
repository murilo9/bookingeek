/**
 * Calls setValue only if number string represents a valid number.
 * @param value
 * @param setValue
 */
export const onFormatNumber = (
  value: string,
  setValue: (value: number) => void,
  maximum?: number
) => {
  const number = Number(value);

  if (!isNaN(number)) {
    if (maximum !== undefined && number > maximum) {
      return;
    }
    setValue(number);
  }
};
