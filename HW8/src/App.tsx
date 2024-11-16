import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResponsiveAppBar from './components/Navbar';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
};

export default App;
