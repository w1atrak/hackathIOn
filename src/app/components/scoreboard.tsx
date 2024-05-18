"use client";

import {ScoreboardRow} from "~/app/components/scoreboard-row";

export enum UserClass {
    AI_ENGINEER = 'AI Engineer',
    GAME_DEV = 'Game Dev',
    UX_DESIGNER = 'UX Designer',
    FULL_STACK_DEV = 'Full Stack Dev'
}

export const Scoreboard = () => {
    const usersData = [
        {
            username: 'user1',
            class: UserClass.AI_ENGINEER,
            score: '14'
        },
        {
            username: 'user2',
            class: UserClass.FULL_STACK_DEV,
            score: '2'
        },
        {
            username: 'user3',
            class: UserClass.UX_DESIGNER,
            score: '53'
        },
        {
            username: 'user4',
            class: UserClass.GAME_DEV,
            score: '23'
        }
    ]

    return <>
        <div style={{display: "flex", flexDirection: "column", gap: '24px'}}>
            {usersData.map((data, index) => {
                return <ScoreboardRow key={index} id={index} username={data.username} userClass={data.class} score={data.score}/>
            })}
        </div>
    </>

}