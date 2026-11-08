import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HeaderLogged from './HeaderLogged';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { ChatNotificationsProvider } from '../contexts/chatNotifications.context';
import '../indexLogged.css';

export default function ProtectedLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();
    const isChat = pathname === '/chat';

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
        <ChatNotificationsProvider>
            <HeaderLogged onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
            {sidebarOpen && <div className="sidebar-backdrop" onClick={closeSidebar} aria-hidden="true" />}
            <div className={`container${isChat ? ' container--chat' : ''}`}>
                <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                <div className={`main${isChat ? ' main--chat' : ''}`}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </ChatNotificationsProvider>
    );
}
