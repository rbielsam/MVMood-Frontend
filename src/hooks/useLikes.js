import { use, useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { LanguageContext } from '../contexts/language.context';


export function useLikes () {

    const API_URL = import.meta.env.VITE_API_URL;
    
    const {token, setError} = useContext(UserContext);

    const {translations, lang, setLang} = useContext(LanguageContext);
    const language = lang.errorLikes;

    const like = async (uuid)  => {
        try{
            const response = await fetch(`${API_URL}/api/publicaciones/${uuid}/like`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorLike} ${errorResponse}`);
                setError(`${language.errorLike} ${errorResponse}`);

                return;
            }

            console.log(`${language.okLike}`);
            return data;

        } catch (err) {
            console.error(`${language.errorServerConnectionLikes} ${err.message}`);
            setError(`${language.errorServerConnectionLikes} ${err.message}`);
        }

    };

    return { like };
}