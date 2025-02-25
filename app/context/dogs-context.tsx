/*"use client";

import { createContext, Dispatch, ReactNode, useReducer } from "react";

// 1. typdefinitioner
type DogState = { dogs: string[] };
type DogAction = { type: string; payload: string };

// 2. reducerfunktion
const dogReducer = (state: DogState, action: DogAction): DogState => {
    switch (action.type) {
        case "ADD_DOG":
            return { ...state, dogs: [...state.dogs, action.payload] };
        // ...state -> här kopierar vi alla egenskaper från det befintliga state-objektet och kopierar till ett nytt objekt
        // detta för att inte mutera statet direkt
        // dogs: [...state.dogs, action.payload]
        // ...state.dogs => kopierar alla hundar i dogs-arrayen
        // resultat: en NY array med alla gamla hundar + den nya hunden (action.payload)
        case "DELETE_DOG":
            // todo: delete dog (action.payload) from dogs
            return state;
        case "UPDATE_DOG":
            // todo: update dog (action.payload) in dogs
            return state;
        default:
            return state;
    }
};

// 3. skapa context
export const DogsContext = createContext<{state: DogState; dispatch: Dispatch<DogAction>} | undefined> (
    undefined
);

// 4. provider-komponent
export function DogsProvider({children}: {children: ReactNode}) {
    const [state, dispatch] = useReducer(dogReducer, {dogs: ["Fido", "Buster"]});

    // useEffect(() => {}, []);
    return (
        <DogsContext.Provider value={{state, dispatch}}>
            {children}
        </DogsContext.Provider>
    )
}
*/