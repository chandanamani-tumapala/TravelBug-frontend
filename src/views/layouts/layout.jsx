import React from 'react';
import { Outlet } from 'react-router-dom';
import Boilerplate from './boilerplate';
import Footer from '../includes/footer';
export default function Layout() {
    return (
        <div className='layout'>
            <Boilerplate className='header'/>
            <main className='main-content'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}