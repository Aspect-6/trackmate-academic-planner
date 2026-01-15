import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function LandingPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0f172a", // dark hub-style background
                color: "#e5e7eb",
            }}
        >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                TrackMate
            </h1>
            <p style={{ opacity: 0.8, marginBottom: "2rem" }}>
                Unified planners. Separate identities.
            </p>

            <button
                style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#2978B5", // system-wide accent
                    color: "white",
                    fontSize: "1rem",
                }}
                onClick={() => {
                    window.location.pathname = "/academic";
                }}
            >
                Enter Hub
            </button>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/landing" element={<LandingPage />} />
                {/* Temporary redirect so build doesn't 404 */}
                <Route path="/" element={<Navigate to="/landing" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
