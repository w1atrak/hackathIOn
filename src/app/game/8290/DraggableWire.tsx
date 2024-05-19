import React from 'react';
import Draggable from 'react-draggable';
import type { DraggableEvent, DraggableData } from 'react-draggable';

interface Position {
    x: number;
    y: number;
}

interface DraggableWireProps {
    color: string;
    position: Position;
    onDrag: (e: DraggableEvent, data: DraggableData) => void;
    onStop: (e: DraggableEvent, data: DraggableData) => void;
}

const offset = 20;

const DraggableWire: React.FC<DraggableWireProps> = ({ color, position, onDrag, onStop }) => {
    return (
            <Draggable position={position} onDrag={onDrag} onStop={onStop} bounds={{
                top: 0,
                left: 0,
                right: window.innerWidth - offset,
                bottom: window.innerHeight - offset
            }}>
                <div style={{height: '20px', width: '20px', background: color, margin: 0, padding: 0}}/>
            </Draggable>
    );
};

export default DraggableWire;