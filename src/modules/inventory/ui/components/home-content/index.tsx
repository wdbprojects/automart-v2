import { AwaitedPageProps } from "@/config/types";
import HeroSection from "./hero-section";
import FeaturesSection from "./features-section";
import LatestArrivalsSection from "./latest-arrivals-section";
import BrandsSection from "./brands-section";

const HomeContent = async ({ searchParams }: AwaitedPageProps) => {
  return (
    <div>
      <HeroSection searchParams={searchParams} />
      <FeaturesSection />
      <LatestArrivalsSection />
      <BrandsSection />
    </div>
  );
};

export default HomeContent;
