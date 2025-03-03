import { useEffect } from "react";
import Router from "./router";
import { useAppDispatch, useAppSelector } from "./store/store";
import Dialog from "./components/common/dialog";
import { genericDialogClosed } from "./store/common-slice";

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
