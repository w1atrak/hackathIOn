'use client';

import React, { useState } from 'react';

const Prompts = {
    1:{
        question: 'hasło',
        answer: 'masło',
    },
    2:{
        question: 'proszę',
        answer: 'Hakuna matata',
    },
}

const tryAgainMessages = [
    'Nope, spróbuj jeszcze raz',
    'Niestety nie, spróbuj jeszcze raz',
    'Naprawdę? Myślałeś, że to to?',
    'WIem, że stać Cię na więcej...',
]

const RealChatbot: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');

    const handleClick = () => {
        if (inputValue === 'hasło') {
            setMessage('Your password is: hardcodedpassword');
        } else {
            setMessage('Try again');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleClick}>Submit</button>
            <p>{message}</p>
        </div>
    );
};

export default RealChatbot;