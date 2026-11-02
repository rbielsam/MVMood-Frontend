import styles from "../styles/Button.module.css";

export default function Button ({ children, className, ...props }) {
    return (
        <>
            <button className={`${styles.button} ${className ? styles[className] : ""}`} {...props}>
                {children}
            </button>
        </>
    );
}