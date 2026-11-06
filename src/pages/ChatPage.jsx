import { useState, useContext, useEffect } from 'react';
import { UserContext } from "../contexts/user.context.jsx";
import "../indexChat.css";
import "../indexLogged.css";
import ChatConversaciones from '../components/ChatConversaciones.jsx';
import Chat from '../components/Chat.jsx';
import Footer from '../components/Footer.jsx';
import HeaderLogged from "../components/HeaderLogged.jsx";
import Sidebar from '../components/Sidebar.jsx';
import ChatUserList from "../components/ChatUserList";
import { LanguageContext } from "../contexts/language.context.jsx";


export default function ChatPage() {

    const API_URL = import.meta.env.VITE_API_URL;

    const {translations, lang, setLang} = useContext(LanguageContext);
    //const language = lang.content.ChatPage;
    const language = lang.errorChat;
    
    const { user, error, setError } = useContext(UserContext);
    const [chatSeleccionado, setChatSeleccionado] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setSidebarOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);


    const startChatWithUser = async (user) => {
        try {
            //console.log("receptor_id que se envía: ", user.id);
            const response = await fetch(`${API_URL}/api/chats/enviar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    receptor_id: user.id,
                    contenido: ""
                })
            });

            const data = await response.json();
            //console.log("Chat creado o existente: ", data);

            if (data.chat) {
                setChatSeleccionado(data.chat);
            }
            else {
                console.error(`${language.errorReturnChat} ${data}`);
            }
        

        } catch (err) {
            console.error(`${language.errorServerConnectionChat} ${err.message}`);
            throw new Error (`${language.errorServerConnectionChat} ${err.message}`);
        }
    }

    return (
        <>
            <HeaderLogged onToggleSidebar={() => setSidebarOpen((v) => !v)} sidebarOpen={sidebarOpen} />
            {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-hidden="true" />}

            <div className="chat-layout">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                {error && (<p className="error">{error}</p>)}

                <div className="chat-left-column">
                    <div className="chat-left-users">
                        <ChatUserList 
                                currentUser={user}
                                onSelectUser={startChatWithUser}
                        />
                    </div>

                    <div className="chat-left-chats">
                        <ChatConversaciones onSelectChat={(chat) => setChatSeleccionado(chat)} currentUser={user} />
                    </div>
                </div>

                <div className="chat-right-column">
                    {chatSeleccionado ? (
                        <Chat
                            selectedChat={chatSeleccionado}
                            currentUser={user}
                            onBack={() => setChatSeleccionado(null)}
                        />
                    ) : (
                        <div className="chat-placeholder">
                            <p>{language.chats}</p>
                        </div>
                    )}
                </div>

            </div>

            <Footer />
        </>
    );
}