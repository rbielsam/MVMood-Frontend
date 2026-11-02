import '../index.css';
import Header from "../components/Header";
import DivContainer from '../components/DivContainer';
import LeftSection from '../components/LeftSection';
import ImgLogo from '../components/ImgLogo';
import RightSection from '../components/RightSection';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Footer from '../components/Footer';


export default function ForgotPassword () {

    return (
        <>
            <div className='container'>
                <Header />
                <DivContainer>
                <LeftSection imgLogo={<ImgLogo />} />
                <RightSection forgotPasswordForm={<ForgotPasswordForm />} />
                </DivContainer>
                <Footer />
            </div>
        </>
    );
} 