import '../indexLogged.css';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/language.context';
import { Link } from "react-router-dom";


export default function Sidebar() {

    const {translations, lang, setLang} = useContext(LanguageContext);
    //const language = lang.content.Sidebar;
    const language = lang.Sidebar;

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("language");
        localStorage.removeItem("theme");
        localStorage.removeItem("nickname");
        localStorage.removeItem("pusherTransportTLS");
    };

    return (
        <div className="sidebar">
            <Link to="/home">{language.home}</Link>
            <Link to="/profile">{language.profile}</Link>
            <Link to="/notifications">{language.notifications}</Link>            
            <Link to="/chat">{language.chat}</Link>

            <div className="logout">
                <a onClick={logOut} href="/">{language.logout}</a>
            </div>
        </div>
    );
}