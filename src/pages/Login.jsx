import '../index.css';
import styles from "../styles/Button.module.css";
import Header from "../components/Header";
import DivContainer from "../components/DivContainer";
import Footer from "../components/Footer";
import LeftSection from "../components/LeftSection";
import RightSection from "../components/RightSection";
import ImgLogo from "../components/ImgLogo";
import LoginForm from "../components/LoginForm";
import Button from '../components/Button';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { LanguageContext } from '../contexts/language.context';


export default function Login () {

    const {translations, lang, setLang} = useContext(LanguageContext);
    //const language = lang.content.login;
    const language = lang.login;


    return (
        <>
            <div className='container'>
                <Header />
                <DivContainer>
                    <LeftSection>
                        <ImgLogo />
                    </LeftSection>
                    <RightSection>
                        <LoginForm />
                        {/*<Link className={styles.button} to="/signup">{language.signUp}</Link>*/}
                        <Link to="/signup"><Button>{language.signUp}</Button></Link>
                        <Link className="a" to="/forgotpassword">{language.forgotPassword}</Link>
                    </RightSection>
                </DivContainer>
                <Footer />
            </div>
        </>
    );
}