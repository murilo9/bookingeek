import { useEffect } from "react";
import Router from "./router/router";
import { useAppDispatch, useAppSelector } from "./store/store";
import Dialog from "./components/common/dialog";
import { genericDialogClosed } from "./store/common-slice";
import { GoogleOAuthProvider } from "@react-oauth/google";
const GOOGLE_APP_CLIENT_ID = import.meta.env.VITE_GOOGLE_APP_CLIENT_ID;

function App() {
  const dispatch = useAppDispatch();
  const { genericDialogData } = useAppSelector((state) => state.common);
  useEffect(() => {
    document.title = "Bookingeek";
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_APP_CLIENT_ID}>
      <Router />
      <Dialog
        dialogData={genericDialogData}
        onClose={() => dispatch(genericDialogClosed())}
      />
    </GoogleOAuthProvider>
  );
}

export default App;
