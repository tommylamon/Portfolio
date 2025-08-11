import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // or App.css
import reportWebVitals from './reportWebVitals'; // <-- Import stays here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals(); // <-- Function call goes AFTER render
