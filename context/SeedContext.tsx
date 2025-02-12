'use client'

import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from "react";

interface SeedContextType {
    seed: string | null;
    setSeed: Dispatch<SetStateAction<string | null>>;
    isSeedAvailable: () => Promise<boolean>; 
}

const SeedContext = createContext<SeedContextType | undefined>(undefined);

const SeedContextProvider = ({ children }:{ children: ReactNode }) => {
    const [ seed, setSeed ] = useState<string | null>(null);

    const isSeedAvailable = async () => {
        if(seed) return true;

        return false;
    };

    useEffect(() => {
        const seed = localStorage.getItem("seed");
        if(seed){
            setSeed(seed);
        }
    },[]);
    const value = {
        seed,
        setSeed,
        isSeedAvailable
    }

    return (
        <SeedContext.Provider value={value} >
            { children }
        </SeedContext.Provider>
    );
}

export const useSeedContext = () => useContext(SeedContext);

export default SeedContextProvider;