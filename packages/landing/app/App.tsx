import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import "./index.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/" element={<Navigate to="/landing" replace />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App