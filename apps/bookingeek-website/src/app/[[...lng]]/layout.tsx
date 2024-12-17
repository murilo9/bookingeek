import "@/globals.css";
import "@/helpers.css";
// import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import { getSafeLng } from "@/locales";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
});

const fontsClassNames = `${publicSans.className}`;

export const metadata: Metadata = {
  title: "Bookingeek",
  description: "Scheduling made easier.",
  openGraph: {
    url: "https://bookingeek.com",
    title: "Bookingeek",
    description: "Scheduling made easier.",
    images: "https://bookingeek.com/logos/bookingeek-logomark.png",
    locale: "en_US",
    siteName: "Bookingeek",
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng?: string[] }>;
}>) {
  const _params = await params;
  console.log("_params", _params);
  const safeLng = getSafeLng(_params.lng ? _params.lng[0] : undefined);
  return (
    <html lang={safeLng}>
      <body className={fontsClassNames}>{children}</body>
      {/* TODO: setup this later */}
      {/* <GoogleAnalytics gaId={proccess.env.GOOGLE_ANALYTICS_TAG} /> */}
    </html>
  );
}
