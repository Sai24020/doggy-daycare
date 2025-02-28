export interface Dog {
    id: number;
    chipNumber: string;
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