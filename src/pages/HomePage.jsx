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

    const {lang} = useContext(LanguageContext);
    const language = lang.HomePage;

    const {user, error} = useContext(UserContext);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [postFeedback, setPostFeedback] = useState("");
    const {getPosts, publicaciones, update, del, error: postsError, message: postsMessage} = usePosts();
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
        setPostFeedback(lang.errorPosts.okCreatePost);
        getPosts();
        setShowCreatePost(false);
    }

    const toggleCreatePost = () => {
        setPostFeedback("");
        setShowCreatePost(!showCreatePost);
    }

    return (
        <>
            {postsMessage && <p className="message">{postsMessage}</p>}
            {postsError && <p className="error">{postsError}</p>}
            {postFeedback && <p className="message">{postFeedback}</p>}
            {error && (<p className="error">{error}</p>)}

            <Button className={showCreatePost ? "buttonCancel" : ""} onClick={toggleCreatePost}>
                {showCreatePost ? `${language.cancel}` : `${language.create_post}`}
            </Button>

            {showCreatePost && (
                user?.rol === "admin" ? (
                    <p className="error">{language.adminCannotPost}</p>
                ) : (
                    <CreatePostForm onCreated={onCreated} />
                )
            )}

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
        </>
    );
}
