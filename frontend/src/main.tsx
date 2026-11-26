import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/look-rcr.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
