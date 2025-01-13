import { NotificationType } from "./notification-type";

export type ToastNotification = {
  message: string;
  type?: NotificationType;
};
