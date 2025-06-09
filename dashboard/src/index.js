// dashboard/src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Busca el div con id="root" en public/index.html
const container = document.getElementById('root');

// Crea un “root” usando el método createRoot
const root = createRoot(container);

// Renderiza el componente <App /> en ese root
root.render(<App />);
