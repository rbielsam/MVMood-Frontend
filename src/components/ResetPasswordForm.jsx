import '../index.css';
import { useContext, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from './Button';
import { UserContext } from '../contexts/user.context.jsx';
import { LanguageContext } from '../contexts/language.context.jsx';


export default function ResetPasswordForm() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { confirmPasswordReset, error, setError, errorBackend, message } = useContext(UserContext);
    const { lang } = useContext(LanguageContext);
    const language = lang.resetPassword;
    const translatedError = error ? lang.UserFunctions[error] : "";

    const token = searchParams.get('token') ?? "";
    const email = searchParams.get('email') ?? "";

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [localError, setLocalError] = useState("");
    const [enviando, setEnviando] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLocalError("");

        if (password.length < 8) {
            setLocalError(language.passwordTooShort);
            return;
        }

        if (password !== repeatPassword) {
            setLocalError(language.passwordMismatch);
            return;
        }

        setEnviando(true);
        const restablecida = await confirmPasswordReset({
            email,
            token,
            password,
            password_confirmation: repeatPassword
        });
        setEnviando(false);

        if (restablecida) {
            window.setTimeout(() => navigate("/", { replace: true }), 2000);
        }
    }


    if (!token || !email) {
        return (
            <>
                <p className="error">{language.invalidLink}</p>
                <p><Link to="/forgotpassword">{language.requestNewLink}</Link></p>
            </>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {(localError || translatedError) && (
                    <p className="error">{localError || translatedError} {errorBackend}</p>
                )}
                {message && (<p className="message">{message}</p>)}
                <p>{language.writeNewPassword}</p>
                <input
                    type="password"
                    name="password"
                    placeholder={language.newPassword}
                    className="imputs"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    minLength={8}
                    required
                /><br/>
                <input
                    type="password"
                    name="repeatPassword"
                    placeholder={language.repeatPassword}
                    className="imputs"
                    value={repeatPassword}
                    onChange={(e) => { setRepeatPassword(e.target.value); setError(""); }}
                    minLength={8}
                    required
                /><br/>
                <Button type="submit" disabled={enviando}>
                    {enviando ? language.sending : language.submit}
                </Button><br/><br/>
            </form>
            <Link to="/">{language.backToLogin}</Link>
        </>
    );
}
