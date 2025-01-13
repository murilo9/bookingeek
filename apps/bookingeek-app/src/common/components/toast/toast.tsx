import styled from "styled-components";
import { NotificationType } from "../../types/notification-type";
import IconButton from "../icon-button/icon-button";
import CloseIcon from "../../icons/close/close";

const COLORS = {
  info: {
    border: "#dddddd",
    background: "#f4f4f4",
    text: "inherit",
  },
  error: {
    border: "#ff9999",
    background: "#ffdddd",
    text: "#ff7777",
  },
};

const StyledToast = styled.div<{ type: NotificationType }>`
  border: 1px solid ${(props) => COLORS[props.type].border};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  border-radius: 6px;
  padding: 12px 16px;
  min-width: 300px;
  max-width: calc(100vw - 32px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => COLORS[props.type].background};
`;

const StyledToastMessage = styled.p<{ type: NotificationType }>`
  flex: 1;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => COLORS[props.type].text};
  padding-right: 16px;
`;

type ToastProps = {
  message: string;
  type?: NotificationType;
  onClose?: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
  const actualType = type || "error";
  return (
    <StyledToast type={actualType}>
      <StyledToastMessage type={actualType}>{message}</StyledToastMessage>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </StyledToast>
  );
}
