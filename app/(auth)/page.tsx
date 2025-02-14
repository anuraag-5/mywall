"use client";

import ImportWallets from "@/components/ImportPage";
import { validateMnemonic } from "bip39";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Import = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("seed")) {
      if (validateMnemonic(localStorage.getItem("seed")!)) {
        router.push("/wallets");
      }
    }
  }, []);
  return <ImportWallets />;
};

export default Import;
