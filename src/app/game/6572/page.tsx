"use client";

import React, { useState, useEffect } from "react";
import FinalDialog from "~/components/FinalDialog";

export const dynamic = "force-dynamic";

const programmingLanguages = [
  { name: "JavaScript", logo: "https://abrudz.github.io/logos/JS.svg" },
  { name: "Python", logo: "https://abrudz.github.io/logos/Python.svg" },
  { name: "Java", logo: "https://abrudz.github.io/logos/Java.svg" },
  { name: "C++", logo: "https://abrudz.github.io/logos/CPlusPlus.svg" },
  { name: "Ruby", logo: "https://abrudz.github.io/logos/Ruby.svg" },
  { name: "Go", logo: "https://abrudz.github.io/logos/Go.svg" },
  { name: "Swift", logo: "https://abrudz.github.io/logos/Swift.svg" },
  { name: "Kotlin", logo: "https://abrudz.github.io/logos/Kotlin.svg" },
  { name: "PHP", logo: "https://abrudz.github.io/logos/PHP.svg" },
  { name: "TypeScript", logo: "https://abrudz.github.io/logos/TypeScript.svg" },
  { name: "Rust", logo: "https://abrudz.github.io/logos/Rust.svg" },
  { name: "Perl", logo: "https://abrudz.github.io/logos/Perl.svg" },
];

const selectRandomLanguages = (languages, count) => {
  const shuffled = [...languages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function MemoryGamePage() {
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [tiles, setTiles] = useState([]);
  const [flipCount, setFlipCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    const selectedLanguages = selectRandomLanguages(programmingLanguages, 8);
    const duplicatedLanguages = [...selectedLanguages, ...selectedLanguages];
    const shuffledTiles = shuffleArray(duplicatedLanguages);
    setTiles(shuffledTiles);
  }, []);

  useEffect(() => {
    if (matchedIndices.length > 0 && matchedIndices.length === tiles.length) {
      if (flipCount <= 20) setMoney(10);
      else if (flipCount > 20 && flipCount < 40) setMoney(10 - (flipCount - 20)/2);
      setMoney(10 - (flipCount-20)/2);
      setIsComplete(true);
    }
  }, [matchedIndices, tiles]);

  const handleFlip = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedIndices.includes(index)) {
      const newFlippedIndices = [...flippedIndices, index];
      setFlippedIndices(newFlippedIndices);
      setFlipCount(flipCount + 1);

      if (newFlippedIndices.length === 2) {
        const [firstIndex, secondIndex] = newFlippedIndices;
        if (tiles[firstIndex].name === tiles[secondIndex].name) {
          setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
        }
        setTimeout(() => setFlippedIndices([]), 1000); // Flip back after 1 second
      }
    }
  };

    const surrender = () => {
        setMoney(0);
        setIsComplete(true);
    };

  return (
    <div>
      {!isComplete && (<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white p-4 md:p-8">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-8 text-center">Memory Game</h1>
          <h2 className="text-x1 mb-8 text-center w-3/5">Dopasuj logotypy języków programowania w pary</h2>
          <div className="grid grid-cols-4 gap-4 w-full max-w-4xl mb-4">
            {tiles.map((language, index) => (
                <div
                    key={index}
                    className="relative flex items-center justify-center bg-white rounded-lg shadow-lg w-full cursor-pointer"
                    style={{aspectRatio: "1", height: 0, paddingBottom: "100%"}} // Makes each grid cell a square
                    onClick={() => handleFlip(index)}
                >
                  <div
                      className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
                          flippedIndices.includes(index) || matchedIndices.includes(index) ? "rotate-y-180" : ""
                      }`}
                      style={{
                        backfaceVisibility: "hidden",
                        transformStyle: "preserve-3d",
                        transform: flippedIndices.includes(index) || matchedIndices.includes(index) ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                  >
                    <div className="flex items-center justify-center w-full h-full bg-white-300 rounded-lg">
                      {/* Back of the card */}
                    </div>
                  </div>
                  <div
                      className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
                          flippedIndices.includes(index) || matchedIndices.includes(index) ? "" : "rotate-y-180"
                      }`}
                      style={{
                        backfaceVisibility: "hidden",
                        transformStyle: "preserve-3d",
                        transform: flippedIndices.includes(index) || matchedIndices.includes(index) ? "rotateY(0deg)" : "rotateY(180deg)",
                      }}
                  >
                    <img src={language.logo} alt={`${language.name} logo`} className="h-3/4 w-3/4 object-contain"/>
                  </div>
                </div>
            ))}
          </div>
          <div className="text-2xl font-semibold">
            Liczba ruchów: {flipCount}
          </div>
          <button
              onClick={surrender}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-green-700 transition-colors"
          >
            Poddaj się
          </button>
        </div>
      </main>)}
      {isComplete && (<FinalDialog points={money} taskId={4}/>)}
    </div>
  );
}
