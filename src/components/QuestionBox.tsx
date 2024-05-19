"use client";

import React from "react";
import {Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";

interface QuestionBoxProps {
    id: number;
    question: string;
    options: string[];
    answer: string;
    handler: (answer: string) => void
}

export const QuestionBox = (props: QuestionBoxProps) => {
    return <div style={{marginTop: '24px'}}>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography  gutterBottom>
                    {props.question}
                </Typography>

                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        {props.options.map((option, index) => {
                            return <FormControlLabel
                                value={option}
                                key={index}
                                control={<Radio/>}
                                label={option}
                                onChange={(event) => props.handler(event.target.value)}
                            />
                        })}
                    </RadioGroup>
                </FormControl>
            </CardContent>
        </Card>
    </div>
}