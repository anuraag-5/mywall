"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import Link from "next/link";
import { useSeedContext } from "@/context/SeedContext";

const formSchema = z.object({
  seed: z.string().min(2).max(120),
});

const ImportWallets = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seed: "",
    },
  });
  const seedContext = useSeedContext();
  if (!seedContext) {
    throw new Error("useSeedContext must be used within a SeedContextProvider");
  }

  const { setSeed } = seedContext;

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.seed.length === 0) return;

    localStorage.setItem("seed", values.seed);
    setSeed(values.seed);
    router.push("/wallets");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-[650px]"
      >
        <h1 className="text-3xl font-extrabold w-full flex justify-center lg:justify-start">Import Wallet</h1>
        <FormField
          control={form.control}
          name="seed"
          render={({ field }) => (
            <FormItem>
              <div className="bg-white h-[78px] flex flex-col justify-center w-full p-3 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <FormLabel className="text-[15px]">Seed Phrase</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your secret, space seperated"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-brand-primary rounded-full h-[78px] text-[20px] font-bold hover:bg-brand-secondary"
        >
          Submit
        </Button>
        <div className="flex flex-col sm:flex-row justify-center items-center">
          Don't have a wallet?{" "}
          <Link href="/wallets" className="text-brand-secondary font-bold ml-1">
            Create wallet
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ImportWallets;
