import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { LanguageContext } from '../contexts/language.context';


export function useComments () {

    const API_URL = import.meta.env.VITE_API_URL;

    const {token, setError} = useContext(UserContext);

    const {translations, lang, setLang} = useContext(LanguageContext);
    const language = lang.errorComments;

    // Función para obtener los comentarios de un post
    const getComments = async (uuid) => {
        try {
            const response = await fetch(`${API_URL}/api/publicaciones/${uuid}/comentarios`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const data = await response.json();

            if(!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorLoadingComments} ${errorResponse}`);
                setError(`${language.errorLoadingComments} ${errorResponse}`);

                return;
            }

            return data;

        } catch (err) {
            console.error(`${language.errorServerConnectionComments} ${err.message}`);
            setError(`${language.errorServerConnectionComments} ${err.message}`);
            return {error: err.message};
        }
    }


    // Función para guardar comentario de un POST
    const createComment = async (uuid, contenido) => {
        try {
            const response = await fetch(`${API_URL}/api/publicaciones/${uuid}/comentarios`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({contenido})
            });

            const data = await response.json();

            if(!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorCreatingComment} ${errorResponse}`);
                setError(`${language.errorCreatingComment} ${errorResponse}`);

                return;
            }

            console.log(`${language.okCreateComment}`);
            return data;

        } catch (err) {
            console.error(`${language.errorServerConnetionComments} ${err.message}`);
            setError(`${language.errorServerConnetionComments} ${err.message}`);
        }
    }

    return { getComments, createComment };
}