import styled from "styled-components";
import { GenericDialogData } from "../../types/generic-dialog-data";
import CloseIcon from "../icons/close/close";
import IconButton from "./icon-button";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  padding: 24px;
`;

const StyledDialog = styled.div`
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 600px;
`;

const StyledDialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 8px 16px;
`;

const StyledDialogTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;

const StyledDialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px;
`;

type DialogProps = {
  dialogData: GenericDialogData | null;
  onClose: () => void;
};

export default function Dialog({ dialogData, onClose }: DialogProps) {
  return dialogData ? (
    <StyledContainer onClick={onClose}>
      <StyledDialog onClick={(e) => e.stopPropagation()}>
        <StyledDialogHeader>
          <StyledDialogTitle>{dialogData.title}</StyledDialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </StyledDialogHeader>
        <div
          style={{
            width: "100%",
            padding: "16px 24px",
            ...dialogData.bodyStyle,
          }}
        >
          {dialogData.body}
        </div>
        <StyledDialogActions>{dialogData.actions}</StyledDialogActions>
      </StyledDialog>
    </StyledContainer>
  ) : null;
}
