import Header from "@/components/header/header";
import Hero from "@/components/hero/hero";
import { getSafeLng, makeT } from "@/locales";

export type HomePageProps = { params: Promise<{ lng?: string[] } | undefined> };

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  // This condition will actually never happen, but it prevents Next from throwing an error while building
  if (!params) {
    return <>Params is undefined</>;
  }
  const safeLng = getSafeLng(params.lng ? params.lng[0] : undefined);
  const t = makeT(safeLng);

  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
