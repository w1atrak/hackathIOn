"use client";
import React from 'react';

interface Position {
    x: number;
    y: number;
}

interface WireConnectorProps {
    color: string;
    position: Position;
}

const WireConnector: React.FC<WireConnectorProps> = ({ color, position }) => {
    return (
        <div
            style={{
                height: '20px',
                width: '20px',
                background: color,
                position: 'absolute',
                left: position.x,
                top: position.y,
            }}
        />
    );
};

export default WireConnector;