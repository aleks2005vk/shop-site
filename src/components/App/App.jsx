import React, { useEffect } from 'react';
import AppRoutes from './Routes/Routes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useDispatch } from 'react-redux';
import { getCategories } from "../../Features/Categories/categoriesSlice";
import { getProducts } from '../../Features/Products/productsSlice';
import { Box } from '@mui/material';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <Box className="app" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <AppRoutes />
            </Box>
            <Footer />
        </Box>
    );
};

export default App;