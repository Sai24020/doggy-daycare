"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dog } from "../types/dog";

interface DogProfileProps {
  dogId: number;
  allDogs: Dog[];
}

export default function DogProfile({ dogId, allDogs }: DogProfileProps) {
  const router = useRouter();
  const [dog, setDog] = useState<Dog | null>(null);
  const [isPresent, setIsPresent] = useState<boolean>(false);

  useEffect(() => {
    const foundDog = allDogs.find((d) => d.id === dogId);
    if (!foundDog) {
      router.push("/404");
      return;
    }
    setDog(foundDog);
    setIsPresent(foundDog.present);
  }, [dogId, allDogs, router]);

  if (!dog) return <p className="text-center text-xl">Loading...</p>;

  // Find previous and next dog
  const currentIndex = allDogs.findIndex((d) => d.id === dog.id);
  const prevDog = allDogs[currentIndex - 1] || null;
  const nextDog = allDogs[currentIndex + 1] || null;

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <img src={dog.img} alt={dog.name} className="w-full h-64 object-cover rounded-md shadow-md" />
      <h1 className="text-3xl font-bold mt-4">{dog.name}</h1>
      <p className="text-gray-600 text-lg">{dog.breed}</p>
      <p className="text-lg">Age: {dog.age} years</p>
      <p className="mt-2">{dog.description}</p>
      <p className="mt-2 text-gray-700">Owner: {dog.owner.name}</p>

      {/* Toggle Presence Button */}
      <button
        className={`mt-4 px-6 py-2 text-white rounded-lg ${isPresent ? "bg-green-600" : "bg-red-600"}`}
        onClick={() => setIsPresent(!isPresent)}
      >
        {isPresent ? "✅ Present" : "❌ Absent"}
      </button>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        {prevDog ? (
          <button
            onClick={() => router.push(`/hundar/${prevDog.id}`)}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            ← {prevDog.name}
          </button>
        ) : (
          <div />
        )}
        {nextDog ? (
          <button
            onClick={() => router.push(`/hundar/${nextDog.id}`)}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            {nextDog.name} →
          </button>
        ) : (
          <div />
        )}
      </div>
    </main>
  );
}
