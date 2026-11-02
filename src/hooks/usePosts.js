//import { Navigate } from "react-router-dom";

import { useState, useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { LanguageContext } from "../contexts/language.context.jsx";


export function usePosts() {

    const API_URL = import.meta.env.VITE_API_URL;

    const {lang} = useContext(LanguageContext);
    const language = lang.errorPosts;
    const {token, error, setError, message, setMessage} = useContext(UserContext);
    const [publicaciones, setPublicaciones] = useState([]);
    const redirectPath = "/home";


    // Función para obtener los POSTS
    const getPosts = async () => {
        try {
            //console.log("Token que se envia: ", token);

            const response = await fetch(`${API_URL}/api/home`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    //"Content-Type": "application/json",
                    "Accept": "application/json"
                },
                //body: JSON.stringify({contenido})           
            });

            const result = await response.json();
            //console.log(result.data);
            
            if (!response.ok) {
                //throw new Error("No se pueden cargar las peticiones");
                const errorResponse = data.message;
                console.error(`${language.errorServerLoadPosts} ${errorResponse}`);
                setError(`${language.errorServerLoadPosts} ${errorResponse}`);

                return {error: errorResponse};
            }

            setPublicaciones(result);
            console.log(`${language.okLoadPosts}`);

        } catch (err) {
            console.log(`${language.errorServerConnectionPosts} ${err}`);
            setError(`${language.errorServerConnectionPosts} ${err}`);
        }
    };

    
    // Función para crear POSTS
    const create = async (formData/*contenido*/) => {

        try {
            const response = await fetch(`${API_URL}/api/create`, {                
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    //"Content-Type": "application/json",
                    "Accept": "application/json"
                },
                //body: JSON.stringify({formData/*contenido*/})    
                body: formData       
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorServerCreatePost} ${errorResponse}`);
                setError(`${language.errorServerCreatePost} ${errorResponse}`);
            }

            else {
                console.log(`${language.okCreatePost}`);
                setMessage(`${language.okCreatePost}`);
                return data;
            }
        
        } catch (err) {
            console.error(`${language.errorServerConnectionPosts} ${err.message}`);
            setError(`${language.errorServerConnectionPosts} ${err.message}`);
        }

    };


    // Función para eliminar POSTS
    const del = async (id) => {

        // Llamada al BackEnd (Laravel)
        try {
            const response = await fetch(`${API_URL}/api/publicaciones/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorServerDeletePost} ${errorResponse}`);
                setError(`${language.errorServerDeletePost} ${errorResponse}`);
            }

            else {
                console.log(`${language.okDeletePost}`);
                setMessage(`${language.okDeletePost}`);
                return data;
            }

        } catch (err) {
            console.error(`${language.errorServerConnectionPosts} ${err.message}`);
            setError(`${language.errorServerConnectionPosts} ${err.message}`);
        }

    };


    // Función para editar POSTS
    const update = async (postId, formData/*contenido*/) => {

        formData.append("_method", "PUT")
        // Llamada al BackEnd (Laravel)
        try {
            const response = await fetch(`${API_URL}/api/publicaciones/${postId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    //"Content-Type": "application/json",
                    "Accept": "application/json"
                },
                //body: JSON.stringify({ formData/*contenido*/ })
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorServerUpdatePost} ${errorResponse}`);
                setError(`${language.errorServerUpdatePost} ${errorResponse}`);
                return;
            }

            console.log(`${language.okUpdatePost}`);
            //setMessage(`${language.okUpdatePost}`);
            return data;

        } catch (err) {
            console.error(`${language.errorServerConnectionPosts} ${err.message}`);
            setError(`${language.errorServerConnectionPosts} ${err.message}`);
        }
    };


    return {getPosts, create, del, update, publicaciones};
}