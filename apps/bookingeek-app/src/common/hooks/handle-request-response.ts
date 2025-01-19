import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppDispatch } from "../../store";
import { toastNotificationShown } from "../common-slice";

type RequestResult =
  | { data: unknown; error?: undefined }
  | { data?: undefined; error: FetchBaseQueryError | SerializedError };

export const useHandleRequestResponse = () => {
  const dispatch = useAppDispatch();

  const func = async (requestResult: RequestResult, successMessage: string) => {
    console.log("requestResult", requestResult);
    if (requestResult.error) {
      dispatch(
        toastNotificationShown({
          message:
            "There was an error while doing this operation. Please try again.",
          type: "info",
        })
      );
    } else {
      dispatch(
        toastNotificationShown({
          message: successMessage,
          type: "info",
        })
      );
    }
  };
  return func;
};