import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class RetrieveUsersQuery {
  @Expose()
  @IsString()
  @IsOptional()
  businessId?: string;
  @Expose()
  @IsString()
  @IsOptional()
  _id?: string;
}
