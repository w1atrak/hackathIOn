import React, {useState} from "react";

interface ChatboxProps {
    chatLines: string[];
}

const Chatbox: React.FC<ChatboxProps> = ({ chatLines }) => {
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
        setCounter(counter + 1);
    };

    return (
        <div className="chatbox bg-blue-500 bg-opacity-50 p-5 rounded-md w-full h-1/3 mt-0" onClick={handleClick}>
            <p className="text-white">{chatLines[counter]}</p>
        </div>
    );
}

export default Chatbox;