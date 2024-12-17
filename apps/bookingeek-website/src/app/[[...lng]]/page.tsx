import { buildPage, clientGenerateStaticParams } from "@/pageBuilder";

/**
 * Enables support for the 'lng' route param, so multi-languages can work.
 */
export function generateStaticParams() {
  return clientGenerateStaticParams();
}

export default function Home(pageProps: unknown) {
  return buildPage(
    "home" /* @next-codemod-ignore 'pageProps' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */,
    pageProps
  );
}
