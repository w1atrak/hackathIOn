"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSharedState } from "~/app/context";
import { ApiResponse } from "~/types/types";

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

export default function FinalDialog({ points, taskId }: FinalDialogProps) {
  const userId = Number(localStorage.getItem("userId"));
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [totalPoints, setTotalPoints] = useState<number | null>(null);
  const { database, setDatabase } = useSharedState();
  const [alreadyScored, setAlreadyScored] = useState(false);

  const calculateTotalPoints = useCallback(() => {
    fetch("http://127.0.0.1:8080/data/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: ApiResponse) => {
        const existingScore = data.scores.find(
          (score) => score.userId === userId && score.taskId === taskId
        );
        if (existingScore) {
          setAlreadyScored(true);
        } else {
          const userScores = data.scores.filter(
            (score: ScoreType) => score.userId === userId
          );
          const total = userScores.reduce((sum, score) => sum + score.points, points);
          setTotalPoints(total);
        }
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
    if (!alreadyScored) {
      fetch("http://127.0.0.1:8080/scores/", {
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
    } else {
      router.push("/home");
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: 'url("/WI.jpg")' }}
      ></div>
      <main className="relative z-20 flex min-h-screen flex-col items-center justify-center text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
        {!alreadyScored ? (
          <div>
            <h1 className="mb-8 text-4xl font-bold text-blue-600">GRATULACJE!</h1>
            <p className="mb-4 text-2xl text-gray-700">Zdobyłeś {points} punktów!</p>
            {totalPoints !== null && (
              <p className="mb-8 text-xl text-gray-600">
                Twoje zarobki rosną do {totalPoints} zł/h.
              </p>
            )}
            <button
              onClick={handleConfirm}
              className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Przetwarzanie..." : "Ok, super"}
            </button>
          </div>
        ) : (
          <div>
            <h1 className="mb-8 text-4xl font-bold text-blue-600">Zadanie już zostało ocenione</h1>
            <p className="mb-4 text-2xl text-gray-700">Wypróbuj swoich sił w innych grach</p>
            <button
              onClick={handleConfirm}
              className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Przetwarzanie..." : "Ok, super"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
