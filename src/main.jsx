import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)



























// import React from 'react';
// import { createRoot } from 'react-dom/client'; // Import createRoot
// import { AuthProvider } from './context/AuthContext';
// import App from './App';
// import './index.css';

// const container = document.getElementById('root');
// const root = createRoot(container); // Create a root

// root.render(
//   <AuthProvider>
//     <App />
//   </AuthProvider>
// );