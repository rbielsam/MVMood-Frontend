import styles from "../styles/LanguageMenu.module.css";
import "../index.css"
import { useContext } from "react";
import { LanguageContext } from "../contexts/language.context.jsx";


export default function LanguageMenu ({ onClose }) {

    const { lang, setLang, translations } = useContext(LanguageContext);


    return (
        <>
            <div className={`${styles.languageMenu} languageMenu`}>
                <ul>
                    {translations.map(language => (
                        <li key={language.lang}
                            onClick={() => {
                                setLang(language.content);
                                //localStorage.setItem("language", JSON.stringify(language));
                                localStorage.setItem("language", language.lang);
                                onClose();
                            }}>
                                {language.name}
                        </li>
                    ))}                    
                </ul>
            </div>
        </>
    );
}