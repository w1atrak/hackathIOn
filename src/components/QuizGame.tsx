"use client";
import {QuestionBox} from "~/components/QuestionBox";
import {Button, Stack} from "@mui/material";
import {useState} from "react";
import FinalDialog from "~/components/FinalDialog";
import {useSharedState} from "~/app/context";

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

    const {userId} = useSharedState();
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [userScore, setUserScore] = useState(0)
    const [displayFinalDialog, setDisplayFinalDialog] = useState(false)

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

        setUserScore(correctAnswers);
        setDisplayFinalDialog(true);
    }

    return <>
        {displayFinalDialog ? <FinalDialog points={userScore} userId={userId} taskId={1}/>:
            <>
                {
                    props.questions.map((question) => {
                        return <QuestionBox id={question.id}
                                            key={question.id}
                                            question={question.question}
                                            options={question.options}
                                            answer={question.answer}
                                            handler={(answer) => {
                                                handleOptionChange(answer, question.id);
                                            }}/>
                    })
                }

                <Stack style={{marginTop: '16px'}} spacing={2} direction="row">
                    <Button onClick={handleSubmit} variant="contained">Submit</Button>
                </Stack>
            </>
        }
    </>
}