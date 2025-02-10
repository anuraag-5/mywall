import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden lg:flex flex-col bg-brand-primary w-1/2 xl:w-2/5 p-10">
        <div className="flex font-extrabold text-5xl items-center justify-start gap-6 relative pl-7">
          <Image 
          src="/Brand-Logo.svg"
          alt="Brand"
          width={140}
          height={120}
          />
          <div className="relative bottom-[-21]">MYWALL</div>
        </div>
        <div className="flex flex-col p-10 gap-5">
          <div className="text-[#ffffff] font-extrabold text-4xl mb-20 mt-4">
            Manage multiple wallets the best way
          </div>
          <div className="flex justify-start items-center w-full p-5 bg-brand-secondary rounded-full gap-6 font-bold text-3xl text-[#ffffff]">
            <Image 
            src="/sol-logo.svg"
            alt="Sol"
            width={59}
            height={35}
            />
            Solana
          </div>
          <div className="flex justify-start items-center w-full p-5 bg-brand-secondary rounded-full gap-6 font-bold text-3xl text-[#ffffff]">
            <Image 
            src="/ethereum-logo.svg"
            alt="Eth"
            width={59}
            height={35}
            />
            Ethereum
          </div>
          <div className="flex justify-start items-center w-full p-5 bg-brand-secondary rounded-full gap-6 font-bold text-3xl text-[#ffffff]">
            <Image 
            src="/bitcoin-logo.svg"
            alt="Bit"
            width={59}
            height={35}
            />
            Bitcoin
          </div>
        </div>
      </section>
      {/* <section>{children}</section> */}
    </div>
  );
};

export default AuthLayout;
