import '../index.css';
import { useContext } from 'react';
import Button from './Button';
import { UserContext } from '../contexts/user.context.jsx';
import { LanguageContext } from '../contexts/language.context.jsx';


export default function ForgotPasswordForm(props) {

    const {user, setUser, error, setError, errorBackend, resetPassword} = useContext(UserContext);
    const {translations, lang, setLang} = useContext(LanguageContext);
    //const language = lang.content.forgotPassword;
    const language = lang.forgotPassword;
    const translatedError = error ? lang.UserFunctions[error] : "";


    const handleEmail = (e) => {
        setUser({...user, email: e.target.value});
        setError("");
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Conectando con el servidor...");

        resetPassword(user);

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {translatedError && (<p className="error">{translatedError} {errorBackend}</p>)}
                <p>{language.writeEmail}</p>
                <input type="email" name="email" placeholder={language.email} className="imputs" value={user.email} onChange={handleEmail} required /><br/>
                <Button>{language.resetPassword}</Button><br/><br/>
            </form>
        </>
    );
}