import '../index.css';
import { useContext } from 'react';
import Button from '../components/Button';
import { UserContext } from '../contexts/user.context.jsx';
import { LanguageContext } from '../contexts/language.context.jsx';
//import { Navigate } from 'react-router-dom';


export default function SignUpForm ({ props, accepted }) {

    const {user, setUser, error, setError, errorBackend, signUp} = useContext(UserContext);
    const {translations, lang, setLang} = useContext(LanguageContext);
    //const language = lang.content.signUp;
    const language = lang.signUp;
    const translatedError = error ? lang.UserFunctions[error] : "";


    const handleUserProps = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
        setError("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulario de registro enviado");

        signUp(user);        
    } 

    return (
        <>
            <form onSubmit={handleSubmit}>
                {translatedError && (<p className="error">{translatedError} {errorBackend}</p>)}
                <p className="pLogin">{language.signUpMVMood}</p>
                <input type="text" name="nickname" placeholder={language.nickname} className="imputs" value={user.nickname} onChange={handleUserProps} />
                <input type="email" name="email" placeholder={language.email} className="imputs" value={user.email} onChange={handleUserProps} required />
                <br/>
                <input type="password" name="password" placeholder={language.password} className="imputs" value={user.password} onChange={handleUserProps} required  />
                <br/>
                <input type="password" name="password_confirmation" placeholder={language.repeatPassword} className="imputs" value={user.password_confirmation} onChange={handleUserProps} required  />
                <br/><br/>
                <Button disabled={!accepted}>{language.signUp}</Button>
                <br/>
            </form>
        </>
    );
}