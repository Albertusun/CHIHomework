// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './layouts/HomePage';
import StripePage from './layouts/StripePage';
import { useAppSelector } from './store/store';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const ProtectedRoute = ({ children, isAllowed }: { children: JSX.Element; isAllowed: boolean }) => {
    if (!isAllowed) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const App: React.FC = () => {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>Exhibit Viewer</Typography>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/" element={<StripePage />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute isAllowed={isAuthenticated}>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Container>
    );
};

export default App;
