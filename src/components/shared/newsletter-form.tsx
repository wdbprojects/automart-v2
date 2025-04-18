"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeAction } from "@/app/_actions/subscribe";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubscribeSchema } from "@/app/schemas/subscribe.schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

/* BUTTON */
const SubscribeButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      aria-hidden="true"
      size="sm"
      className="w-full cursor-pointer"
    >
      {pending && <Loader2 className="h-4 w-4 shrink-0 animate-spin" />}{" "}
      Subscribe Now
    </Button>
  );
};

export const NewsletterForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [state, formAction] = useActionState(subscribeAction, {
    success: false,
    message: "",
  });

  const form = useForm<z.infer<typeof SubscribeSchema>>({
    resolver: zodResolver(SubscribeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    mode: "onChange",
  });
  const { control, reset } = form;

  const handleFormAction = async (formData: FormData) => {
    const valid = await form.trigger();
    if (!valid) return;
    startTransition(() => {
      formAction(formData);
    });
    setOpenDialog(false);
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (!state.success) {
      toast.error(state.message);
    }
    reset();
  }, [state.success]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        size="sm"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        Subscribe to newsletter
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subscribe to our inventory updates</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-3"
            action={handleFormAction}
            onSubmit={() => null}
          >
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl className="!mb-0">
                      <Input
                        placeholder="First name"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Last name"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        type="email"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                );
              }}
            />
            <SubscribeButton />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

//   <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//     <Button
//       variant="outline"
//       className="w-full cursor-pointer"
//       size="sm"
//       onClick={() => {
//         setOpenDialog(true);
//       }}
//     >
//       Subscribe to newsletter
//     </Button>

//     <DialogContent className="sm:max-w-[425px]">
//       <DialogHeader>
//         <DialogTitle>Subscribe to our inventory updates</DialogTitle>
//       </DialogHeader>
//       <Form {...form}>
//         <form
//           ref={formRef}
//           className="space-y-3"
//           action={handleFormAction}
//           onSubmit={() => null}
//         >
//           <FormField
//             control={control}
//             name="firstName"
//             render={({ field }) => {
//               return (
//                 <FormItem>
//                   <FormControl className="!mb-0">
//                     <Input
//                       placeholder="First name"
//                       {...field}
//                       autoComplete="off"
//                     />
//                   </FormControl>
//                   <FormMessage className="text-xs text-destructive" />
//                 </FormItem>
//               );
//             }}
//           />
//           <FormField
//             control={control}
//             name="lastName"
//             render={({ field }) => {
//               return (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       placeholder="Last name"
//                       {...field}
//                       autoComplete="off"
//                     />
//                   </FormControl>
//                   <FormMessage className="text-xs text-destructive" />
//                 </FormItem>
//               );
//             }}
//           />
//           <FormField
//             control={control}
//             name="email"
//             render={({ field }) => {
//               return (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       placeholder="Email"
//                       {...field}
//                       type="email"
//                       autoComplete="off"
//                     />
//                   </FormControl>
//                   <FormMessage className="text-xs text-destructive" />
//                 </FormItem>
//               );
//             }}
//           />
//           <SubscribeButton />
//         </form>
//       </Form>
//     </DialogContent>
//   </Dialog>
// );
