import ThemeModeIcon from "./ThemeModeIcon";
import LanguageIcon from "./LanguageIcon";
import styles from "../styles/Header.module.css";
import { use, useEffect, useState } from "react";
import LanguageMenu from "./LanguageMenu";
import languageMenuStyles from "../styles/LanguageMenu.module.css";
import styleLanguageIcon from "../styles/LanguageIcon.module.css";


export default function Header () {

    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

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
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <ThemeModeIcon />
                    <LanguageIcon changeLanguage={changeLanguage} />
                        {showLanguageMenu && <LanguageMenu onClose={()=>setShowLanguageMenu(false)}></LanguageMenu>}
                </div>
            </header>
        </>
    );
}