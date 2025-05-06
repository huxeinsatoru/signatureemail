import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Additional styles for Gmail HTML Formatter application
const styles = document.createElement("style");
styles.innerHTML = `
  .code-editor {
    font-family: "Roboto Mono", monospace;
    resize: none;
  }

  .editor-container {
    height: calc(100vh - 180px);
    min-height: 300px;
  }

  .preview-pane {
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  /* Animation for copied notification */
  @keyframes fadeInOut {
    0%, 100% { opacity: 0; transform: translateY(10px); }
    20%, 80% { opacity: 1; transform: translateY(0); }
  }
  
  .copied-notification {
    animation: fadeInOut 2s ease-in-out;
  }
`;
document.head.appendChild(styles);

createRoot(document.getElementById("root")!).render(<App />);
