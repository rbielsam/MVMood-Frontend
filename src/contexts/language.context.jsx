import { createContext, useState } from "react";
import en from "../languages/en";
import es from "../languages/es";
import cat from "../languages/cat";


const LanguageContext = createContext();
const languages = {en, es, cat};

function LanguageProviderWrapper (props) {
    
    /*const translations = [        
        {lang: "en", name: "English", icon: "", content: en},
        {lang: "es", name: "Spanish", icon: "", content: es},
        {lang: "cat", name: "Catalan", icon: "", content: cat}
    ];

    const savedLang = localStorage.getItem("language");
    const [lang, setLang] = useState(savedLang ? JSON.parse(savedLang) : translations[0]);*/

    const savedLang = localStorage.getItem("language");
    const [lang, setLang] = useState(savedLang ? languages[savedLang] : en);

    const language = lang.LanguageMenu;

    const translations = [        
        {lang: "en", name: language.english, icon: "", content: en},
        {lang: "es", name: language.spanish, icon: "", content: es},
        {lang: "cat", name: language.catalan, icon: "", content: cat}
    ];


    return (
        <LanguageContext.Provider value={{lang, setLang, translations}}>
            {props.children}
        </LanguageContext.Provider>
    );
}

export {LanguageContext, LanguageProviderWrapper};