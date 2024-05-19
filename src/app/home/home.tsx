"use client";

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {Scoreboard} from "~/components/Scoreboard";
import { useSharedState } from "../context";
import {User, Class, ApiResponse, Task} from "~/types/types";
import {useRouter} from "next/navigation";
const Profile = () => {

    const [username, setUsername] = useState("");
    const [className, setClassName] = useState("");
    const [money, setMoney] = useState(0);
    const [data, setData] = useState<ApiResponse | null>(null);

    const {userId} = useSharedState();



    useEffect(() => {
        const fetchProfile = async () => {
            console.log(userId)
            try {
                const response = await fetch('https://test.nyaaa.me/data/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: ApiResponse = await response.json();

                setData(data);

                const foundUser = data.users.find((user: User) => user.id === userId);
                if(foundUser) {
                    setUsername(foundUser.name);
                    const foundClass = data.classes.find((cls: Class) => cls.id === foundUser.classId);
                    if (foundClass) {
                        setClassName(foundClass.name);

                        const totalPoints = data.scores
                            .filter(score => score.userId === userId)
                            .reduce((total, score) => total + score.points, 0);

                        setMoney(totalPoints)
                    }
                }

            } catch (error) {
                console.error('Error fetching classes:', error);
                alert('Wystąpił błąd podczas pobierania klas!');
            }
        }

        fetchProfile().catch(console.error);
    }, []);

    return (
        <div className="flex bg-blue-500 rounded-lg p-5">
            <div className="w-1/10">
                <Image src="/profile.jpg" alt="Profile" width={100} height={100} />
            </div>
            <div className="flex flex-col justify-center ml-5">
                <div className="flex justify-between">
                    <p className="text-white">{username + " " + className}</p>
                </div>
                <p className="text-white">{money} zł/h</p>
            </div>
        </div>
    );
};

export default function Home(){
    const [code, setCode] = useState('');
    const [showScoreboard, setShowScoreboard] = useState(false);

    const [data, setData] = useState<ApiResponse | null>(null);

    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const fetchTasks = async () => {
            try {
                const response = await fetch('https://test.nyaaa.me/data/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: ApiResponse = await response.json();

                setData(data);
                const isCodeValid = data.tasks.some((task: Task) => task.code === code);
                if (isCodeValid) {
                    router.push('/game/' + code);
                } else {
                    console.log("The entered code does not match any game's code.");
                }
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        }

        fetchTasks().catch(console.error);
    };
    return (
        <main className="flex flex-col items-center space-y-10">
            <Profile className="mt-10"/>
            <form onSubmit={handleSubmit} className="flex bg-blue-500 rounded-lg p-5">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={4}
                    placeholder="Enter 4-digit code"
                    className="flex-grow mr-2"
                />
                <button type="submit" className="flex-none">Submit</button>
            </form>
            <button onClick={() => setShowScoreboard(!showScoreboard)}>
                Tablica wyników
            </button>
            {showScoreboard && <Scoreboard />}
        </main>
    );
}