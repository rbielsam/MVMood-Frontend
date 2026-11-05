import languageIcon from "../assets/icons/language.svg";
import styles from "../styles/LanguageIcon.module.css";
import LanguageMenu from "../components/LanguageMenu";


export default function LanguageIcon ({ changeLanguage }) {

    return (
        <>
            <img onClick={changeLanguage} className={styles.languageIcon} src={languageIcon} alt="Languages" />
        </>
    );
}