import Link from "next/link";
import { Dog } from "../types/dog";

interface Props {
  dog: Dog;
}

export default function DogCard({ dog }: Props) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <img src={dog.img} alt={dog.name} className="w-full h-40 object-cover rounded-md" />
      <div className="flex ">
      <h2 className="text-xl font-bold mt-2">{dog.name}</h2>
      <span className="font-semi text-blue-400">{dog.sex}</span>
      </div>
      <p>{dog.breed}</p>
      <p>Age: {dog.age} y/o</p>
      <p>Owner: {dog.owner.name}</p>
      <p className={dog.present ? "text-green-500" : "text-red-500"}>
        {dog.present ? "✅ Present" : "❌ Absent"}
      </p>
      <Link href={dog.id ? `/hundar/${dog.id}` : '#'}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-3 w-full">
          View Profile
        </button>
      </Link>
    </div>
  );
}


