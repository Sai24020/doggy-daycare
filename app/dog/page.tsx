"use client";// Gör sidan till en klientkomponent eftersom useRouter används
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const API_URL = "https://majazocom.github.io/Data/dogs.json";

export default function DogsPage() {
  const { id } = useParams(); // Hämta produkt-ID från URL
  const router = useRouter(); 
  const [dogs, setDogs] = useState<any[]>([]);//  eller = useState<Dogs | null>(null);
  const [presentDogs, setPresentDogs] = useState<any[]>([]);
  const [showPresentDogs, setShowPresentDogs] = useState(false); // Toggle for present dogs list

  useEffect(() => {
    const storedDogs = localStorage.getItem("dogs");
    if (storedDogs) {
      setDogs(JSON.parse(storedDogs));
    } else {
      fetchDogs();
    }

    const storedPresentDogs = localStorage.getItem("presentDogs");
    if (storedPresentDogs) {
      setPresentDogs(JSON.parse(storedPresentDogs));
    }
  }, [id]);

  const fetchDogs = async () => {
    try {
      const response = await fetch(`https://majazocom.github.io/Data/dogs.json/dog/${id}`);
      const data = await response.json();
      setDogs(data);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //const data = await response.json();
      const dogsWithPresence = data.map((dog: any) => ({ ...dog, isPresent: false }));
      setDogs(dogsWithPresence);
      localStorage.setItem("dogs", JSON.stringify(dogsWithPresence));
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  const togglePresence = (index: number) => {
    const updatedDogs = [...dogs];
    updatedDogs[index].isPresent = !updatedDogs[index].isPresent;
    setDogs(updatedDogs);
    localStorage.setItem("dogs", JSON.stringify(updatedDogs));
    updatePresentDogs(updatedDogs);
  };

  const updatePresentDogs = (dogsList: any[]) => {
    const present = dogsList.filter(dog => dog.isPresent);
    setPresentDogs(present);
    localStorage.setItem("presentDogs", JSON.stringify(present));
  };

  const fetchPresentDogs = () => {
    const storedPresentDogs = localStorage.getItem("presentDogs");
    if (storedPresentDogs) {
      setPresentDogs(JSON.parse(storedPresentDogs));
      setShowPresentDogs(true); // Show present dogs list
    }
  };
  const clearPresentDogs = () => {
    localStorage.removeItem("presentDogs");
    setPresentDogs([]);
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen text-center">

      <h1 className="text-3xl font-bold mb-6">🐶 Dog List</h1>
      
      <div className="mt-6">
        <Link href="/" className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-400">
          🔙 Back to Home
        </Link>
      </div>
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={fetchDogs}
          className="bg-green-500 text-white p-4 rounded-lg hover:bg-orange-400"
        >
          Fetch Dogs 🐕
        </button>
        <button
          onClick={fetchPresentDogs}
          className="bg-orange-500 text-white bold p-4 rounded-lg hover:bg-red-700"
        >
          Fetch Present Dogs 🐶
        </button>
        <button
          onClick={clearPresentDogs}
          className="bg-red-500 text-white bold p-4 rounded-lg hover:bg-green-400"
        >
          Clear Present Dogs ❌
        </button>
      </div>

      {/* Present Dogs List - Toggled by fetchPresentDogs */}
      {showPresentDogs && (
        <div>
          <h2 className="text-2xl font-bold mt-8">Present Dogs 🟢<span>
                     Total present dogs are: {presentDogs.length}
                  </span></h2>
          {presentDogs.length > 0 ? (
            <ul className="space-y-4">
              {presentDogs.map((dog, index) => (
                <><li key={index} className="bg-white p-4 shadow rounded-lg">
                      <h2 className="text-xl font-bold text-green-600">
                          {dog.name} ({dog.sex})
                      </h2>
                  </li>
                </>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No present dogs yet.</p>
          )}
        </div>
      )}

      {dogs.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dogs.map((dog, index) => (
            <li key={index} className="flex bg-yellow-200 p-4 shadow rounded-lg gap-10">
                <div className="grid">
              <img src={dog.img} alt={dog.name} className="w-40 h-40 mx-auto flex" />
              <h2 className="text-xl font-bold">
                {dog.name} ({dog.sex})
              </h2>
              <button
                onClick={() => togglePresence(index)}
                className={`px-4 py-2 mt-4 rounded-md ${
                  dog.isPresent ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {dog.isPresent ? "Mark as Absent" : "Mark as Present"}
              </button>
              </div>
              <div className="px-10 py-10 mt-4 rounded-md">
              <p>Breed: {dog.breed}</p>
              <p>Age: {dog.age} years</p>
              <p className="mt-2">Description: {dog.description}</p>
             
              <p className="mt-2 text-black">Owner: <br></br> <span className="text-gray-700">{dog.owner.name}  {dog.owner.lastName}</span></p>
              <p className="mt-2 text-black">Phone: <br></br>
               <span className="text-gray-700">
                {dog.owner.phoneNumber}
               </span></p>
              <p className="mt-2 text-black">E-mail: <br></br> 
              <span className="text-gray-700">
                {dog.owner.email}
              </span></p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No dogs available. Click "Fetch Dogs" to load data.</p>
      )}

      {/* Tillbaka-knapp */}
      <button onClick={() => router.back()} className="mb-4 p-2 bg-gray-300 rounded">
        ⬅ Tillbaka
      </button>

    </div>
  );
}

/*


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_URL = "https://majazocom.github.io/Data/books.json";

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
      localStorage.setItem("books", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const clearBooks = () => {
    localStorage.removeItem("books");
    setBooks([]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-6">📚 Book List</h1>
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={fetchBooks}
          className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-400"
        >
          Fetch Books 📖
        </button>
        <button
          onClick={clearBooks}
          className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-400"
        >
          Clear Books ❌
        </button>
      </div>
      {books.length > 0 ? (
        <ul className="space-y-4">
          {books.map((book, index) => (
            <li key={index} className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p>Author: {book.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No books available. Click "Fetch Books" to load data.</p>
      )}
      <div className="mt-6">
        <Link href="/" className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-400">
          🔙 Back to Home
        </Link>
      </div>
    </div>
  );
}*/
