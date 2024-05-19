"use client";
import {QuestionBox} from "~/components/QuestionBox";
import {Button, Stack} from "@mui/material";
import {useState} from "react";

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    answer: string;
}

interface QuizGameProps {
    questions: QuizQuestion[]
}

interface UserAnswer {
    questionId: number;
    answer: string;
}

export const QuizGame = (props: QuizGameProps) => {

    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

    const handleOptionChange = (userAnswer: string, questionId: number) => {

        const filteredAnswers = userAnswers;

        const answer = filteredAnswers.find(answer => answer.questionId === questionId);
        if (answer) {
            answer.answer = userAnswer;
        } else {
            const ans: UserAnswer = {
                questionId: questionId,
                answer: userAnswer
            }
            filteredAnswers.push(ans)
        }

        setUserAnswers(filteredAnswers);
    }

    const handleSubmit = () => {
        let correctAnswers = 0;
        userAnswers.forEach(answer => {
            const question = props.questions.find(que => que.id === answer.questionId);
            if (question?.answer === answer.answer) {
                correctAnswers++;
            }
        })
        // todo do sth with correct answers !!!
    }

    return <>
        {
            props.questions.map((question, questionIndex) => {
                return <QuestionBox id={questionIndex}
                                    key={questionIndex}
                                    question={question.question}
                                    options={question.options}
                                    answer={question.answer}
                                    handler={(answer) => {
                                        handleOptionChange(answer, questionIndex);
                                    }}/>
            })
        }
        <Stack spacing={2} direction="row">
            <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </Stack>
    </>
}