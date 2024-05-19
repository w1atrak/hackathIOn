"use client"

import {QuizGame} from "~/components/QuizGame";
import questions from './message.json'

export const dynamic = "force-dynamic";

export default async function QuizPage() {
    return (
        <main
            className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <QuizGame questions={questions}/>
        </main>
    );
}
