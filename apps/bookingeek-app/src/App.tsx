import { useEffect } from "react";
import Router from "./router";
import { useAppDispatch, useAppSelector } from "./store";
import Dialog from "./common/components/dialog/dialog";
import { genericDialogClosed } from "./common/common-slice";

function App() {
  const dispatch = useAppDispatch();
  const { genericDialogData } = useAppSelector((state) => state.common);
  useEffect(() => {
    document.title = "Bookingeek";
  }, []);

  return (
    <>
      <Router />
      <Dialog
        dialogData={genericDialogData}
        onClose={() => dispatch(genericDialogClosed())}
      />
    </>
  );
}

export default App;
