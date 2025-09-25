import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, loginUser, setCurrentUser } from '../../Features/user/UserSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, CircularProgress } from '@mui/material';

const UserSignUpForm = ({ switchForm }) => {
    const [values, setValues] = useState({
        email: '',
        name: '',
        password: '',
        avatarFile: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = ({ target: { value, name } }) => {
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = e => {
        setValues(prev => ({
            ...prev,
            avatarFile: e.target.files && e.target.files[0] ? e.target.files[0] : null,
        }));
    };

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const username = values.name || values.email.split('@')[0] || `user${Date.now()}`;
            const createPayload = {
                email: values.email,
                username,
                password: values.password,
                name: { firstname: values.name || username, lastname: '' },
            };

            // Создаём пользователя и получаем ответ (если API возвращает данные)
            const created = await dispatch(createUser(createPayload)).unwrap();

            // После успешного создания — пробуем логиниться чтобы получить токен
            try {
                const loginPayload = { username, password: values.password };
                const result = await dispatch(loginUser(loginPayload)).unwrap();

                // Если получили токен и профиль — используем его
                if (result) {
                    const userWithAvatar = {
                        ...result,
                        avatar: values.avatarFile ? values.avatarFile.name : result.avatar ?? null,
                    };
                    dispatch(setCurrentUser(userWithAvatar));
                    navigate('/');
                    return;
                }
            } catch (loginErr) {
                // Если логин не удался (например fakestore возвращает 401 для новых пользователей),
                // сохраняем созданный профиль без токена и уведомляем пользователя, чтобы он вошёл вручную.
                const fallbackUser = {
                    id: created?.id ?? null,
                    name: created?.name?.firstname ? `${created.name.firstname} ${created.name.lastname || ''}`.trim() : values.name || username,
                    email: created?.email ?? values.email,
                    username: created?.username ?? username,
                    token: null,
                    avatar: values.avatarFile ? values.avatarFile.name : null,
                };
                dispatch(setCurrentUser(fallbackUser));
                // показать подсказку пользователю
                setError('Account created but automatic login failed — please sign in.');
                // не navigate('/') чтобы пользователь увидел сообщение, либо можно navigate('/')
                navigate('/');
                return;
            }
        } catch (err) {
            setError(err?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: 'auto',
                mt: 5,
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant="h4" align="center">
                Sign Up
            </Typography>

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
                    label="Name"
                    type="text"
                    name="name"
                    value={values.name}
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button variant="contained" component="label">
                        Upload Avatar
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {values.avatarFile && (
                        <Avatar src={URL.createObjectURL(values.avatarFile)} alt="avatar preview" />
                    )}
                </Box>

                {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}
                    startIcon={loading ? <CircularProgress size={16} /> : null}>
                    {loading ? 'Signing up...' : 'Sign Up'}
                </Button>
            </form>

            <Typography variant="body2" align="center">
                Already have account?{' '}
                <span
                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    onClick={() => switchForm?.('login')}
                    role="button"
                >
                    Sign in
                </span>
            </Typography>
        </Box>
    );
};

export default UserSignUpForm;