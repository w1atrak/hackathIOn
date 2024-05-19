'use client';
import React, { useState } from 'react';
import DraggableWire from './DraggableWire';
import WireConnector from './WireConnector';
import WireLine from './WireLine'
import type { DraggableEvent, DraggableData } from 'react-draggable';
import FinalDialog from '~/components/FinalDialog';

interface Position {
    x: number;
    y: number;
}

interface Wire {
    color: string;
    color2: string;
    position: Position;
    startPosition: Position;
}

interface Flag {
    index: number;
    flag: boolean;
}

const MainComponent = () => {
    const [isComplete, setIsComplete] = useState(false);
    const [money, setMoney] = useState(10);

    const [wires, setWires] = useState<Wire[]>([
        { color: 'white', color2: 'orange', position: { x: 80, y: 100 }, startPosition: { x: 80, y: 100 }},
        { color: 'orange', color2: 'orange', position: { x: 80, y: 130 }, startPosition: { x: 80, y: 130 }},
        { color: 'white', color2: 'green', position: { x: 80, y: 160 }, startPosition: { x: 80, y: 160}},
        { color: 'blue', color2: 'blue', position: { x: 80, y: 190 }, startPosition: { x: 80, y: 190 }},
        { color: 'white', color2: 'blue', position: { x: 80, y: 220 }, startPosition: { x: 80, y: 220 }},
        { color: 'green', color2: 'green', position: { x: 80, y: 250 }, startPosition: { x: 80, y: 250 }},
        { color: 'white', color2: 'brown', position: { x: 80, y: 280 }, startPosition: { x: 80, y: 280 }},
        { color: 'brown', color2: 'brown', position: { x: 80, y: 310 }, startPosition: { x: 80, y: 310 }},
    ]);

    const [connectors, setConnectors] = useState<Wire[]>([
        { color: 'gray', color2: 'white', position: { x: window.innerWidth-80, y: 100 }, startPosition: { x: window.innerWidth-80, y: 100 }},
        { color: 'gray', color2: 'white', position: { x: window.innerWidth-80, y: 150 }, startPosition: { x: window.innerWidth-80, y: 150 }},
        { color: 'gray', color2: 'white', position: { x: window.innerWidth-80, y: 200 }, startPosition: { x: window.innerWidth-80, y: 200 }},
        { color: 'gray', color2: 'white', position: { x: window.innerWidth-80, y: 250 }, startPosition: { x: window.innerWidth-80, y: 250 }},
        { color: 'gray', color2: 'white', position: { x: window.innerWidth-80, y: 300 }, startPosition: { x: window.innerWidth-80, y: 300 }},
        { color: 'gray', color2: 'white', position: { x: window.innerWidth-80, y: 350 }, startPosition: { x: window.innerWidth-80, y: 350 }},
        { color: 'gray', color2: 'white', position: { x: window.innerWidth-80, y: 400 }, startPosition: { x: window.innerWidth-80, y: 400 }},
        { color: 'gray', color2: 'white', position: { x: window.innerWidth-80, y: 450 }, startPosition: { x: window.innerWidth-80, y: 450 }},
    ]);

    const [flags, setFlags] = useState<Flag[]>([
        { index: 2, flag: false },
        { index: 5, flag: false },
        { index: 0, flag: false },
        { index: 3, flag: false },
        { index: 4, flag: false },
        { index: 1, flag: false },
        { index: 6, flag: false },
        { index: 7, flag: false },
    ]);

    const handleStop = (e: DraggableEvent, data: DraggableData, index: number) => {
        if (index !== undefined) {
            const newWires = [...wires];
            const newFlags = [...flags];
            let isCloseEnough = false;

            for (let i = 0; i < connectors.length; i++) {
                const wire = wires[index];
                const connector = connectors[i];

                const distance = Math.sqrt(
                    Math.pow(wire.position.x + 20 - connector.position.x, 2) +
                    Math.pow(wire.position.y + 20 * index - connector.position.y, 2)
                );

                if (distance < 30) {
                    newWires[index].position = {x: connector.position.x - 20, y: connector.position.y - 20 * index};
                    setWires(newWires);
                    isCloseEnough = true;

                    newFlags[index].flag = i === newFlags[index].index;
                    setFlags(newFlags);
                    break;
                }
            }
            if (!isCloseEnough) {
                newWires[index].position = newWires[index].startPosition;
                setWires(newWires);
                newFlags[index].flag = false;
                setFlags(newFlags);
            }

        } else {
            console.error('Index is undefined');
        }
    };

    const handleDrag = (e: DraggableEvent, data: DraggableData, index: number) => {
        const newWires = [...wires];
        if (newWires[index]) {
            newWires[index].position = { x: data.x, y: data.y };
            setWires(newWires);
        }
    };

    const checkFlags = () => {
        const allTrue = flags.every(flag => flag.flag);
        if (allTrue) {
            setIsComplete(allTrue);
        } else {
            if (money >= 2) setMoney(money - 2);
        }

    };

    return (
        <main>
            {!isComplete && (<div>
                <svg style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
                    {wires.map((wire, index) => (
                        <WireLine
                            key={index}
                            start={wire.startPosition}
                            end={wire.position}
                            color={wire.color2}
                            num={index}
                        />
                    ))}
                </svg>
                {wires.map((wire, index) => (
                    <DraggableWire
                        key={index}
                        color={wire.color}
                        color2={wire.color2}
                        position={wire.position}
                        onDrag={(e, data) => handleDrag(e, data, index)}
                        onStop={(e, data) => handleStop(e, data, index)}
                    />
                ))}
                {connectors.map((connector, index) => (
                    <WireConnector
                        key={index}
                        color={connector.color}
                        position={connector.position}
                    />
                ))}
                {connectors.map((connector, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: 80,
                            top: connector.startPosition.y,
                            height: 20,
                            width: 20,
                        }}
                        className="flex flex-row -z-10"
                    >
                        <div style={{height: '20px', width: '10px', margin: 0, padding: 0, background: wires[index].color}}/>
                        <div style={{height: '20px', width: '10px', margin: 0, padding: 0, background: wires[index].color2}}/>
                    </div>
                ))}
                <button style={{
                    backgroundColor: '#4CAF50',
                    border: 'none',
                    color: 'white',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    position: 'absolute',
                    bottom: 10,
                }} onClick={checkFlags}>Sprawdź
                </button>
            </div>)}
            {isComplete && (<FinalDialog points={money} taskId={1}/>)}
        </main>
    );
};

export default MainComponent;