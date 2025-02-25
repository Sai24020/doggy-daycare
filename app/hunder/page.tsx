"use client";

import { useState, useEffect } from "react";
import DogCard from "@/app/components/DogCard";
import { Dog } from "@/app/types/dog";
import Link from "next/link";

export default function HundarPage() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchDogs = async () => {
      //TODO
      const response = await fetch("https://majazocom.github.io/Data/dogs.json");
      const data = await response.json();
      setDogs(data);
      setFilteredDogs(data);
    };
    fetchDogs();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    filterDogs(e.target.value, filter);
  };

  const handleFilter = (value: string) => {
    setFilter(value);
    filterDogs(search, value);
  };

  const filterDogs = (searchTerm: string, filterValue: string) => {
    let filtered = dogs.filter((dog) =>
      dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dog.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterValue === "Present") {
      filtered = filtered.filter((dog) => dog.present);
    } else if (filterValue === "Absent") {
      filtered = filtered.filter((dog) => !dog.present);
    }

    setFilteredDogs(filtered);
  };

  return (
    <div className="p-6 bg-yellow-200 min-h-screen">
     <Link href="/">Start</Link>
      <h1 className="text-3xl font-bold text-center">OUR DOGS{}</h1>
      <div className="flex justify-center gap-4 my-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="border p-2 rounded"
        />
        <select onChange={(e) => handleFilter(e.target.value)} className="border p-2 rounded">
          <option>All DOGS</option>
          <option>Present DOGS</option>
          <option>Absent DOGS</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>
    </div>
  );
}
