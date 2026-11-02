import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../contexts/language.context';
import "../indexChat.css";


export default function ChatConversaciones({ onSelectChat, currentUser }) {

    const API_URL = import.meta.env.VITE_API_URL;

    const {translations, lang, setLang} = useContext(LanguageContext);
    //const language = lang.content.ConversacionesChat;
    const language = lang.errorChat;

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
                //console.log("Respuesta Back: ", data);
                if (!Array.isArray(data)) {
                    console.error(`${language.errorConversacionesChat} ${data}`);
                    setChats([]);
                    return;
                }

                setChats(data);
                //console.log("Chats recibidos: ", chats);

            } catch (err) {
                console.error(`${language.errorServerConnectionChat} ${err}`);
            } finally {
                setCargando(false);
            }
        };
        fetchChats();
    }, []);

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
                        const receptor = chat.usuarios?.find(u => u.id !== currentUser.id);
                        if (!receptor) return null;
                        //console.log("Receptor: ", receptor);

                        return (
                    
                            <div
                                key={chat.id}
                                className="message-item"
                                onClick={() => onSelectChat(chat)}
                            >
                                <img src={receptor.foto_perfil ? `http://localhost:8000/storage/${receptor.foto_perfil}` : "/images/user.png"} alt="avatar" className="message-avatar" />
                                <div className="message-info">
                                    {/*<h4>{chat.usuarios[0]?.nickname}</h4>*/}
                                    <h4>{receptor?.nickname}</h4>
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