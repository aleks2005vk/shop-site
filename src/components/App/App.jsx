import React, { useEffect } from 'react';
import AppRoutes from './Routes/Routes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useDispatch } from 'react-redux';
import { getCategories } from "../../Features/Categories/categoriesSlice";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className="app">
            <Header />
            <AppRoutes />
            <Footer />
        </div>
    );
};

export default App;
