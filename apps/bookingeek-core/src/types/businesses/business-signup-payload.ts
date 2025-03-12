import { Expose } from "class-transformer";
import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";
import { SignInProvider } from "./sign-in-provider";

export class BusinessSignUpPayload {
  businessName: string;
  businessSlug: string;
  businessAddress: string;
  businessPhoneNumber: string;
  adminUserFullName: string;
  adminUserEmail: string;
  adminUserPassword: string;
  businessResourcesType: "venues" | "services" | "people" | "vehicles";
  businessField: string;
  doesRefund: boolean;
  refundType: "total" | "partial";
  refundDescription: string;
  signInProvider: SignInProvider;
}
