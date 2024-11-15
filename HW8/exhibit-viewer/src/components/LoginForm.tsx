import React, { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { login } from '../store/slices/userSlice';

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
