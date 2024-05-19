import React, { useState, useEffect, useCallback } from "react";

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
    const images = ["/xdddddd.png", "/xdddddd2.png"];

    const [imgTimer, setImgTimer] = useState(0);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode | null>(null);
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
    const [gainNode, setGainNode] = useState<GainNode | null>(null);

    useEffect(() => {
        const loadAudio = async () => {
            if (!audioContext) {
                const context = new (window.AudioContext || (window as any).webkitAudioContext)();
                setAudioContext(context);
                const gain = context.createGain();
                gain.gain.value = 2;
                setGainNode(gain);
                const response = await fetch('/speech.mp3');
                const arrayBuffer = await response.arrayBuffer();
                const buffer = await context.decodeAudioData(arrayBuffer);
                setAudioBuffer(buffer);
            }
        };
        loadAudio().catch(console.error);
    }, []);

    const playAudio = useCallback(() => {
        if (audioContext && audioBuffer && gainNode) {
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.playbackRate.value = 0.9 + Math.random() * 0.2;
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            source.start(0);
            source.loop = true;
            setSourceNode(source);
        }
    }, [audioContext, audioBuffer, gainNode]);

    const stopAudio = useCallback(() => {
        if (sourceNode) {
            sourceNode.stop(0);
            setSourceNode(null);
        }
    }, [sourceNode]);

    const handleClick = () => {
        stopAudio();
        if (!audioContext) {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            setAudioContext(context);
            const loadAudio = async () => {
                const gain = context.createGain();
                gain.gain.value = 2;
                setGainNode(gain);
                const response = await fetch('/speech.mp3');
                const arrayBuffer = await response.arrayBuffer();
                const buffer = await context.decodeAudioData(arrayBuffer);
                setAudioBuffer(buffer);
                setCounter(counter + 1);
            };
            loadAudio().catch(console.error);
        } else {
            setCounter(counter + 1);
        }
        if (counter === chatLines.length - 1) {
            setIsChatboxComplete(true);
            stopAudio();
        }
        setCurrentText("");
        setCurrentIndex(0);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (counter < chatLines.length && currentIndex < chatLines[counter].length) {
                if (currentIndex === 0) {
                    playAudio();
                }
                setCurrentText(prevText => prevText + chatLines[counter][currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
                setImgTimer((imgTimer + 1) % 5);
                if (imgTimer === 0) {
                    setImgCounter((imgCounter + 1) % 2);
                }
            } else {
                clearInterval(timer);
                stopAudio();
            }
        }, 25);

        return () => clearInterval(timer);
    }, [counter, currentIndex, chatLines, imgCounter, imgTimer, playAudio, stopAudio]);

    return (
        <div className="relative flex items-center justify-center h-screen flex-col">
            {showTitle && <h1 className="text-4xl text-white mb-10 text-center">WI are the Champions</h1>}
            <img className="w-1/2 mb-0" src={images[imgCounter]} alt="powazny czlowiek"/>
            <div className="chatbox bg-blue-500 bg-opacity-50 p-5 rounded-md w-full h-1/3 mt-0" onClick={handleClick}>
                <p className="text-white text-left">{currentText}</p>
            </div>
        </div>
    );
}

export default Chatbox;
