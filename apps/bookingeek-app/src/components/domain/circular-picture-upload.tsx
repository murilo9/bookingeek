import styled from "styled-components";
import IconButton from "../common/icon-button";
import DeleteIcon from "../icons/delete/delete";
import EditIcon from "../icons/edit/edit";

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 180px;
  aspect-ratio: 1 / 1;
`;

const StyledImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const StyledDeleteButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  background: #aa3131;
  &:hover {
    background: rgb(196, 100, 100);
  }
  svg {
    fill: #ffffff;
  }
`;

const StyledEditButton = styled(IconButton)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  background: #000000;
  &:hover {
    background: #444444;
  }
  svg {
    fill: #ffffff;
  }
`;

type CirclePictureUploadProps = {
  id: string;
  previewUrl: string;
  onChange: () => void;
};

export default function CircularPictureUpload({
  id,
  previewUrl,
  onChange,
}: CirclePictureUploadProps) {
  const onEditClick = () => {
    const fileInput = document.getElementById(id);
    if (!fileInput) {
      throw new Error("Could not get file input at CirclePictureUpload");
    }
    fileInput.click();
  };

  return (
    <StyledContainer>
      <input type="file" hidden id={id} onChange={onChange} />
      <StyledImagePreview src={previewUrl} />
      <StyledDeleteButton>
        <DeleteIcon />
      </StyledDeleteButton>
      <StyledEditButton onClick={onEditClick}>
        <EditIcon />
      </StyledEditButton>
    </StyledContainer>
  );
}
