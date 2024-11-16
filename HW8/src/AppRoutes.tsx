import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import PostPage from './layouts/PostPage';
import AddPostPage from './layouts/AddPostPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostPage isMyPosts={false} />} />
      <Route path="/my-posts" element={<PostPage isMyPosts={true} />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/add-post" element={<AddPostPage />} />
    </Routes>
  );
};

export default AppRoutes;
