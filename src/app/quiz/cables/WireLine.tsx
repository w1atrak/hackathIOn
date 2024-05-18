import React from 'react';

interface Position {
    x: number;
    y: number;
}

interface WireLineProps {
    start: Position;
    end: Position;
}

const WireLine: React.FC<WireLineProps> = ({ start, end }) => {
    return (
        <line
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="black"
        />
    );
};

export default WireLine;