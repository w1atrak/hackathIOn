"use client";

import React from 'react';
export const dynamic = "force-dynamic";
interface Position {
    x: number;
    y: number;
}

interface WireLineProps {
    start: Position;
    end: Position;
    color: string;
    num: number;
}

const offset = 20;

// We add 20*index to y because the lines shows weirdly...
const WireLine: React.FC<WireLineProps> = ({ start, end, color, num }) => {
    console.log('NUM', num)
    return (
        <line
            x1={start.x + offset/2 + 3}
            y1={start.y+20*num + offset/2}
            x2={end.x + offset/2}
            y2={end.y+20*num + offset/2}
            stroke={color}
            strokeWidth="5"
        />
    );
};

export default WireLine;