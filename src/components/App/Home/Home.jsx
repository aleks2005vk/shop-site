import React from 'react';
import { Routes } from 'react-router-dom';

const Home = () => {
    return (
        <Routes>
            <Route path="/" element={<div>Home</div>} />
        </Routes>
    );
};

export default Home;
