import './Layout.css'; // Your CSS file path

import React from 'react';
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from '../Login/login';
import Body from './Body';
import MainLayout from './MainLayout';
import Home from '../Home/Home';



const Layout = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Header />
                <Link to="/">Home</Link>
                <Link to="/Login">로그인화면이동</Link> {/* /만 이용하면 Home으로인식 */}
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/Login' element={<Login />} /> {/*동적 Route 사용방법 : /Login/:id */}
                    </Routes>
                </main>
                
                <Footer />
            </div>
        </BrowserRouter>
            
    );
}

export default Layout;