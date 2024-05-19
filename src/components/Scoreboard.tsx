"use client";

import { ScoreboardRow } from "~/components/ScoreboardRow";
import { useSharedState } from "~/app/context";

export const UserClass = ["AI Engineer", "Game Dev", "UX Designer", "Full Stack Dev"];

export const Scoreboard = () => {
  const { database } = useSharedState();
  const userScores: Map<number, number> = new Map<number, number>();
  for (const user of database.users) {
    userScores.set(
      user.id,
      database.scores
        .filter((score) => score.userId === user.id)
        .reduce((acc, score) => acc + score.points, 0),
    );
  }
  const usersData = database.users
    .map((user) => {
      return {
        username: user.name,
        class: UserClass[user.classId - 5],
        score: userScores.get(user.id) ?? 0,
      };
    })
    .sort((a, b) => b.score - a.score);

  return (
    
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {usersData.map((data, index) => {
          return (
            <ScoreboardRow
              key={index}
              id={index}
              username={data.username}
              userClass={data.class}
              score={data.score.toString()}
            />
          );
        })}
      </div>
  );
};
