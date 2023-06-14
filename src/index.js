import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/authProvider';
import { ThemeProvider } from '@material-tailwind/react';
import { ProductsProvider } from './context/productsProvider';
import { UsersProvider } from './context/usersProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <AuthProvider>
            <ProductsProvider>
                <UsersProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </UsersProvider>
            </ProductsProvider>
        </AuthProvider>
    </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
