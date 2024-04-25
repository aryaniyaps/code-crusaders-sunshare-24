"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const applyProviderSchema = z.object({
  sitename: z.string().min(2).max(50),
  address: z.string().min(5).max(75),
  district: z.string(),
  state: z.string(),
  country: z.string(),
});

export default function ApplyProviderDialog() {
  const form = useForm<z.infer<typeof applyProviderSchema>>({
    resolver: zodResolver(applyProviderSchema),
    defaultValues: {
      sitename: "",
      address: "",
      district: "",
      state: "",
      country: "",
    },
  });

  function onSubmit(values: z.infer<typeof applyProviderSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Apply new provider</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply new provider</DialogTitle>
          <DialogDescription>
            We'll take 2-3 business days to approve your request
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="sitename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site name</FormLabel>
                  <FormControl>
                    <Input placeholder="Bangalore Solar Network" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your provider's display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex w-full items-end gap-4">
              <DialogClose asChild>
                <Button variant="ghost">cancel</Button>
              </DialogClose>
              <Button type="submit">apply</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
