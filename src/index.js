import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './components_office_use_only/TicketSystem/AppProvider';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import GoogleDriveUpload from './GoogleDriveUpload'; 
// Create a new QueryClient instance
const queryClient = new QueryClient();
// Register service worker for PWA
// serviceWorker.register();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProvider>
          <AuthProvider>
            <ToastContainer className="mt-20" />
            <App />
          </AuthProvider>
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
// Optional: measure performance
reportWebVitals();
