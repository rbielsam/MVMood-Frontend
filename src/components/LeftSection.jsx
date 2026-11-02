import styles from "../styles/LeftSection.module.css";

export default function LeftSection ({ children, termConditions, imgLogo }) {
    return (
        <>
            <section className={styles.leftSection}>
                {children}
                {termConditions}
                {imgLogo}
            </section>
        </>
    );
}