import { useEffect } from "react";
import Router from "./router";

function App() {
  useEffect(() => {
    document.title = "Bookingeek";
  }, []);

  return <Router />;
}

export default App;
