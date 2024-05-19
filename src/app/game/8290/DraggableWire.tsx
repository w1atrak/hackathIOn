"use client";

import React from 'react';
import Draggable from 'react-draggable';
import type { DraggableEvent, DraggableData } from 'react-draggable';

interface Position {
    x: number;
    y: number;
}

interface DraggableWireProps {
    color: string;
    color2: string;
    position: Position;
    onDrag: (e: DraggableEvent, data: DraggableData) => void;
    onStop: (e: DraggableEvent, data: DraggableData) => void;
    num: number;
}

const offset = 20;

const DraggableWire: React.FC<DraggableWireProps> = ({ color, color2 , position, onDrag, onStop, num }) => {
    console.log(position, num)
    return (
        <Draggable position={position} onDrag={onDrag} onStop={onStop} bounds={{
            top: 0 - offset*num,
            left: 0,
            right: window.innerWidth - offset,
            bottom: window.innerHeight - offset*(num+1)
        }}
        >
            <div className="flex flex-row" style={{height: '20px', width: '20px', margin: 0, padding: 0}}>
                <div style={{height: '20px', width: '10px', margin: 0, padding: 0, background: color}}/>
                <div style={{height: '20px', width: '10px', margin: 0, padding: 0, background: color2}}/>
            </div>
        </Draggable>
    );
};

export default DraggableWire;