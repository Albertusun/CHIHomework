import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import PostPage from './layouts/PostPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
  );
};

export default AppRoutes;
