"use client";

import React, { useState } from 'react';
import { db } from "~/server/db";
import Image from 'next/image';

const Profile = ({ money }: { money: number | null }) => {
    return (
        <div>
            <Image src="/profile.jpg" alt="Profile" width={100} height={100} />
            <h1>Nick</h1>
            <p>Klasa postaci</p>
            <p>{money} zł/h</p>
        </div>
    );
};

const Scoreboard = () => {
    return(
        <div>
            <h2>Scoreboard</h2>
            <ol>
                <li>Player 1</li>
                <li>Player 2</li>
                <li>Player 3</li>
            </ol>
        </div>
    );
}

export default function Home(){
    const [code, setCode] = useState('');
    const [showScoreboard, setShowScoreboard] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const correctCode = '1234'; // replace with your actual code

        if (code === correctCode) {
            window.location.href = '/quiz'; // replace with your actual page
        } else {
            alert('Niepoprawny kod. Spróbuj ponownie');
            setCode('');
        }
    };
    return (
        <main>
            <Profile money={0} />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={4}
                    placeholder="Enter 4-digit code"
                />
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => setShowScoreboard(!showScoreboard)}>
                Tablica wyników
            </button>
            {showScoreboard && <Scoreboard />}
        </main>
    );
}