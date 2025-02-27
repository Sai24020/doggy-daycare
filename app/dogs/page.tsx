import { Metadata } from "next";
import DogList from "./dog-list";

export const metadata: Metadata = {
    title: "Create Dog List",
    description: "Generated by create next app",
  };

export default async function ListPage() {
    return (
        <main className="space-y-4 container mx-auto">
            <DogList />
        </main>
    )
}