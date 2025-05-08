// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/Index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />  {/* Render AppRoutes for routing */}
  </React.StrictMode>
);
