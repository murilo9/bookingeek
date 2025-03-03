export type GenericDialogData = {
  title: string;
  body: JSX.Element | string;
  actions: JSX.Element;
  beforeClose?: () => unknown;
  bodyStyle?: Record<string, any>;
};
