import React, { useState, useEffect } from "react";

interface ChatboxProps {
    chatLines: string[];
    setIsChatboxComplete: (value: boolean) => void;
    showTitle: boolean;
}

const Chatbox: React.FC<ChatboxProps> = ({ chatLines, setIsChatboxComplete, showTitle }) => {
    const [counter, setCounter] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const [imgCounter, setImgCounter] = useState(0);
    const images = ["/xdddddd.png", "/xdddddd2.png"]

    const handleClick = () => {
        setCounter(counter + 1);
        if(counter === chatLines.length - 1) {
            setIsChatboxComplete(true);
        }
        setCurrentText("");
        setCurrentIndex(0);
    };

    const [imgTimer, setImgTimer] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (counter < chatLines.length && currentIndex < chatLines[counter].length) {
                setCurrentText(prevText => prevText + chatLines[counter][currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
                setImgTimer((imgTimer + 1)%5);
                if(imgTimer === 0){
                    setImgCounter((imgCounter + 1)%2)
                }
            } else {
                clearInterval(timer);
            }
        }, 25); // Adjust speed as needed

        return () => clearInterval(timer);
    }, [counter, currentIndex, chatLines]);


    return (
    <div className="relative flex items-center justify-center h-screen flex-col">
        {showTitle && <h1 className="text-4xl text-white mb-10 text-center">WI are the Champions</h1>}
        <img className="w-1/2 mb-0" src={images[imgCounter]} alt="powazny czlowiek"/>
        <div className="chatbox bg-blue-500 bg-opacity-50 p-5 rounded-md w-full h-1/3 mt-0" onClick={handleClick}>
            <p className="text-white text-left">{currentText}</p>
        </div>
    </div>
    )
        ;
}

export default Chatbox;