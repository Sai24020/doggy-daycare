/*'use client';
import { useDogsContext } from '@/app/hooks/useDogs'
import React from 'react'

export default function DogsPage() {
    const { state, dispatch } = useDogsContext();

    const addDog = () => {
        const newDogName = prompt("Vad heter hunden?");
        if (newDogName) dispatch({type: "ADD_DOG", payload: newDogName})
    };

    return (
        <main>
            <ul>
                {state.dogs.map((dog, i) => (
                    <li key={i}>{dog}</li>
                ))}
            </ul>
            <button onClick={addDog}>Lägg till hund</button>
        </main>
    )
}*/