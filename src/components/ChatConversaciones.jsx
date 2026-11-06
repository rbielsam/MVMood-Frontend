import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../contexts/language.context';
import defaultAvatar from "../assets/icons/default-avatar.svg";
import "../indexChat.css";


export default function ChatConversaciones({ onSelectChat, currentUser, refreshKey = 0, onChatsLoaded }) {

    const API_URL = import.meta.env.VITE_API_URL;

    const { lang } = useContext(LanguageContext);
    const language = lang.ConversacionesChat;
    const errorLanguage = lang.errorChat;

    const [chats, setChats] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await fetch(`${API_URL}/api/chats`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                const data = await res.json();

                if (!res.ok || !Array.isArray(data)) {
                    console.error(`${errorLanguage.errorConversacionesChat} ${data.message ?? res.status}`);
                    setChats([]);
                    onChatsLoaded?.([]);
                    return;
                }

                setChats(data);
                onChatsLoaded?.(data);
            } catch (err) {
                console.error(`${errorLanguage.errorServerConnectionChat} ${err}`);
            } finally {
                setCargando(false);
            }
        };

        fetchChats();
    }, [refreshKey, onChatsLoaded, API_URL, errorLanguage.errorConversacionesChat, errorLanguage.errorServerConnectionChat]);

    return (

        <div className="messages-main">

            <h2>{language.conversations}</h2>
            {cargando ? (
                <p>{language.loading_conversations}</p>
            ) : chats.length === 0 ? (
                <p>{language.no_conversations_yet}</p>
            ) : (
                <div className="messages-list">
                    {chats.map((chat) => {
                        const receptor = chat.usuarios?.find(u => u.id !== currentUser?.id);
                        if (!receptor) return null;

                        const foto = receptor.foto_perfil
                            ? (receptor.foto_perfil.startsWith('http')
                                ? receptor.foto_perfil
                                : `${API_URL}/storage/${receptor.foto_perfil}`)
                            : defaultAvatar;

                        return (

                            <div
                                key={chat.id}
                                className="message-item"
                                onClick={() => onSelectChat(chat)}
                            >
                                <img src={foto} alt="avatar" className="message-avatar" />
                                <div className="message-info">
                                    <h4>{receptor.nickname}</h4>
                                    <p className="preview">{chat.ultimo_mensaje?.contenido || `${language.no_messages_yet}`}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
