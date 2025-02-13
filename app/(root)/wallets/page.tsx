"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getOrCreateWallets } from "@/lib/action";
import { useSeedContext } from "@/context/SeedContext";
import { validateMnemonic } from "bip39";

export interface Account {
  accountNumber: number;
  publicKey: string;
  privateKey: string;
}

const Wallets = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const seedContext = useSeedContext();

  useEffect(() => {
    if (seedContext) {
      const { seed, setSeed, accountsGenerated, setAccountsGenerated } = seedContext;
      if (seed) {
        if (validateMnemonic(seed)) {
          const answer = getOrCreateWallets(seed,accountsGenerated);
          const gotAccounts = answer.accounts;
          setAccounts(gotAccounts);
          setAccountsGenerated(answer.accountsGenerated);
        } else {
          const answer = getOrCreateWallets();
          const gotAccounts = answer.accounts;
          setAccounts(gotAccounts);
          setSeed(answer.mnemonic);
          setAccountsGenerated(answer.accountsGenerated);
        }
      } else {
        const answer = getOrCreateWallets();
        const gotAccounts = answer.accounts;
        setAccounts(gotAccounts);
        setSeed(answer.mnemonic);
        setAccountsGenerated(answer.accountsGenerated);
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-brand flex flex-col items-center py-6 px-3">
      <div className="flex items-center justify-center lg:justify-between h-[100px] w-full max-w-[900px]">
        <Image src="/Full-Logo.svg" alt="MyWall" width={200} height={180} />
        <Button className="hidden lg:flex bg-brand-primary p-6 font-bold rounded-full hover:bg-brand-secondary">
          Add wallet
        </Button>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default Wallets;
