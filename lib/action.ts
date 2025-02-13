import { Account } from "@/app/(root)/wallets/page";


export const getOrCreateWallets = (mnemonic?: string, accountsGenerated?: number): { accounts: Account[], mnemonic: string, accountsGenerated: number } => {
    return {
        accounts: [],
        mnemonic: "",
        accountsGenerated: 0
    }
};
