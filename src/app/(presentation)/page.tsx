import { PageProps } from "@/config/types";
import HomeMain from "@/modules/inventory/ui/home-main";

const Home = async (props: PageProps) => {
  const searchParams = await props.searchParams;

  return <HomeMain searchParams={searchParams ?? {}} />;
};

export default Home;
