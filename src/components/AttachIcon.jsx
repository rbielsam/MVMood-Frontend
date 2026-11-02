import attach from "../assets/icons/attach.png";
import styles from "../styles/AttachIcon.module.css";

export default function AttachIcon () {

    return (
        <img id={styles.attachIconId} className={styles.attachIcon} src={attach} alt="Icono adjuntar imágen" />
    );
}