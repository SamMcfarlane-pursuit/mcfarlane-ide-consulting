import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { initializeProjects } from '@/data/seedProjects';

// Initialize project data on startup
initializeProjects().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
  );
});
