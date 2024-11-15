import React from 'react';
import './ControlBar.css';

const ControlBar: React.FC = () => (
    <div className="navbar">
        <div className="navbar-logo">Exhibit Viewer</div>
        <div className="navbar-links">
            <a href="/home">Home</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
    </div>
);

export default ControlBar;
