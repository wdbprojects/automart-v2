"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

const FormButtons = ({ reset }: { reset: () => void }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        type="reset"
        variant="secondary"
        className="flex-1"
        disabled={pending}
        onClick={() => {
          reset();
        }}
      >
        Reset form
      </Button>
      <Button type="submit" disabled={pending} className="flex-1">
        {pending ? <LoaderCircle className="animate-spin w-4 h-4" /> : ""}
        <span>Sign in</span>
      </Button>
    </>
  );
};

export default FormButtons;
