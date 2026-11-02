import { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { LanguageContext } from '../contexts/language.context';
import Header from "../components/Header";
import '../indexLogged.css';
import { usePosts } from '../hooks/usePosts';
import { UserContext } from '../contexts/user.context';
import Footer from "../components/Footer";
import CreatePostForm from '../components/CreatePostForm';
import Button from '../components/Button';
import Post from '../components/Post';
import { useLikes } from '../hooks/useLikes';
import { useComments } from "../hooks/useComments";
import HeaderLogged from "../components/HeaderLogged";


export default function HomePage() {

    const {translations, lang, setLang} = useContext(LanguageContext);
    const language = lang.HomePage;

    const {user, getDataLoggedUser, error, setError} = useContext(UserContext);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const {getPosts, create, publicaciones, update, del} = usePosts();
    const {like} = useLikes();
    const {getComments, createComment} = useComments();


    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        if (showCreatePost && publicaciones?.data) {
            setShowCreatePost(false);
        }
    }, [publicaciones]);

    const onCreated = () => {
        getPosts();
        setShowCreatePost(false);
    }

    return (
        <>
            <HeaderLogged />

            <div className="container">
                <Sidebar />

                <div className="main">
                    {publicaciones?.mensaje && <p className="ok">{publicaciones.mensaje}</p>}
                    {publicaciones?.error && <p className="error">{publicaciones.error}</p>} 
                    {error && (<p className="error">{error}</p>)}

                    <Button className={showCreatePost ? "buttonCancel" : ""} onClick={() => setShowCreatePost(!showCreatePost)}>
                        {showCreatePost ? `${language.cancel}` : `${language.create_post}`}
                    </Button>

                    {showCreatePost && (<CreatePostForm onCreated={onCreated} />)}

                    {!publicaciones?.data || publicaciones.data.length === 0 ? (
                        <div className="post">
                            <p>{language.no_posts}</p>
                        </div>
                    ) : (
                        publicaciones.data.map((p) => (
                            <div className="post" key={p.id}>
                                <Post post={p} update={update} del={del} updated={getPosts} deleted={getPosts} like={like} getComments={getComments} createComment={createComment} />
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            <Footer />
        </>
    );
}