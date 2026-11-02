import '../indexLogged.css';
import { useState, useContext } from 'react';
import {UserContext} from "../contexts/user.context";
import { LanguageContext } from '../contexts/language.context';
import Button from '../components/Button';
import { usePosts } from '../hooks/usePosts';
import AttachIcon from './AttachIcon';


export default function CreatePostForm({ onCreated }) {

    const {translations, lang, setLang} = useContext(LanguageContext);
    //const language = lang.content.CreatePostForm;
    const language = lang.CreatePostForm;
    
    const [contenido, setContenido] = useState("");

    const {error, setError, token} = useContext(UserContext);
    const {create} = usePosts();
    const [imagen, setImagen] = useState(null);
    const [urlImagen, setUrlImagen] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Creando publicación...");

        const formData = new FormData();
        formData.append("contenido", contenido);

        if (imagen) formData.append("imagen", imagen);

        const response = await create(formData);

        //const response = await create(contenido);

        if (response?.error) {
            return;
        }
        
        setContenido("");
        setImagen(null);
        setUrlImagen(null);
        onCreated();

    };

    const handleContenido = (e) => {
        setContenido(e.target.value);
    };

    const handleChangeImagen = (e) => {
        const imagen = e.target.files[0];

        if (!imagen) return;

        setImagen(imagen);

        const readUrl = new FileReader();
        readUrl.onload = (e) => setUrlImagen(e.target.result);
        readUrl.readAsDataURL(imagen);
    };
/*
                    {data?.mensaje && <p className="ok">{data.mensaje}</p>}
                    {data?.error && <p className="error">{data.error}</p>}
*/

    return (
        <>
            <div className="create-post">
                <h2>{language.create}</h2>

                <form onSubmit={handleSubmit}>
                    <textarea
                        name="contenido"
                        placeholder={language.share_your_updates}
                        value={contenido}
                        onChange={handleContenido}
                        required
                    />

                    <label className="attachLabel" htmlFor="createPostAddImage">
                        <AttachIcon />
                    </label>
                    <input id="createPostAddImage" type="file" name="imagen" onChange={handleChangeImagen} style={{display:"none"}} />
                    {/*<input type="file" name="imagen" onChange={(e) => {console.log("Imagen: ", e); setImagen(e.target.files[0])}} />*/}

                    {urlImagen && (
                        <img src={urlImagen} alt="Url Imagen" className="attachUrlImagen" />
                    )}

                    <Button>{language.send}</Button>
                </form>
            </div>
        </>
    );
}