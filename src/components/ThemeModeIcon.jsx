import modoOscuro from "../assets/header/modoOscuro.png";
import '../index.css';
import styles from '../styles/ThemeModeIcon.module.css';
import { useEffect, useState } from "react";


export default function ThemeModeIcon () {
    
    const [isDark, setIsDark] = useState(false);

    // Comprobamos si hay un tema guardado al cargar el componente
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, [])

    const changeTheme = () => {
        //console.log("Cambiar tema");
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle("dark", newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    }

    return (
        <>
            <img onClick={changeTheme} className={styles.themeModeIcon} src={modoOscuro} alt="Theme mode" />
        </>
    );
}