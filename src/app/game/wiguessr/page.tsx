"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FinalDialog from "~/components/FinalDialog";

// Typ dla taska z danymi rzeczywistymi
type TaskType = {
  id: number;
  name: string;
  code: string;
  data: string[][];
};

// Typ dla danych zwracanych z endpointu
type ApiResponse = {
  tasks: TaskType[];
};

export default function WIguessrGame() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState<string[][]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://test.nyaaa.me/data/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ApiResponse = await response.json();
        console.log("Fetched data:", data);

        const wiguessrTask = data.tasks.find((task: TaskType) => task.name === "WIGuessr");
        if (wiguessrTask) {
          setTasks([wiguessrTask]);
          const shuffledRooms = shuffleArray(wiguessrTask.data).slice(0, 5);
          console.log("Shuffled and selected rooms:", shuffledRooms);
          setSelectedRooms(shuffledRooms);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData().catch(console.error);
  }, []);

  const shuffleArray = (array: string[][]): string[][] => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleCheck = () => {
    const normalizedInput = userInput.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const currentRoom = selectedRooms[currentStep];
    console.log("Normalized input:", normalizedInput);
    console.log("Current room options:", currentRoom);

    const isCorrect = currentRoom.some(room => room === normalizedInput);

    if (isCorrect) {
      setPoints(points + 2);
      setFeedback("Dobrze!");
    } else {
      setFeedback("Źle!");
    }

    if (currentStep === 4) {
      setGameFinished(true);
    } else {
      setCurrentStep(currentStep + 1);
      setUserInput(""); // Reset user input for next step
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (gameFinished) {
    return <FinalDialog points={points} userId={7} taskId={tasks[0].id} />;
  }

  return (
    <main className="flex flex-col items-center text-center justify-center min-h-screen">
      <h1 className="text-4xl mb-8">Jaka to sala?</h1>
      <div className="mb-4">
        {selectedRooms[currentStep] && (
          <img src={`/rooms/${selectedRooms[currentStep][0]}.jpg`} alt="Room" className="w-full h-auto" />
        )}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="border p-2 mb-4"
        placeholder="Wpisz numer sali"
      />
      <button
        onClick={handleCheck}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Sprawdź
      </button>
      {feedback && <p className="mt-4">{feedback}</p>}
    </main>
  );
}
