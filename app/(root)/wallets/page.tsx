"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getOrCreateWallets } from "@/lib/action";
import { useSeedContext } from "@/context/SeedContext";
import { validateMnemonic } from "bip39";
import AccountModal from "@/components/AccountModal";
import { useRouter } from "next/navigation";

export interface Account {
  accountNumber: number;
  publicKey: string;
  privateKey: string;
}

const Wallets = () => {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const seedContext = useSeedContext();
  const { accountsGenerated, setAccountsGenerated, setSeed } = seedContext!;

  const handleClick = () => {
    if (seedContext) {
      const { seed, accountsGenerated, setAccountsGenerated } = seedContext;
      const gotAccounts = getOrCreateWallets({
        mnemonic: seed || "",
        accountsGenerated: accountsGenerated + 1,
      });
      setAccounts(gotAccounts.accounts);
      localStorage.setItem(
        "accountsGenerated",
        gotAccounts.accountsGenerated.toString()
      );
      setAccountsGenerated(gotAccounts.accountsGenerated);
    }
  };

  const handleClearWallets = () => {
    localStorage.removeItem("seed");
    localStorage.removeItem("accountsGenerated");
    setSeed(null);
    setAccountsGenerated(0);
    router.push("/");
  };

  useEffect(() => {
    const seed = localStorage.getItem("seed");
    const localAccountsGenerated = localStorage.getItem("accountsGenerated");
    if (seed) {
      if (validateMnemonic(seed)) {
        const answer = getOrCreateWallets({
          mnemonic: seed,
          accountsGenerated: Number(localAccountsGenerated),
        });
        const gotAccounts = answer.accounts;
        setAccounts(gotAccounts);
        localStorage.setItem(
          "accountsGenerated",
          answer.accountsGenerated.toString()
        );
        setAccountsGenerated(answer.accountsGenerated);
      } else {
        const answer = getOrCreateWallets({ accountsGenerated });
        const gotAccounts = answer.accounts;
        setAccounts(gotAccounts);
        localStorage.setItem("seed", answer.mnemonic);
        setSeed(answer.mnemonic);
        localStorage.setItem(
          "accountsGenerated",
          answer.accountsGenerated.toString()
        );
        setAccountsGenerated(answer.accountsGenerated);
      }
    } else {
      const answer = getOrCreateWallets({ accountsGenerated });
      const gotAccounts = answer.accounts;
      setAccounts(gotAccounts);
      localStorage.setItem("seed", answer.mnemonic);
      setSeed(answer.mnemonic);
      localStorage.setItem(
        "accountsGenerated",
        answer.accountsGenerated.toString()
      );
      setAccountsGenerated(answer.accountsGenerated);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand flex flex-col items-center py-6 px-3">
      <div className="flex items-center justify-between h-[100px] w-full max-w-[900px] mb-10 lg:mb-4">
        <Image src="/Full-Logo.svg" alt="MyWall" width={200} height={180} />
        <Button
          className="bg-[#ffffff] p-4 lg:p-6 font-bold rounded-full hover:bg-brand text-[#000000]"
          onClick={handleClearWallets}
        >
          Log out
        </Button>
      </div>

      <div className="flex-1 flex flex-col w-full max-w-[900px] items-center gap-3">
        <div className="flex w-full p-4 bg-[#ffffff] rounded-full justify-between items-center mb-5">
          <div className="text-[#000000] font-bold">Your Seed Phrase</div>
          <AccountModal {...accounts[0]} type="Seed" />
        </div>
        <Button
          className="bg-brand-primary px-8 font-bold rounded-full hover:bg-brand-secondary max-w-32 mb-5"
          onClick={handleClick}
        >
          Add wallet
        </Button>
        <div className="font-extrabold text-[26px] lg:text-[35px] text-left w-full">
          Wallets
        </div>

        {accounts.map((account, index) => (
          <div
            className="flex w-full p-4 bg-[#ffffff] rounded-full justify-between items-center mb-5"
            key={index}
          >
            <div className="text-[#000000] font-bold">
              Account {account.accountNumber}
            </div>
            <AccountModal {...account} type="Account" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wallets;
