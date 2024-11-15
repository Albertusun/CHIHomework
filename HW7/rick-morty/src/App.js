import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Home from './pages/Home';
import Heroes from './pages/Heroes';
import Hero from './pages/Hero';
import About from './pages/About';
import Navigation from './components/Navigation';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <div style={{ display: 'flex' }}>
                    <Navigation />
                    <div style={{ marginLeft: 240, padding: 20, width: '100%' }}>
                        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                            {darkMode ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/heroes" element={<Heroes />}>
                                <Route path=":id" element={<Hero />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
