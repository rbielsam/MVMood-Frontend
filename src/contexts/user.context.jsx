import { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { LanguageContext } from "./language.context";
import en from "../languages/en";
import es from "../languages/es";
import cat from "../languages/cat";


const UserContext = createContext();

const languages = {en, es, cat};

const getSavedLang = () => {
    const savedLang = localStorage.getItem("language");
    return savedLang ? languages[savedLang] : en;
}


function UserProviderWrapper(props) {

    const API_URL = import.meta.env.VITE_API_URL;    

    const [user, setUser] = useState({
        id: null,
        email: "",
        password: "",
        repeatPassword: "",
        nickname: ""
    });
    
    const [error, setError] = useState("");
    const [errorBackend, setErrorBackend] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    
    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if (savedToken && savedToken !== "undefined") {
            setToken(savedToken);
            <Link to="/home" />
            //window.location.replace("/home");
        }
    }, []);


    // Función asíncrona para el Login
    const login = async (user) => {

        const currentLang = getSavedLang();
        const language = currentLang.UserFunctions;
        
        // Llamada a la API de Laravel (BackEnd)
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(user)
                /*body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })*/
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorServerLogin} ${errorResponse}`);
                setError("errorServerLogin");
                setErrorBackend(`${errorResponse}`);
                //throw new Error("Error en el login: ", errorResponse);

                setUser({
                    id:"",
                    email: "",
                    password: "",
                    repeatPassword: "",
                    nickname: ""
                });

                return;

            } 

            //console.log("Login correcto: ", data); //Recibe el objeto con sus atributos
            setMessage(`${language.okLogin} ${data.user.nickname}`);

            localStorage.setItem("token", data.token);
            //console.log(`Token: ${data.token}`);
            setToken(data.token);

            localStorage.setItem("nickname", data.user.nickname);
            //<Link to="/home" />
            //window.location.replace("/home");
            
            
        } catch (err) {
            console.error(`${language.errorServerConnection} ${err.message}`);
            setError("errorServerConnection");
            setErrorBackend(`${err.message}`);

            setUser({
                id:"",
                email: "",
                password: "",
                repeatPassword: "",
                nickname: ""
            });
        }

    }
    

    // Función asíncrona para el Sign Up
    const signUp = async (user) => {

        const lang = getSavedLang();
        const language = lang.UserFunctions;

        //const response = await axios.post("http://localhost:8000/api/signup", {user});
        // Llamada al Back End (Laravel)
        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(user)/*{
                    nickname: user.nickname,
                    email: user.email,
                    user: user.password,
                    repeatPassword: user.repeatPassword
                })*/                    
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;                
                console.error(`${language.errorServerRegister} ${errorResponse}`);
                setError("errorServerRegister");
                setErrorBackend(`${errorResponse}`);
                //throw new Error("Error en el registro: ", errorResponse.message);

                setUser({
                    id:"",
                    nickname: "",
                    email: "",
                    password: "",
                    repeatPassword: ""
                });

                return;
            }

            console.log(`${language.okRegister}`);
            setMessage(`${language.okRegister}`);
            window.location.replace("/");
            //window.location.replace("/");
            //<Navigate to={"/"} replace />
            //navigate("/");

        
        } catch (err) {
            console.error(`${language.errorServerConnection} ${err.message}`);
            setError("ServerConnection");
            setErrorBackend(`${err.message}`);

            setUser({
                id:"",
                nickname: "",
                email: "",
                password: "",
                repeatPassword: ""
            });
        }

    }

    // Función asíncrona para restablecer la constraseña
    const resetPassword = async (user) => {

        const lang = getSavedLang();
        const language = lang.UserFunctions;

        // Llamada al Backend
        try {
            const response = await fetch(`${API_URL}/api/resetpassword`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorServerResetPassword} ${errorResponse}`);
                setError("errorServerResetPassword");
                setErrorBackend(`${errorResponse}`);
                //throw new Error("Error al actualizar la contraseña: ", errorResponse.message);

                setUser({
                    id:"",
                    nickname: "",
                    email: "",
                    password: "",
                    repeatPassword: ""
                });
                return;
            }

            console.log(`${language.okResetPassword}`);
            setMessage(`${language.okResetPassword}`);

        } catch (err) {
            console.error(`${language.errorServerConnection} ${err.message}`);
            setError("errorServerConnection");
            setErrorBackend(`${err.message}`);

            setUser({
                id: "",
                nickname: "",
                email: "",
                password: "",
                repeatPassword: ""
            });
        }
    }

    // Función asíncrona para devolver los datos de usuario para el HeaderLogged
    const getDataLoggedUser = async () => {

        const lang = getSavedLang();
        const language = lang.UserFunctions;

        try {
            const response = await fetch(`${API_URL}/api/user`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    //"Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message
                console.error(`${language.errorServerGetDataUserLogged} ${errorResponse}`);
                setError("errorServerGetDataUserLogged");
                setErrorBackend(`${errorResponse}`);
                //throw new Error("Error al recibir datos de usuario: ", errorResponse.message);

                return;
            }

            setUser({
                id: data.id,
                nickname: data.nickname,
                email: data.email,
                foto_perfil: data.foto_perfil
            });

            console.log(`${language.okGetDataUserLogged}`);

            return data;

        } catch (err) {
            console.error(`${language.errorServerConnection} ${err.message}`);
            setError("errorServerConnection");
            setErrorBackend(`${err.message}`);
        }
    }

    // LÓGICA DE PERFIL DE USUARIO
    // Función asíncrona para editar el nickname
    const updateNickname = async (formData) => {

        const lang = getSavedLang();
        const language = lang.UserFunctions;

        try {
            const response = await fetch(`${API_URL}/api/perfil`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    //"Content-Type": "application/json",
                    //"Accept": "application/json"
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorServerUpdateNickname} ${errorResponse}`);
                setError("errorServerUpdateNickname");
                setErrorBackend(`${errorResponse}`);
                //throw new Error("Error al recibir el Nickname actualizado");

                return;
            }

            console.log(`${language.okUpdateNickname}`);
            //setUser(getDataLoggedUser());
            await getDataLoggedUser();
            return data;

        } catch (err) {
            console.error(`${language.errorServerConnection} ${err.message}`);
            setError("errorServerConnection");
            setErrorBackend(`${err.message}`);
        }
    }

    // Función asíncrona para editar la contraseña
    const updatePassword = async (password_antigua, password_nueva, password_nueva_confirmation) => {

        const lang = getSavedLang();
        const language = lang.UserFunctions;

        try {
            const response = await fetch(`${API_URL}/api/perfil/password`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({password_antigua, password_nueva, password_nueva_confirmation})
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorServerUpdatePassword} ${errorResponse}`);
                setError("errorServerUpdatePassword");
                setErrorBackend(`${errorResponse}`);
                //throw new Error("Error al recibir los datos para el cambio de constraseña");

                return {error: errorResponse};
            }

            console.log(`${language.okUpdatePassword}`);
            await getDataLoggedUser();
            return data;

        } catch (err) {
            console.error(`${language.errorServerConnection} ${err.message}`);
            setError("errorServerConnection");
            setErrorBackend(`${err.message}`);
        }
    }


    //Cargar datos del Usuario
    useEffect(() => {
        if (token) {
            getDataLoggedUser();
        }
    }, [token]);
    
    return (
        <UserContext.Provider value={{ user, setUser, login, error, setError, errorBackend, signUp, resetPassword, message, token, getDataLoggedUser, updateNickname, updatePassword }}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProviderWrapper}