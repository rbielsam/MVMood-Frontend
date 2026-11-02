import Header from "../components/Header";
import DivContainer from "../components/DivContainer";
import LeftSection from "../components/LeftSection";
import TermConditions from "../components/TermConditions";
import RightSection from "../components/RightSection";
import Footer from "../components/Footer";
import ImgLogo from "../components/ImgLogo";
import SignUpForm from "../components/SignUpForm";
import { useState } from "react";


export default function SignUp () {

    const [accepted, setAccepted] = useState(false);

    return (
        <>
            <div className="container">
                <Header />
                <DivContainer>
                    <LeftSection termConditions={<TermConditions accepted={accepted} setAccepted={setAccepted} />} />
                    <RightSection imgLogo={<ImgLogo />} signUpForm={<SignUpForm accepted={accepted} />} />   
                </DivContainer>
                <Footer />
            </div>
        </>
    );
}