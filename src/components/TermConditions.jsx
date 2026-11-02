import styles from '../styles/TermConditions.module.css';
import { useState, useContext } from 'react';
import { LanguageContext } from '../contexts/language.context';


export default function TermConditions ({ accepted, setAccepted, showCheckbox = true }) {

    const {translations, lang, setLang} = useContext(LanguageContext);
    //const language = lang.content.signUp;
    const language = lang.signUp;

    const handleCheckbox = (e) => {
        //console.log(e);
        setAccepted(e.target.checked);
    }

    return (
        <>
            <iframe className={styles.termConditions} src='/TermConditions.html'></iframe>

            {showCheckbox && (
                <label>
                <input type="checkbox" checked={accepted} onChange={handleCheckbox} />
                <span> {language.acceptTerms}</span>
            </label>
            )}
        </>
    );
}