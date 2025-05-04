import {
  ClassifiedWithImagesAndMake,
  MultiStepFormComponentProps,
  MultiStepFormEnum,
} from "@/config/types";
import { Welcome } from "./welcome";
import { notFound } from "next/navigation";

const ReserveFlow = ({
  params,
  searchParams,
  classified,
  Component,
}: {
  params: { [x: string]: string | string[] | undefined };
  searchParams: { [x: string]: string | string[] | undefined };
  classified: ClassifiedWithImagesAndMake;
  Component: any;
}) => {
  const slug = params?.slug;
  const step = searchParams?.step;

  if (!classified) notFound();

  return (
    <Component
      searchParams={searchParams}
      params={params}
      classified={classified}
    />
  );
};

export default ReserveFlow;
