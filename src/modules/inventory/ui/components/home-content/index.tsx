import { Button } from "@/components/ui/button";
import { imagesSources } from "@/config/constants";
import { imgixLoader } from "@/lib/imgix-loader";
import Link from "next/link";
import HomeTaxonomyFilters from "./home-taxonomy-filters";
import { AwaitedPageProps, PageProps } from "@/config/types";
import { SearchButton } from "./search-button";
import HeroSection from "./hero-section";

const HomeContent = async ({ searchParams }: AwaitedPageProps) => {
  return <HeroSection searchParams={searchParams} />;
};

export default HomeContent;
