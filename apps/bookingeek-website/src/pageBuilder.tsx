import { ReactNode } from "react";
import HomePage, { HomePageProps } from "./pages/home";

export function clientGenerateStaticParams() {
  return [
    { lng: [""] },
    { lng: ["pt-BR"] },
    { lng: ["pt"] },
    { lng: ["en"] },
    { lng: ["en-US"] },
  ];
}

export function buildPage(page: string, pageProps?: unknown): ReactNode {
  switch (page) {
    case "home":
      return <HomePage {...(pageProps as HomePageProps)} />;
    default:
      return <></>;
  }
}
