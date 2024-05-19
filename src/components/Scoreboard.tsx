"use client";

import { ScoreboardRow } from "~/components/ScoreboardRow";
import { useSharedState } from "~/app/context";

export const UserClass = [ "UX Designer","Game Dev", "Full Stack Dev", "AI Engineer"];

export const Scoreboard = () => {
    const { database, userId } = useSharedState();
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
                id: user.id,
                username: user.name,
                class: UserClass[user.classId - 5],
                score: userScores.get(user.id) ?? 0,
            };
        })
        .sort((a, b) => b.score - a.score);

    const topTen = usersData.slice(0, 10);
    const currentUserData = usersData.find(user => user.id === userId);
    const currentUserPosition = usersData.findIndex(user => user.id === userId) + 1;

    return (
        <div className="flex flex-col space-y-1 w-full max-w-5xl mx-auto">
            {topTen.map((data, index) => (
                <ScoreboardRow
                    key={index}
                    id={index}
                    username={data.username}
                    classname={data.class}
                    score={data.score.toString()}
                    isCurrentUser={data.id === userId}
                />
            ))}
            {currentUserData && !topTen.includes(currentUserData) && (
                <ScoreboardRow
                    id={currentUserPosition}
                    username={currentUserData.username}
                    classname={currentUserData.class}
                    score={currentUserData.score.toString()}
                    isCurrentUser={true}
                />
            )}
        </div>
    );
};
