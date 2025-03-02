import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class RetrieveResourcesQuery {
  businessId?: string;
  _id?: string;
}
