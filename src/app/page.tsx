"use client";

import {BrowserRouter as Router, Route, Routes, useRoutes} from 'react-router-dom';
import WelcomePage from './welcome';
import HomePage from "~/app/home/page";
import QuizPage from "~/app/quiz/page";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/quiz" element={<QuizPage />} />
            </Routes>
        </Router>
    );
}

export default App;