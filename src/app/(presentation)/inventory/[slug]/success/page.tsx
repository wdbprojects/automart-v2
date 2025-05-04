import DarkMode from "@/components/shared/dark-mode";
import EndButtons from "@/components/shared/end-buttons";
import { CircleCheck } from "lucide-react";

const SuccessfulReservationPage = () => {
  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleCheck className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Reservation Confirmed!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for your reservation. We'll see you soon
        </p>
        <EndButtons />
        <div className="mt-6 flex items-center justify-center">
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default SuccessfulReservationPage;
