"use client";

import {BrowserRouter as Router, Route, Routes, useRoutes} from 'react-router-dom';
import WelcomePage from './welcome';
import HomePage from "~/app/home/page";
import QuizPage from "~/app/quiz/page";
import LoginPage from "~/app/login";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/quiz" element={<QuizPage />} />
            </Routes>
        </Router>
    );
}

export default App;