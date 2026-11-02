import LeftSection from "../components/LeftSection";
import RightSection from "./RightSection";
import styles from "../styles/DivContainer.module.css";

export default function DivContainer ({ children }) {
    return (
        <>
            <div className={styles.divContainer}>
                {children}
            </div>
        </>
    )
}