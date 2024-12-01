"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Scoreboard } from "~/components/Scoreboard";
import { useSharedState } from "../context";
import { User, Class, ApiResponse, Task } from "~/types/types";
import { useRouter } from "next/navigation";
import { FaTrophy } from 'react-icons/fa'; // Import Font Awesome Trophy icon

const Profile = () => {
    const [username, setUsername] = useState("");
    const [className, setClassName] = useState("");
    const [money, setMoney] = useState(0);
    const [data, setData] = useState<ApiResponse | null>(null);
    const [imgUrl, setImgUrl] = useState("");

    const { userId } = useSharedState();

    useEffect(() => {
        const fetchProfile = async () => {
            console.log(userId)
            try {
                const response = await fetch('http://127.0.0.1:8080/data/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: ApiResponse = await response.json();
                setData(data);

                const foundUser = data.users.find((user: User) => user.id === userId);
                if (foundUser) {
                    setUsername(foundUser.name);
                    const foundClass = data.classes.find((cls: Class) => cls.id === foundUser.classId);
                    if (foundClass) {
                        setImgUrl("/" + foundClass.imageUrl);
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
        <div className="flex bg-blue-500 rounded-lg p-5 w-full my-4 max-w-5xl mx-auto">
            <div className="w-1/10">
                <Image src={imgUrl} alt="Profile" width={100} height={100} />
            </div>
            <div className="flex flex-col justify-center ml-5">
                <div className="flex justify-between">
                    <p className="text-white">{username + " • " + className}</p>
                </div>
                <p className="text-white">{money} zł/h</p>
            </div>
        </div>
    );
};

export default function Home() {
    const [code, setCode] = useState('');
    const [showScoreboard, setShowScoreboard] = useState(false);
    const [data, setData] = useState<ApiResponse | null>(null);
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const fetchTasks = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8080/data/');
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
        <main className="flex flex-col items-center w-full mt-5 space-y-10">
            {!showScoreboard && <div className="w-full space-y-10 max-w-5xl mx-auto px-4">
                <Profile className="w-full mt-10"/>
                <form onSubmit={handleSubmit} className="flex bg-blue-500 rounded-lg p-5 w-full">
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength={4}
                        placeholder="Wpisz 4-cyfrowy kod"
                        className="flex-grow mr-2 p-2 rounded"
                    />
                    <button type="submit" className="flex-none bg-white text-blue-500 p-2 rounded hover:bg-gray-200">
                        Wyślij
                    </button>
                </form>
            </div>}
            <button
                onClick={() => setShowScoreboard(!showScoreboard)}
                className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
            >
                <FaTrophy size={24} />
            </button>
            {showScoreboard && <Scoreboard />}
        </main>
    );
}
