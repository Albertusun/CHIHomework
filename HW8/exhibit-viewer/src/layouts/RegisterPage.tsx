// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { register } from '../store/slices/userSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const RegisterForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(register({ username, password }));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" color="primary">Register</Button>
        </Box>
    );
};

export default RegisterForm;
