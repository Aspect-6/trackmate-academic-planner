import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastProvider } from "@shared/contexts/ToastContext";
import { AuthProvider } from "@shared/contexts/AuthContext";

const rootElement = document.getElementById("root");

document.documentElement.classList = "dark";

if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<React.StrictMode>
		<ToastProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ToastProvider>
	</React.StrictMode>
)
