import DogCard from "../components/DogCard";

export interface Dog {
    id: number;
    name: string;
    breed: string;
    age: number;
    description: string;
    present: boolean;
    sex: string;
    owner: {
      name: string;
      phone: number;
      email: string;
    };
    img: string;
  }
export interface Props {
  dog: Dog;
}