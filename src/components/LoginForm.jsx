import "../index.css";
import Button from "../components/Button";
import { UserContext } from "../contexts/user.context.jsx";
import { useContext } from "react";
import { LanguageContext } from "../contexts/language.context.jsx";


export default function LoginForm (props) {

    const {user, setUser, login, error, setError, errorBackend} = useContext(UserContext);
    const {lang} = useContext(LanguageContext);
    const language = lang.login;
    const translatedError = error ? lang.UserFunctions[error] : "";


    const handleUserEmail = (e) => {
        setUser({...user, email: e.target.value}); // Recoge los datos que haya mas el nuevo
        setError("");
    }

    const handleUserPassword = (e) => {
        setUser({...user, password: e.target.value});
        setError("");
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que se recargue toda la página al enviar el formulario
        console.log("Haciendo log in...");

        login(user);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {translatedError && (<p className="error">{translatedError} {errorBackend}</p>)}
                
                <p className="pLogin">{language.logInMVMood}</p>
                <input type="email" name="email" placeholder={language.email} className="imputs" value={user.email} onChange={handleUserEmail} required />
                <br/>
                <input type="password" name="password" placeholder={language.password} className="imputs" value={user.password} onChange={handleUserPassword} required  />
                <br/><br/>
                <Button>{language.logIn}</Button>
                <br/>
            </form>
        </>
    );
}