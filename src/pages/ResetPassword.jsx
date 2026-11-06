import '../index.css';
import Header from "../components/Header";
import DivContainer from '../components/DivContainer';
import LeftSection from '../components/LeftSection';
import ImgLogo from '../components/ImgLogo';
import RightSection from '../components/RightSection';
import ResetPasswordForm from '../components/ResetPasswordForm';
import Footer from '../components/Footer';


export default function ResetPassword () {

    return (
        <>
            <div className='container'>
                <Header />
                <DivContainer>
                    <LeftSection>
                        <ImgLogo />
                    </LeftSection>
                    <RightSection>
                        <ResetPasswordForm />
                    </RightSection>
                </DivContainer>
                <Footer />
            </div>
        </>
    );
}
