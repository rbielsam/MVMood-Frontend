import '../index.css';
import { useContext, useState } from 'react';
import Button from './Button';
import { UserContext } from '../contexts/user.context.jsx';
import { LanguageContext } from '../contexts/language.context.jsx';


export default function ForgotPasswordForm() {

    const { user, setUser, error, setError, errorBackend, message, requestPasswordReset } = useContext(UserContext);
    const { lang } = useContext(LanguageContext);
    const language = lang.forgotPassword;
    const translatedError = error ? lang.UserFunctions[error] : "";

    const [enviando, setEnviando] = useState(false);


    const handleEmail = (e) => {
        setUser({...user, email: e.target.value});
        setError("");
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        setEnviando(true);
        await requestPasswordReset(user.email);
        setEnviando(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {translatedError && (<p className="error">{translatedError} {errorBackend}</p>)}
                {message && (<p className="message">{message}</p>)}
                <p>{language.writeEmail}</p>
                <input type="email" name="email" placeholder={language.email} className="imputs" value={user.email} onChange={handleEmail} required /><br/>
                <Button type="submit" disabled={enviando}>
                    {enviando ? language.sending : language.resetPassword}
                </Button><br/><br/>
            </form>
        </>
    );
}
