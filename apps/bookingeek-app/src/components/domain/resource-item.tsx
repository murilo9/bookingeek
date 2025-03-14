import styled from "styled-components";
import { renderResourceIcon } from "../../data/resource-icons";
import { ResourcePicture, ReservationTimeGranularity } from "@bookingeek/core";

const StyledResourceItem = styled.div`
  display: flex;
  padding: 16px 8px;
  border-bottom: 1px solid #cccccc;
  cursor: pointer;
  &:hover {
    background: #f8f8f8;
  }
  &:active {
    background: #f4f4f4;
  }
  @media screen and (min-width: 1024px) {
    padding: 20px 16px;
  }
`;

const StyledResourcePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
`;

const StyledResourceIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c6c6c6;
`;

const StyledCenterContent = styled.div`
  flex: 1;
  padding-left: 16px;
`;

const StyledTitleLabel = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const StyledSubtitleLabel = styled.p`
  font-size: 14px;
`;

const StyledDescriptionLabel = styled.p`
  font-size: 14px;
  color: #444444;
  margin-top: 4px;
`;

const StyledPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledPriceLabel = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 2px;
`;

const StyledPriceUnit = styled.span`
  font-size: 12px;
  font-weight: 600;
`;

const StyledPriceValue = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const StyledInactiveLabel = styled.span`
  font-weight: 500;
  color: #aa3131;
`;

const PRICE_TYPE: Record<string, string> = {
  "5": "5 min",
  "10": "10 min",
  "15": "15 min",
  "30": "30 min",
  "60": "hourly",
};

type ResourceItemProps = {
  isActive: boolean;
  title: string;
  subtitle?: string;
  description?: string;
  picture: ResourcePicture;
  priceInCents: number | null;
  priceTypeMinutes: ReservationTimeGranularity;
  onClick?: () => void;
};

export default function ResourceItem({
  picture,
  priceInCents,
  priceTypeMinutes,
  title,
  description,
  subtitle,
  isActive,
  onClick,
}: ResourceItemProps) {
  const renderPicture = () =>
    picture.src.length ? (
      <StyledResourcePicture src={picture.src[0]} />
    ) : (
      <StyledResourceIcon>
        {renderResourceIcon(picture.icon)}
      </StyledResourceIcon>
    );

  const priceValue = priceInCents ? (priceInCents / 100).toFixed(2) : "FREE";

  return (
    <StyledResourceItem onClick={onClick}>
      {renderPicture()}
      <StyledCenterContent>
        <StyledTitleLabel>{title}</StyledTitleLabel>
        <StyledSubtitleLabel>{subtitle}</StyledSubtitleLabel>
        <StyledDescriptionLabel>{description}</StyledDescriptionLabel>
        {isActive ? null : <StyledInactiveLabel>Inactive</StyledInactiveLabel>}
      </StyledCenterContent>
      <StyledPriceContainer>
        <StyledPriceLabel>
          <StyledPriceUnit>{priceValue === "FREE" ? "" : "$"}</StyledPriceUnit>
          <StyledPriceValue>{priceValue}</StyledPriceValue>
        </StyledPriceLabel>
        <p>
          {priceValue === "FREE" ? "" : PRICE_TYPE[String(priceTypeMinutes)]}
        </p>
      </StyledPriceContainer>
    </StyledResourceItem>
  );
}
