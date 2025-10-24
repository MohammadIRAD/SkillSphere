import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add a console log to help debug rendering
console.log("[SkillSphere] Client initializing...");

createRoot(document.getElementById("root")!).render(<App />);