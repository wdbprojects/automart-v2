import FormHeader from "@/modules/inventory/ui/components/reserve-flow/form-header";
import { PropsWithChildren } from "react";

const SuccessLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 !pt-[4rem]">
      {children}
    </main>
  );
};

export default SuccessLayout;
