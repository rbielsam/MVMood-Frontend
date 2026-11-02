import imgLogo from "../assets/imgLogo.png";
import styles from "../styles/ImgLogo.module.css";
import { Link } from "react-router-dom";


export default function ImgLogo ({ to="/", ...props }) {
    return (
        <>
            {/*<a href="/"> <img className={styles.imgLogo} src={imgLogo} alt="Logo MVMood" /></a>*/}
            <Link to={to}><img className={styles.imgLogo} src={imgLogo} alt="Logo MVMood" {...props} /> </Link>
        </>
    );
}