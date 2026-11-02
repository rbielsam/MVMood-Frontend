import '../indexLogged.css';
import styles from "../styles/Post.module.css";
import { useState, useContext, useEffect } from 'react';
import Button from './Button';
import { LanguageContext } from '../contexts/language.context';
import { UserContext } from "../contexts/user.context";
import userPic from "../assets/settingsprofile/user.png";
import AttachIcon from './AttachIcon';
import { Link } from "react-router-dom";


export default function Post({ post, updated, deleted, del, update, publicaciones, like, getComments, createComment }) {
    
    const API_URL = import.meta.env.VITE_API_URL;
    const {translations, lang, setLang} = useContext(LanguageContext);
    const {user, error} = useContext(UserContext);
    const language = lang.Post;

    const [editPost, setEditPost] = useState(false);
    const [editPostContent, setEditPostContent] = useState(post.contenido);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [contenido, setContenido] = useState("");
    const [newImagen, setNewImagen] = useState(null);
    const [urlImagen, setUrlImagen] = useState(null);
    const [showMenu, setShowMenu] = useState(false);


    useEffect (() => {
        const closeMenu = (e) => {
            if (!e.target.closest('.menu-container')) {
                setShowMenu(false);
            }
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, []);

    // Guardar editar POST
    const handleSave = async (id) => {

        const formData = new FormData();
        formData.append("contenido", editPostContent);

        if (newImagen) {
            formData.append("imagen", newImagen);
        }

        const response = await update(post.id, formData);
        //const response = await update(post.id, editPostContent);

        if (!response?.error) {
            updated();
            setEditPost(false);
        }
    }


    // Recibir like del Backend
    const handleLike = async () => {
        const response = await like(post.id);

        if (!response?.error) {
            setLiked(true);
            updated();
        }
        else {
            console.log("No se puede dar a like: ", response.message);
        }
    }


    // Lógica para comentarios
    const handleComment = (id) => {
        setShowComments(!showComments);
    };


    const showCommentsMenu = () => {
        setShowComments((prev) => {
            const next = !prev;

            if (next) {
                getComments(post.id).then((response) => {
                    if (!response || !response?.error) {
                        setCommentList([]);
                        setCommentList(response);
                    }
                });
            }
            return next;
        });
    };


    const handleComments = async (e) => { // Hacer comentario y guardar
        e.preventDefault();

        const response = await createComment(post.id, contenido);

        if (!response?.error) {
            setContenido("");
            setShowComments(false);

            const updateListComments = await getComments(post.id);
            setCommentList(updateListComments);
            updated();
        }
    }

    const handleChangeImagen = (e) => {
        const imagen = e.target.files[0];

        if (!imagen) return;

        setNewImagen(imagen);

        const readUrl = new FileReader();
        readUrl.onload = (e) => setUrlImagen(e.target.result);
        readUrl.readAsDataURL(imagen);
    }

    return (
        <>            
            {editPost ? (
                <div className='post-content'>
                    {/*<img src={`${API_URL}/storage/${post.imagen}`} />*/}
                    {urlImagen ?
                        <img src={urlImagen} alt="Url Imagen" className="attachUrlImagen" />
                    :
                        post.imagen && <img src={`${API_URL}/storage/${post.imagen}`} alt="Post Imagen" />
                    }

                    <textarea
                        value={editPostContent}
                        onChange={(e) => setEditPostContent(e.target.value)}
                    />

                    <label className="attachLabel" htmlFor={`editPostAddImage${post.id}`}>
                        <AttachIcon />
                    </label>
                    <input id={`editPostAddImage${post.id}`} type="file" name="imagen" onChange={handleChangeImagen} style={{display:"none"}} />
                </div>

            ) : (
                <div className="post-content">
                    <Link className={styles.linkPostNickImg} to="/profile">
                        <img src={post.user.foto_perfil ? `${API_URL}/storage/${post.user.foto_perfil}`: userPic}
                        alt="FotoPerfil"
                        className={styles.postProfileImg} />

                        <p className={styles.nicknamePost}>{post.user?.nickname}</p>
                    </Link>
                    <p className={styles.postText}>{post.contenido}</p>

                    {post.imagen && (
                        <img src={`${API_URL}/storage/${post.imagen}`} />
                    )}
                </div>

            )}

            {editPost && (
                <>
                    <Button onClick={handleSave}>
                        {language.save}
                    </Button>
                    <Button className="buttonCancel" onClick={() => {setEditPost(false); setUrlImagen(null);}}>
                        {language.cancel}
                    </Button>
                </>
            )}

            {showComments && (
                <div className="comment-section">

                    <form onSubmit={handleComments}>

                        <textarea placeholder={language.type_message}
                            rows={2}
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}>
                        </textarea>

                        <Button>{language.comment}</Button>
                        <Button className="buttonCancel" onClick={() => setShowComments(false)}>{language.cancel}</Button>

                        {/*<button type="submit">{language.comment}</button>*/}
                    </form>

                    <div className='comment-list'>
                        {commentList.length === 0 ? (
                            <p>{language.no_comments_yet}</p>
                        ) : (
                            commentList.map((comment) => (
                                <div key={comment.uuid} className="comment-item">
                                    <div className='comment-nickname'>
                                        <Link className={styles.linkPostNickImg} to="/profile"><img src={user.foto_perfil ? `${API_URL}/storage/${user.foto_perfil}`: userPic}
                                            alt="FotoPerfil"
                                            className={styles.postProfileImg} />
                                        </Link>
                                        <p>{comment.user?.nickname}</p>
                                    </div>
                                    <p>{comment.contenido}</p>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            )}

            <div className="post-actions">
                {/* Botón like */}
                <button className='like-btn' onClick={handleLike} title={language.likes}>
                    ❤️ {post.likes_count || 0}
                </button>

                {/* Botón comentarios */}
                <button className="comment-btn" onClick={showCommentsMenu} title={language.comment}>                    
                    💬 {post.comentarios_count || 0}
                </button>
                
                <div className="menu-container" style={{ position: 'relative' }}>
                    <button
                        className="menu-btn"
                        title="More options"
                        onClick={(event) => {
                            setShowMenu(prev => !prev)
                            /*const next = event.currentTarget.nextElementSibling;
                            next?.classList.toggle('show');*/
                        }}
                    >
                        ⋮
                    </button>
                
                {showMenu && (

                    <div className="menu-options">
                        {(publicaciones?.session?.rol === 'admin' || post.idUsuario === publicaciones?.session?.id) && (
                            
                            // Botón eliminar POST
                            <button
                                className="danger"
                                onClick={(e) => {
                                    setShowMenu(false);
                                    /*const next = e.currentTarget.nextElementSibling;
                                    next?.removeAttribute('show');*/
                                    if (confirm(`${language.sure_delete_post}`)) {
                                        del(post.id);
                                        deleted();
                                    }
                                }}
                            >
                                {language.delete}
                            </button>
                        )}
        
                        {/* Botón editar POST */}

                        <Button onClick={() => {setShowMenu(false); setEditPost(true); setEditPostContent(post.contenido)}}>
                            {language.edit}
                        </Button>
                    
                    
                    </div>
                )}    
                </div>
            </div>
        </>
    );
}