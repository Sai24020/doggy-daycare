import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-yellow-200 p-6">
      <h1 className="text-4xl font-bold mb-6">WELCOME TO DOGGY DAYCARE </h1>
      <Link
        href="/hunder"
        className="bg-blue-300 font-bold m-4rem px-6 py-3 rounded-lg hover:bg-blue-100 transition"
      >
       🐶 OUR DOGS 🐶
      </Link>
    </main>
  );
}


