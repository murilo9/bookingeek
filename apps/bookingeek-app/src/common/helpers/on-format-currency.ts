/**
 * Formats a monetary (00000.00) string value.
 * @param value
 * @param setValue
 * @returns
 */
export const onFormatCurrency = (
  value: string,
  setValue: (value: string) => void
) => {
  const unmaskedValue = value.split(".").join("");
  let maskedValue: string;
  const numericUnmaskedValue = Number(unmaskedValue);
  const isTooLarge = unmaskedValue.length > 7;
  if (isNaN(numericUnmaskedValue) || isTooLarge) {
    return;
  }
  switch (true) {
    case unmaskedValue.length > 2:
      maskedValue = unmaskedValue.slice(0, -2) + "." + unmaskedValue.slice(-2);
      setValue(
        unmaskedValue.length > 3 ? maskedValue.replace(/^0+/, "") : maskedValue
      );
      break;
    case unmaskedValue.length <= 2:
      setValue(unmaskedValue);
  }
};
