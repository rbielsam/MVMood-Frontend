//import { Navigate } from "react-router-dom";

import { useState, useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { LanguageContext } from "../contexts/language.context.jsx";


export function usePosts() {

    const API_URL = import.meta.env.VITE_API_URL;

    const {lang} = useContext(LanguageContext);
    const language = lang.errorPosts;
    const {token} = useContext(UserContext);
    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    // Limpia los mensajes de la acción anterior
    const limpiarFeedback = () => {
        setError("");
        setMessage("");
    };


    // Función para obtener los POSTS
    const getPosts = async () => {
        limpiarFeedback();

        try {
            const response = await fetch(`${API_URL}/api/home`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const result = await response.json();

            if (!response.ok) {
                const errorResponse = result.message;
                console.error(`${language.errorServerLoadPosts} ${errorResponse}`);
                setError(`${language.errorServerLoadPosts} ${errorResponse}`);

                return {error: errorResponse};
            }

            setPublicaciones(result);
            console.log(`${language.okLoadPosts}`);
            return result;

        } catch (err) {
            console.error(`${language.errorServerConnectionPosts} ${err.message}`);
            setError(`${language.errorServerConnectionPosts} ${err.message}`);
            return {error: err.message};
        }
    };


    // Función para crear POSTS
    const create = async (formData) => {
        limpiarFeedback();

        try {
            const response = await fetch(`${API_URL}/api/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorServerCreatePost} ${errorResponse}`);
                setError(`${language.errorServerCreatePost} ${errorResponse}`);

                return {error: errorResponse};
            }

            console.log(`${language.okCreatePost}`);
            setMessage(`${language.okCreatePost}`);
            return data;

        } catch (err) {
            console.error(`${language.errorServerConnectionPosts} ${err.message}`);
            setError(`${language.errorServerConnectionPosts} ${err.message}`);
            return {error: err.message};
        }
    };


    // Función para eliminar POSTS
    const del = async (id) => {
        limpiarFeedback();

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

                return {error: errorResponse};
            }

            console.log(`${language.okDeletePost}`);
            setMessage(`${language.okDeletePost}`);
            return data;

        } catch (err) {
            console.error(`${language.errorServerConnectionPosts} ${err.message}`);
            setError(`${language.errorServerConnectionPosts} ${err.message}`);
            return {error: err.message};
        }
    };


    // Función para editar POSTS
    const update = async (postId, formData) => {
        limpiarFeedback();

        formData.append("_method", "PUT");

        try {
            const response = await fetch(`${API_URL}/api/publicaciones/${postId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorServerUpdatePost} ${errorResponse}`);
                setError(`${language.errorServerUpdatePost} ${errorResponse}`);

                return {error: errorResponse};
            }

            console.log(`${language.okUpdatePost}`);
            return data;

        } catch (err) {
            console.error(`${language.errorServerConnectionPosts} ${err.message}`);
            setError(`${language.errorServerConnectionPosts} ${err.message}`);
            return {error: err.message};
        }
    };


    return {getPosts, create, del, update, publicaciones, error, message};
}
