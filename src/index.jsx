import React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
// import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './Features/store';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <CssBaseline />
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
