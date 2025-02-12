'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useSeedContext } from '@/context/SeedContext'

interface Account {
  publicKey: string,
  privateKey: string
};

const Wallets = () => {
  const seedContext = useSeedContext();
  const [ accounts, setAccounts ] = useState<Account[] | null>(null);
  
  return (
    <div className='min-h-screen bg-brand flex flex-col items-center py-6 px-3'>
      <div className='flex items-center justify-center lg:justify-between h-[100px] w-full max-w-[900px]'>
        <Image src="/Full-Logo.svg" alt="MyWall"
        width={200}
        height={180}
        />
        <Button className='hidden lg:flex bg-brand-primary p-6 font-bold rounded-full hover:bg-brand-secondary'>
          Add wallet
        </Button>
      </div>
      <div className='flex-1'>

      </div>
    </div>
  )
}

export default Wallets