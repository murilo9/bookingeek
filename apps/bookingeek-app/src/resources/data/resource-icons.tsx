import BedIcon from "../../common/icons/bed/bed";
import BuildingIcon from "../../common/icons/building/building";
import CarIcon from "../../common/icons/car/car";
import PlaceIcon from "../../common/icons/place/place";
import ServiceIcon from "../../common/icons/service/service";
import UserIcon from "../../common/icons/user/user";
import TableIcon from "../../common/icons/table/table";
import { ResourceIconName } from "@bookingeek/api/src/resources/types";

export const RESOURCE_ICON = (color: string, size: number) =>
  ({
    bed: <BedIcon color={color} size={size} />,
    building: <BuildingIcon color={color} size={size} />,
    car: <CarIcon color={color} size={size} />,
    place: <PlaceIcon color={color} size={size} />,
    service: <ServiceIcon color={color} size={size} />,
    user: <UserIcon color={color} size={size} />,
    table: <TableIcon color={color} size={size} />,
  }) as Record<ResourceIconName, JSX.Element>;

export const renderResourceIcon = (
  icon: ResourceIconName,
  color = "inherit",
  size = 24
): JSX.Element => {
  return RESOURCE_ICON(color, size)[icon];
};
