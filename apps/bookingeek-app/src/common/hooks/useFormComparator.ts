import { useMemo } from "react";

export const useFormComparator = (form: Record<string, unknown>) => {
  const initialValue = useMemo(() => JSON.parse(JSON.stringify(form)), []);
  const formChanged = JSON.stringify(initialValue) !== JSON.stringify(form);
  return { formChanged };
};
