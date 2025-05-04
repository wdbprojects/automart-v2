import { MultiStepFormSchema } from "@/app/schemas/form.schema";
import { MultiStepFormEnum, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import SelectDate from "@/modules/inventory/ui/components/reserve-flow/select-date";
import SubmitDetails from "@/modules/inventory/ui/components/reserve-flow/submit-details";
import { Welcome } from "@/modules/inventory/ui/components/reserve-flow/welcome";
import ReserveMain from "@/modules/inventory/ui/reserve-main";
import { notFound } from "next/navigation";

const MAP_STEP_TO_COMPONENT = {
  [MultiStepFormEnum.WELCOME]: Welcome,
  [MultiStepFormEnum.SELECT_DATE]: SelectDate,
  [MultiStepFormEnum.SUBMIT_DETAILS]: SubmitDetails,
};

const ReservePage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const slug = params?.slug;
  const step = searchParams?.step;

  const { data, success, error } = MultiStepFormSchema.safeParse({
    slug: slug,
    step: Number(step),
  });

  if (!success) {
    console.error(error);
    return notFound();
  }

  const classified = await prisma.classified.findUnique({
    where: {
      slug: data?.slug,
    },
    include: {
      make: true,
      images: true,
    },
  });

  if (!classified) notFound();

  const Component = MAP_STEP_TO_COMPONENT[data.step as MultiStepFormEnum];
  if (!Component) notFound();

  return (
    <ReserveMain
      params={params ?? {}}
      searchParams={searchParams ?? {}}
      classified={classified}
      Component={Component}
    />
  );
};

export default ReservePage;
