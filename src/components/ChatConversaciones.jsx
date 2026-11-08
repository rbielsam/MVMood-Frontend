import { useContext } from 'react';
import { LanguageContext } from '../contexts/language.context';
import { ChatNotificationsContext } from '../contexts/chatNotifications.context';
import defaultAvatar from "../assets/icons/default-avatar.svg";
import UnreadBadge from './UnreadBadge';
import "../indexChat.css";


export default function ChatConversaciones({ onSelectChat, currentUser }) {

    const API_URL = import.meta.env.VITE_API_URL;

    const { lang } = useContext(LanguageContext);
    const language = lang.ConversacionesChat;
    const { chats, unreadByChat, cargando, error } = useContext(ChatNotificationsContext);

    return (

        <div className="messages-main">

            <h2>{language.conversations}</h2>

            {error && <p className="error">{error}</p>}

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

                        const sinLeer = unreadByChat[chat.id] ?? 0;

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
                                {sinLeer > 0 && <UnreadBadge count={sinLeer} />}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
