import '../indexLogged.css';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/language.context';
import { ChatNotificationsContext } from '../contexts/chatNotifications.context';
import UnreadBadge from './UnreadBadge';
import { Link } from "react-router-dom";


export default function Sidebar({ isOpen = false, onClose }) {

    const { lang } = useContext(LanguageContext);
    //const language = lang.content.Sidebar;
    const language = lang.Sidebar;
    const { totalUnread } = useContext(ChatNotificationsContext);

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("language");
        localStorage.removeItem("theme");
        localStorage.removeItem("nickname");
        localStorage.removeItem("pusherTransportTLS");
        if (onClose) onClose();
    };

    const handleNavigate = () => {
        if (onClose) onClose();
    };

    return (
        <div id="main-sidebar" className={`sidebar${isOpen ? ' sidebar-open' : ''}`}>
            <Link to="/home" onClick={handleNavigate}>{language.home}</Link>
            <Link to="/profile" onClick={handleNavigate}>{language.profile}</Link>
            <Link to="/notifications" onClick={handleNavigate}>{language.notifications}</Link>            
            <Link to="/chat" onClick={handleNavigate} className="sidebar-chat-link">
                <span>{language.chat}</span>
                {totalUnread > 0 && <UnreadBadge count={totalUnread} />}
            </Link>

            <div className="logout">
                <a onClick={logOut} href="/">{language.logout}</a>
            </div>
        </div>
    );
}