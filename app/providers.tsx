'use client';
import React, { createContext, useState } from "react";
//en separate file

interface DogContextInterface {
    dogName: string;
    setDogName: React.Dispatch<React.SetStateAction<string>>;
}

//skapa context
export const DogContext = createContext< DogContextInterface | null >(null);


//provider komponent
export function DogProvider({ children }: { children: React.ReactNode}) {
  const [dogName, setDogName] = useState<string>("Ascella")
    return (
    <DogContext.Provider value={{dogName, setDogName}}>
        {children}
    </DogContext.Provider>
   );
}

