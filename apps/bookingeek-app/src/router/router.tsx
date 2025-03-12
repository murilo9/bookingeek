import { BrowserRouter } from "react-router";
import { useAuth } from "../hooks/useAuth";
import ProtectedRouter from "./protected";
import PublicRouter from "./public";

export default function Router() {
  const { accessToken, user } = useAuth();
  console.log("accessToken", accessToken, user);

  return (
    <BrowserRouter>
      {accessToken ? (
        <ProtectedRouter></ProtectedRouter>
      ) : (
        <PublicRouter></PublicRouter>
      )}
    </BrowserRouter>
  );
}
