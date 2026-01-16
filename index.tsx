
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("Precision Percents: Bootstrapping application...");

const startApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Precision Percents Error: Root element not found in DOM.");
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Precision Percents: React root mounted successfully.");
  } catch (err) {
    console.error("Precision Percents Error: Failed to mount React root:", err);
    rootElement.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; color: #64748b; padding: 20px; text-align: center;">
        <h1 style="color: #ef4444; font-size: 1.5rem; margin-bottom: 1rem;">Application Error</h1>
        <p>Failed to initialize the calculator. Please check the browser console for more details.</p>
        <code style="margin-top: 1rem; padding: 0.5rem; background: #f1f5f9; border-radius: 4px; font-size: 0.8rem;">${err instanceof Error ? err.message : 'Unknown error'}</code>
      </div>
    `;
  }
};

// Ensure DOM is ready before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
