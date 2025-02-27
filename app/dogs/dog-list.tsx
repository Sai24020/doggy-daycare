"use client";

import { Dog } from "@/app/types/dog";
import { createContext, useContext } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table";

type DogItem = {
  dog: Dog; // Correcting the property name
  present: boolean;
};

// Here we state what is available in our context
type DogContextType = {
  DogList: DogItem[];
  dogTotal: number;
};

// Create the context with undefined as initial state (since it is empty from start)
export const DogContext = createContext<DogContextType | undefined>(undefined);

// Make our custom hook to use the dog context
export const useDog = () => {
  const context = useContext(DogContext);
  // This is to see that we don't try to use the hook without having the right context for it
  if (!context) {
    throw new Error("useDog must be used within a DogProvider");
  }
  return context;
};

export default function DogList() {
  const { DogList, dogTotal } = useDog(); // Accessing the context

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Dog List</h2>
      {DogList.length === 0 ? (
        <p>Your list is empty.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Dog Name</TableHead>
              <TableHead className="w-[100px] text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DogList.map((DogItem) => (
              <TableRow key={DogItem.dog.chipNumber}>
                <TableCell className="font-medium">
                  {DogItem.dog.name}
                </TableCell>
                <TableCell className="text-right">{DogItem.dog.id}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-bold text-right">Total:</TableCell>
              <TableCell className="text-right">${dogTotal}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}


