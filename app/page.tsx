"use client";
import Link from "next/link";
//import { DogContext } from "./providers"; , { useContext } 
import React from "react";
import { useState, useEffect } from "react";
import { Dog } from "@/app/types/dog";

const API_URL_DOGS = "https://majazocom.github.io/Data/dogs.json";

export default function Home() {
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dogsResponse = await fetch(API_URL_DOGS);
        const dogsData = await dogsResponse.json();
        setDogs(dogsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="p-6 bg-yellow-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center">Welcome to the Doggy Daycare</h1>
      <div className="flex gap-6 justify-center mt-6">
        <Link href="/dog" className="bg-blue-500 text-white p-4 rounded-lg">
          📚 View Dogs i LocalStorege
        </Link>

        <Link href="/hunder" className="bg-green-500 text-white p-4 rounded-lg">
          🐶 View Dogs
        </Link>

        <Link href="/present"className="bg-blue-300 font-bold m-4rem px-6 py-3 rounded-lg hover:bg-blue-100 transition">
        Närvaro🐶List
        </Link>

      </div>
    </main>
  );
}


/*export default function Home() {
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
}*/

