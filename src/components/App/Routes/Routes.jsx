import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
// import About from '../About/About';
// import NotFound from '../NotFound/NotFound';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  NOT_FOUND: '*',
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
			<Route path="/home" element={<Home />} />
      {/* <Route path={ROUTES.ABOUT} element={<About />} /> */}
      {/* <Route path={ROUTES.NOT_FOUND} element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
