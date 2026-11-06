import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderLogged from './HeaderLogged';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../indexLogged.css';

export default function ProtectedLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Cerrar con Esc
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setSidebarOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    // Bloquear scroll del body mientras el drawer está abierto
    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    const toggleSidebar = () => setSidebarOpen((v) => !v);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <>
            <HeaderLogged onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
            {sidebarOpen && <div className="sidebar-backdrop" onClick={closeSidebar} aria-hidden="true" />}
            <div className="container">
                <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                <div className="main">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}
