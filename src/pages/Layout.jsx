import React from 'react'
import { Outlet, useLocation } from 'react-router';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Layout = ({ hideHeaderPaths = [] }) => {
    const { pathname } = useLocation();
    return (
      <>
        {!hideHeaderPaths.includes("/" + pathname.split("/")[1]) && <Header />}
        <Outlet />
        {!hideHeaderPaths.includes("/" + pathname.split("/")[1]) && <Footer />}
      </>
    );
}

export default Layout;
