"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSharedState } from "~/app/context";

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

import { ApiResponse } from "~/types/types";

export default function FinalDialog({ points, taskId }: FinalDialogProps) {
  const userId = Number(localStorage.getItem("userId"));
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [totalPoints, setTotalPoints] = useState<number | null>(null);
  const { database, setDatabase } = useSharedState();

  const calculateTotalPoints = useCallback(() => {
    fetch("https://test.nyaaa.me/data/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: ApiResponse) => {
        const userScores = data.scores.filter(
          (score: ScoreType) => score.userId === userId,
        );
        const total = userScores.reduce(
          (sum, score) => sum + score.points,
          points,
        );
        setTotalPoints(total);
      })
      .catch((error) => {
        console.error("Error calculating total points:", error);
      });
  }, [points, userId]);

  useEffect(() => {
    calculateTotalPoints();
  }, [calculateTotalPoints]);

  const handleConfirm = () => {
    setLoading(true);

    fetch("https://test.nyaaa.me/scores/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, taskId, points }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Score added successfully");
        router.push("/home");
        const newDb = database;
        newDb.scores.push({
          id: database.scores.length + 1,
          userId,
          taskId,
          points,
        });
        setDatabase(newDb);
      })
      .catch((error) => {
        console.error("Wystąpił błąd podczas dodawania punktów:", error);
        alert("Wystąpił błąd podczas dodawania punktów!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="relative z-20 flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="mb-8 text-4xl">GRATULACJE!</h1>
      <p className="mb-4 text-2xl">Zdobyłeś {points} punktów!</p>
      {totalPoints !== null && (
        <p className="mb-8 text-xl">
          Twoje zarobki rosną do {totalPoints} zł/h.
        </p>
      )}
      <button
        onClick={handleConfirm}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Przetwarzanie..." : "Ok, super"}
      </button>
    </main>
  );
}
