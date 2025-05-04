import {
  ClassifiedWithImagesAndMake,
  MultiStepFormComponentProps,
  MultiStepFormEnum,
  PageProps,
} from "@/config/types";
import InventoryNavbar from "./components/inventory-navbar";
import ReserveFlow from "./components/reserve-flow";

const ReserveMain = ({
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
  return (
    <div className="w-full">
      <InventoryNavbar />
      <div className="flex min-h-screen">
        <main className="flex-1 overflow-auto">
          <ReserveFlow
            searchParams={searchParams}
            params={params}
            classified={classified}
            Component={Component}
          />
        </main>
      </div>
    </div>
  );
};

export default ReserveMain;
