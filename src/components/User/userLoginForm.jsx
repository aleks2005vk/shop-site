import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, setCurrentUser } from '../../Features/user/UserSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';

const UserLoginForm = ({ switchForm }) => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = ({ target: { value, name } }) => {
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // fakestore ожидает username+password — попробуем взять username из поля email (localpart)
            const usernameGuess = values.email.includes('@') ? values.email.split('@')[0] : values.email;
            const payload = { username: usernameGuess, password: values.password };

            const result = await dispatch(loginUser(payload)).unwrap();
            dispatch(setCurrentUser(result));
            navigate('/');
        } catch (err) {
            // покажем понятную ошибку, не ставим fake-token
            setError(err?.message || err?.payload || 'Login failed — check your credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 1, p: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4" align="center">Sign In</Typography>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}
                    startIcon={loading ? <CircularProgress size={16} /> : null}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </Button>
            </form>

            <Typography variant="body2" align="center">
                Don’t have account?{' '}
                <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                      onClick={() => switchForm?.('signup')} role="button">
                    Sign up
                </span>
            </Typography>
        </Box>
    );
};

export default UserLoginForm;