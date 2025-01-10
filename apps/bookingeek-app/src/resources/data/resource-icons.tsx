import { ResourceIconName } from "@bookingeek/api/src/resources/types/resource-picture";
import BedIcon from "../../common/icons/bed";
import BuildingIcon from "../../common/icons/building";
import CarIcon from "../../common/icons/car";
import PlaceIcon from "../../common/icons/place";
import ServiceIcon from "../../common/icons/service";
import UserIcon from "../../common/icons/user";
import TableIcon from "../../common/icons/table";

const renderIcon = (color: string, size: number) =>
  ({
    bed: <BedIcon color={color} size={size} />,
    building: <BuildingIcon color={color} size={size} />,
    car: <CarIcon color={color} size={size} />,
    place: <PlaceIcon color={color} size={size} />,
    service: <ServiceIcon color={color} size={size} />,
    user: <UserIcon color={color} size={size} />,
    table: <TableIcon color={color} size={size} />,
  }) as Record<ResourceIconName, JSX.Element>;

export const RESOURCE_ICON = (
  icon: ResourceIconName,
  color = "inherit",
  size = 24
): JSX.Element => {
  return renderIcon(color, size)[icon];
};
