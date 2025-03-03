import { ResourceIconName } from "@bookingeek/core";
import BedIcon from "../components/icons/bed/bed";
import BuildingIcon from "../components/icons/building/building";
import CarIcon from "../components/icons/car/car";
import PlaceIcon from "../components/icons/place/place";
import ServiceIcon from "../components/icons/service/service";
import TableIcon from "../components/icons/table/table";
import UserIcon from "../components/icons/user/user";

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
