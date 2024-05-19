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

    const handleSendPrompt = () => {
        if (inputValue.includes(Prompts[level].question)) {
            setMessage(Prompts[level].promptReturn || '');
        } else {
            const randomIndex = Math.floor(Math.random() * tryAgainMessages.length);
            console.log(randomIndex);
            setMessage(tryAgainMessages[randomIndex] || '');
        }
    };

    const handleSubmit = () => {
        const correctPassword = Prompts[level].answer;

        if (password === correctPassword) {
            console.log('Current level:', level + 1)
            if (level+1 === 3) {
                setIsGameCompleted(true);
            }
            setLevel(level + 1);
            setMessage('');
            setPassword('');
            setInputValue('');
        } else {
            setMessage2('Incorrect password. Please try again.');
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white p-4 md:p-8">
            {!isGameCompleted && (<div>
                <h2>Current Level: {level}</h2>
                <div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value || '')}
                    />
                    <button onClick={handleSendPrompt}>Wyślij</button>
                    <p>{message}</p>
                </div>
                <div>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value || '')}
                    />
                    <button onClick={handleSubmit}>Wyślij hasło</button>
                    <p>{message2}</p>
                </div>
            </div>)}
            {isGameCompleted && (<FinalDialog points={10} taskId={3}/>)}
        </main>
    );
};

export default RealChatbot;