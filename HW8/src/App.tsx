import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResponsiveAppBar from './components/Navbar';
import AppRoutes from './AppRoutes';
import Post from './components/Post/Post';

const App: React.FC = () => {
  return (
    <Router>
      <Post />
      <ResponsiveAppBar />
      <AppRoutes />
    </Router>
  );
};

export default App;
