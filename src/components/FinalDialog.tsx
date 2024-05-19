"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// Typ dla punktów
type FinalDialogProps = {
  points: number;
  userId: number;
  taskId: number;
};

type ScoreType = {
  id: number;
  points: number;
  userId: number;
  taskId: number;
};

type ApiResponse = {
  users: any[];
  classes: any[];
  tasks: any[];
  scores: ScoreType[];
};

export default function FinalDialog({ points, taskId }: FinalDialogProps) {
  const userId = Number(localStorage.getItem("userId"));
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [totalPoints, setTotalPoints] = useState<number | null>(null);

  const calculateTotalPoints = useCallback(() => {
    fetch('https://test.nyaaa.me/data/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ApiResponse) => {
        const userScores = data.scores.filter((score: ScoreType) => score.userId === userId);
        const total = userScores.reduce((sum, score) => sum + score.points, points);
        setTotalPoints(total);
      })
      .catch(error => {
        console.error('Error calculating total points:', error);
      });
  }, [points, userId]);

  useEffect(() => {
    calculateTotalPoints();
  }, [calculateTotalPoints]);

  const handleConfirm = () => {
    setLoading(true);

    fetch('https://test.nyaaa.me/scores/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, taskId, points }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Score added successfully');
      router.push("/home");
    })
    .catch(error => {
      console.error("Wystąpił błąd podczas dodawania punktów:", error);
      alert("Wystąpił błąd podczas dodawania punktów!");
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <main className="flex flex-col items-center text-center justify-center min-h-screen relative z-20">
      <h1 className="text-4xl mb-8">GRATULACJE!</h1>
      <p className="text-2xl mb-4">Zdobyłeś {points} punktów!</p>
      {totalPoints !== null && (
        <p className="text-xl mb-8">
          Twoje zarobki rosną do {totalPoints} zł/h.
        </p>
      )}
      <button
        onClick={handleConfirm}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Przetwarzanie...' : 'Ok, super'}
      </button>
    </main>
  );
}
