import React, { useState, useEffect } from "react";

interface ChatboxProps {
    chatLines: string[];
    setIsChatboxComplete: (value: boolean) => void;
}

const Chatbox: React.FC<ChatboxProps> = ({ chatLines, setIsChatboxComplete }) => {
    const [counter, setCounter] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = () => {
        setCounter(counter + 1);
        if(counter === chatLines.length - 1) {
            setIsChatboxComplete(true);
        }
        setCurrentText("");
        setCurrentIndex(0);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (currentIndex < chatLines[counter].length) {
                setCurrentText(prevText => prevText + chatLines[counter][currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            } else {
                clearInterval(timer);
            }
        }, 25); // Adjust speed as needed

        return () => clearInterval(timer);
    }, [counter, currentIndex, chatLines]);

    return (
        <div className="chatbox bg-blue-500 bg-opacity-50 p-5 rounded-md w-full h-1/3 mt-0" onClick={handleClick}>
            <p className="text-white">{currentText}</p>
        </div>
    );
}

export default Chatbox;