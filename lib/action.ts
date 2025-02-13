import { Account } from "@/app/(root)/wallets/page";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";

export const getOrCreateWallets = ({
  mnemonic,
  accountsGenerated,
}: {
  mnemonic?: string;
  accountsGenerated: number;
}): { accounts: Account[]; mnemonic: string; accountsGenerated: number } => {
  const accounts: Account[] = [];
  if (mnemonic && accountsGenerated !== undefined) {
    const seed = mnemonicToSeedSync(mnemonic);

    if (accountsGenerated == 0) {
      const path = `m/44'/501'/${accountsGenerated}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const KeyPair = Keypair.fromSecretKey(secret);
      const publicKey = KeyPair.publicKey.toBase58();
      const privateKey = KeyPair.secretKey.toString();
      const accountNumber = accountsGenerated + 1;
      const account: Account = {
        accountNumber,
        publicKey,
        privateKey,
      };

      accounts.push(account);
      accountsGenerated += 1;
      return {
        mnemonic: mnemonic,
        accounts,
        accountsGenerated,
      };
    }

    for (let i = 0; i < accountsGenerated; i++) {
      const path = `m/44'/501'/${i}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const KeyPair = Keypair.fromSecretKey(secret);
      const publicKey = KeyPair.publicKey.toBase58();
      const privateKey = KeyPair.secretKey.toString();
      const accountNumber = i + 1;
      const account: Account = {
        accountNumber,
        publicKey,
        privateKey,
      };

      accounts.push(account);
    }

    return {
      accounts,
      mnemonic,
      accountsGenerated,
    };
  }

  const generatedMnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(generatedMnemonic);
  if (accountsGenerated == 0) {
    const path = `m/44'/501'/${accountsGenerated}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const KeyPair = Keypair.fromSecretKey(secret);
    const publicKey = KeyPair.publicKey.toBase58();
    const privateKey = KeyPair.secretKey.toString();
    const accountNumber = accountsGenerated + 1;
    const account: Account = {
      accountNumber,
      publicKey,
      privateKey,
    };

    accounts.push(account);
    accountsGenerated += 1;
    return {
      mnemonic: generatedMnemonic,
      accounts,
      accountsGenerated,
    };
  }

  for (let i = 0; i < accountsGenerated; i++) {
    const path = `m/44'/501'/${i}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const KeyPair = Keypair.fromSecretKey(secret);
    const publicKey = KeyPair.publicKey.toBase58();
    const privateKey = KeyPair.secretKey.toString();
    const accountNumber = i + 1;
    const account: Account = {
      accountNumber,
      publicKey,
      privateKey,
    };

    accounts.push(account);
    accountsGenerated += 1;
  }

  return {
    accounts,
    mnemonic: generatedMnemonic,
    accountsGenerated,
  };
};
