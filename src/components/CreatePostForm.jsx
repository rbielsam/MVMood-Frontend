import '../indexLogged.css';
import { useState, useContext } from 'react';
import { LanguageContext } from '../contexts/language.context';
import Button from '../components/Button';
import { usePosts } from '../hooks/usePosts';
import AttachIcon from './AttachIcon';


export default function CreatePostForm({ onCreated }) {

    const {lang} = useContext(LanguageContext);
    const language = lang.CreatePostForm;
    const {create, error} = usePosts();

    const [contenido, setContenido] = useState("");
    const [imagen, setImagen] = useState(null);
    const [urlImagen, setUrlImagen] = useState(null);
    const [enviando, setEnviando] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Creando publicación...");

        const formData = new FormData();
        formData.append("contenido", contenido);

        if (imagen) formData.append("imagen", imagen);

        setEnviando(true);
        const response = await create(formData);
        setEnviando(false);

        // Si falla, se conservan el texto y la imagen para poder reintentar
        if (response?.error) {
            return;
        }

        setContenido("");
        setImagen(null);
        setUrlImagen(null);
        onCreated(response);
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


    return (
        <>
            <div className="create-post">
                <h2>{language.create}</h2>

                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}

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

                    {urlImagen && (
                        <img src={urlImagen} alt="Url Imagen" className="attachUrlImagen" />
                    )}

                    <Button disabled={enviando}>{language.send}</Button>
                </form>
            </div>
        </>
    );
}
