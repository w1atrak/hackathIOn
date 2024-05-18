"use client";

import {BrowserRouter as Router, Route, Routes, useRoutes} from 'react-router-dom';
import WelcomePage from './welcome';
import HomePage from "~/app/home/page";
import QuizPage from "~/app/quiz/page";
import ClassSelection from "~/app/class/page";
import LogInPage from "~/app/login/page";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/class" element={<ClassSelection />} />
            </Routes>
        </Router>
    );
}

export default App;