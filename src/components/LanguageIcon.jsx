import tierra from "../assets/header/tierra.png";
import styles from "../styles/LanguageIcon.module.css";
import LanguageMenu from "../components/LanguageMenu";


export default function LanguageIcon ({ changeLanguage }) {

    return (
        <>
            <img onClick={changeLanguage} className={styles.languageIcon} src={tierra} alt="Languages" />
        </>
    );
}