"use client";
import Link from "next/link";
import { DogContext } from "./providers";
import React, { useContext } from "react";

export default function Home() {
  const dogctx = useContext(DogContext);
  if (!dogctx) throw new Error("dogcontext måste användas inom en DodProvider");
 
  const { dogName, setDogName } = dogctx;
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-yellow-200 p-6">
      <h1 className="text-4xl font-bold mb-6">WELCOME TO DOGGY DAYCARE, {dogName}</h1>
     <div className="flex">
      <Link
        href="/hunder"
        className="bg-blue-300 font-bold m-4rem px-6 py-3 rounded-lg hover:bg-blue-100 transition"
      >
       🐶 OUR DOGS 🐶
      </Link>

      <Link 
      href="/present"
      className="bg-blue-300 font-bold m-4rem px-6 py-3 rounded-lg hover:bg-blue-100 transition"
      >
        Närvaro🐶List
      </Link>
      </div>
      <button onClick={() => setDogName("Sussi🐶, Annat name")}>BYT Name🐶</button>
    </main>
  );
}


