'use client';
import React, { useState } from 'react';
import DraggableWire from './DraggableWire';
import WireConnector from './WireConnector';
import WireLine from './WireLine'
import { DraggableEvent, DraggableData } from 'react-draggable';

interface Position {
    x: number;
    y: number;
}

interface Wire {
    color: string;
    position: Position;
}

const MainComponent = () => {
    const [wires, setWires] = useState<Wire[]>([
        { color: 'red', position: { x: 0, y: 100 } },
        { color: 'blue', position: { x: 0, y: 180 } },
        { color: 'green', position: { x: 0, y: 260 } },
    ]);

    const [connectors, setConnectors] = useState<Wire[]>([
        { color: 'red', position: { x: 100, y: 100 } },
        { color: 'blue', position: { x: 100, y: 200 } },
        { color: 'green', position: { x: 100, y: 300 } },
    ]);

    const handleDrag = (e: DraggableEvent, data: DraggableData, index: number) => {
        const newWires = [...wires];
        if (newWires[index]) {
            newWires[index].position = { x: data.x, y: data.y };
            setWires(newWires);
        }

        // After a drag event, check if any wire is close enough to any connector
        for (let i = 0; i < wires.length; i++) {
            for (let j = 0; j < connectors.length; j++) {
                const wire = wires[i];
                const connector = connectors[j];

                // Calculate the distance between the wire and the connector
                const distance = Math.sqrt(
                    Math.pow(wire.position.x - connector.position.x, 2) +
                    Math.pow(wire.position.y - connector.position.y, 2)
                );

                // If the wire is close enough to the connector, snap the wire to the connector
                if (distance < 30) { // "50" is the threshold for "close enough"
                    newWires[i].position = connector.position;
                    setWires(newWires);
                    break;
                }
            }
        }
    };

    return (
        <div>
            <svg style={{ position: 'absolute', top: 0, left: 0 , width: '100%', height: '100%'}}>
                {wires.map((wire, index) => (
                    <DraggableWire
                        key={index}
                        color={wire.color}
                        position={wire.position}
                        onDrag={(e, data) => handleDrag(e, data, index)}
                    />
                    <WireLine start={{ x: 0, y: index * 80 + 100 }} end={wire.position} />
                ))}
            </svg>
            {connectors.map((connector, index) => (
                <WireConnector
                    key={index}
                    color={connector.color}
                    position={connector.position}
                />
            ))}
        </div>
    );
};

export default MainComponent;