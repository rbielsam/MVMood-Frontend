import "../index.css";
import styles from "../styles/RightSection.module.css";


export default function RightSection ({ children, imgLogo, signUpForm, forgotPasswordForm }) {

    return (       
        <>
            <section className={styles.rightSection}>
                    {imgLogo}
                <div className={styles.formContent}>
                    {children}
                    {signUpForm}
                    {forgotPasswordForm}
                </div>
            </section>
        </>
    );
}