import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom';



const MainLayout = () => {

    return (
      <>
      <Header></Header>
        <Outlet />
        <Footer></Footer>
      </>
    );
  };
  
  export default MainLayout