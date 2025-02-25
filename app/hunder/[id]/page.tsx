"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dog } from "@/app/types/dog";

export default function DogProfile({ params }: { params: { id: string } }) {
  const [dog, setDog] = useState<Dog | null>(null);
  const [isPresent, setIsPresent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDog = async () => {
      const response = await fetch("https://majazocom.github.io/Data/dogs.json");
      const data = await response.json();
      const foundDog = data.find((d: Dog) => d.id === Number(params.id));

      if (!foundDog) {
        router.push("/404  - page not found");
      } else { 
        setDog(foundDog);
        setIsPresent(foundDog.present);
      }
    };
    fetchDog();
  }, [params.id]);

  if (!dog) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <img src={dog.img} alt={dog.name} className="w-350 h-350" />
      <div className="flex ">
      <h1 className="text-3xl font-bold">{dog.name}</h1>
      <span className="text-2xl font-bold">{dog.sex}</span>
      </div>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age} years</p>
      <p>Owner: {dog.owner.name}</p>
      <button
        onClick={() => setIsPresent(!isPresent)}
        className={`px-4 py-2 mt-4 rounded-md ${
          isPresent ? "bg-green-500" : "bg-red-500"
        } text-white`}
      >
        {isPresent ? "Mark as Absent" : "Mark as Present"}
      </button>
    </div>
  );
}
