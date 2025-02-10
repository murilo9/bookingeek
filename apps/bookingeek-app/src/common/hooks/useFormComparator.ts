import { useMemo } from "react";

/**
 * Used to check whether an object (representing a form) has changed.
 */
export const useFormComparator = (form: Record<string, unknown>) => {
  const initialValue = useMemo(() => JSON.parse(JSON.stringify(form)), []);
  const formChanged = JSON.stringify(initialValue) !== JSON.stringify(form);
  return { formChanged };
};
