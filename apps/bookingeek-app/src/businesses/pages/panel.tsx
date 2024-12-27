import { Outlet } from "react-router";

export default function BusinessPanelPage() {
  // TODO:
  // 1. Display loading view while loading all data to the store
  // 2. Once all data is loaded successfully, render Outlet
  // 3. If an error occurs while loading data, renders error view passing the code error (maybe in the query string?)

  return (
    <>
      <h1>Business Panel Page</h1>
      <p>Here will be rendered several views for managing the business.</p>

      <p>--- outlet start ---</p>
      <Outlet />
      <p>--- outlet end ---</p>
    </>
  );
}
