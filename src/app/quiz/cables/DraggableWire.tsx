import React from 'react';
import Draggable from 'react-draggable';
import { DraggableEvent, DraggableData } from 'react-draggable';
import WireLine from './WireLine';

interface Position {
    x: number;
    y: number;
}

interface DraggableWireProps {
    color: string;
    position: Position;
    onDrag: (e: DraggableEvent, data: DraggableData) => void;
}

const DraggableWire: React.FC<DraggableWireProps> = ({ color, position, onDrag }) => {
    return (
        <div>
            <Draggable position={position} onDrag={onDrag}>
                <div style={{ height: '20px', width: '20px', background: color, margin: 0, padding: 0 }} />
            </Draggable>
        </div>
    );
};

export default DraggableWire;