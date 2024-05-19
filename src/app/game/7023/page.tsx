'use client';

import React, { useState } from 'react';
import FinalDialog from "~/components/FinalDialog";
import messages from "./messages.json";

interface Prompt {
    question: string;
    promptReturn: string;
    answer: string;
}

const Prompts: { [key: number]: Prompt } = messages.prompts;
const tryAgainMessages = messages.tryAgainMessages;

const RealChatbot: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [level, setLevel] = useState(1);
    const [message2, setMessage2] = useState('');
    const [isGameCompleted, setIsGameCompleted] = useState(false);
    const [money, setMoney] = useState(10);

    const handleSendPrompt = () => {
        if (inputValue.includes(Prompts[level].question)) {
            setMessage(Prompts[level].promptReturn || '');
        } else {
            const randomIndex = Math.floor(Math.random() * tryAgainMessages.length);
            setMessage(tryAgainMessages[randomIndex] ?? '');
        }
    };

    const handleSubmit = () => {
        const correctPassword = Prompts[level].answer;

        if (password === correctPassword) {
            if (level + 1 === 3) {
                setIsGameCompleted(true);
            }
            setLevel(level + 1);
            setMessage('');
            setPassword('');
            setInputValue('');
        } else {
            if (money >= 2) setMoney(money - 2);
            setMessage2('Incorrect password. Please try again.');
        }
    }

    const surrender = () => {
        if (level === 1) setMoney(0);
        if (level === 2) setMoney(5);
        setIsGameCompleted(true);
    }

    return (
        <div>
        {!isGameCompleted ? (
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-gray-900 text-white p-4 md:p-8">

                <div className="space-y-6 flex flex-col items-center">
                    <h2 className="text-2xl font-bold">Poziom: {level}</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col items-center space-y-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
                                placeholder="Wpisz pytanie do czatu"
                            />
                            <button
                                onClick={handleSendPrompt}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                Wyślij pytanie
                            </button>
                        </div>
                        <p className="text-lg">{message}</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex flex-col items-center space-y-2">
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
                                placeholder="Wpisz hasło"
                            />
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors"
                            >
                                Sprawdź hasło
                            </button>
                        </div>
                        <p className="text-lg">{message2}</p>
                    </div>
                    <button
                        onClick={surrender}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-green-700 transition-colors"
                    >
                        Poddaj się
                    </button>
                </div>
            </main>
        ) : (
            <FinalDialog points={money} taskId={3}/>
        )
        }
        </div>
    );
};

export default RealChatbot;
