import ThemeModeIcon from "./ThemeModeIcon";
import LanguageIcon from "./LanguageIcon";
import { useContext, useEffect, useState } from "react";
import LanguageMenu from "./LanguageMenu";
import languageMenuStyles from "../styles/LanguageMenu.module.css";
import '../indexLogged.css';
import "../index.css";
import styles from "../styles/HeaderLogged.module.css";
import styleLanguageIcon from "../styles/LanguageIcon.module.css";
import ImgLogo from "./ImgLogo";
import { UserContext } from "../contexts/user.context";
import userPic from "../assets/settingsprofile/user.png";
import { Link } from "react-router-dom";


export default function Header ({ children }) {

    const API_URL = import.meta.env.VITE_API_URL;
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const {user, getDataLoggedUser} = useContext(UserContext);

    useEffect(() => {
        const closeLanguageMenu = (e) => {
            if (e.target.closest(`.${languageMenuStyles.languageMenu}`) || (e.target.closest(`.${styleLanguageIcon.languageIcon}`))) return;

            setShowLanguageMenu(false);        
        };

        document.body.addEventListener('click', closeLanguageMenu);

        return () => document.body.removeEventListener('click', closeLanguageMenu);
    }, []);


    const changeLanguage = () => {
        setShowLanguageMenu(!showLanguageMenu);
    }


    return (
        <>
            <header className={styles.topbar}>
                <div className="brand">
                    {/*<img src={imgLogo} alt="MVM Mood Logo" width="32" height="32" />
                    {children}*/}
                    <ImgLogo to="/home" width="72" height="72" />
                </div>

                <div className={`${styles.dataLoggedContainer} dataLoggedContainer`}>
                        {/*<p>{localStorage.getItem("nickname")}</p>*/}
                        <Link className={styles.linkHeaderNickImg} to="/profile">
                            <img src={user.foto_perfil ? `${API_URL}/storage/${user.foto_perfil}`: userPic}
                                alt="FotoPerfil"
                                className={styles.headerProfileImg}
                            />

                            <p className={styles.dataLoggedUser}>{user.nickname}</p>
                        </Link>
                </div>


                <div className={styles.languageThemeContainer}>
                    <ThemeModeIcon />
                    <LanguageIcon changeLanguage={changeLanguage} />
                        {showLanguageMenu && <LanguageMenu onClose={()=>setShowLanguageMenu(false)}></LanguageMenu>}
                </div>

            </header>
        </>
    );
}