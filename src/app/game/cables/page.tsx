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
    position: Position;
    startPosition: Position;
}

interface Flag {
    index: number;
    flag: boolean;
}

const MainComponent = () => {
    const [isComplete, setIsComplete] = useState(false);

    const [wires, setWires] = useState<Wire[]>([
        { color: 'red', position: { x: 100, y: 100 }, startPosition: { x: 100, y: 100 }},
        { color: 'blue', position: { x: 100, y: 180 }, startPosition: { x: 100, y: 180 }},
        { color: 'green', position: { x: 100, y: 260 }, startPosition: { x: 100, y: 260}},
    ]);

    const [connectors, setConnectors] = useState<Wire[]>([
        { color: 'red', position: { x: 300, y: 100 }, startPosition: { x: 300, y: 100 }},
        { color: 'blue', position: { x: 300, y: 200 }, startPosition: { x: 300, y: 200 }},
        { color: 'green', position: { x: 300, y: 300 }, startPosition: { x: 300, y: 300 }},
    ]);

    const [flags, setFlags] = useState<Flag[]>([
        { index: 0, flag: false },
        { index: 1, flag: false },
        { index: 2, flag: false },
    ]);

    const handleStop = (e: DraggableEvent, data: DraggableData, index: number) => {
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
        setIsComplete(allTrue);
        if (allTrue) {
            console.log("Congrats");
        } else {
            console.log("Try again");
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
                            num={index}
                        />
                    ))}
                </svg>
                {wires.map((wire, index) => (
                    <DraggableWire
                        key={index}
                        color={wire.color}
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
                <button style={{
                    backgroundColor: '#4CAF50', /* Green */
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
            {isComplete && (<FinalDialog points={10} taskId={1}/>)}
        </main>
    );
};

export default MainComponent;