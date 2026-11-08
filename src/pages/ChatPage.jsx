import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/user.context.jsx';
import { LanguageContext } from '../contexts/language.context.jsx';
import { ChatNotificationsContext } from '../contexts/chatNotifications.context.jsx';
import '../indexChat.css';
import ChatConversaciones from '../components/ChatConversaciones.jsx';
import Chat from '../components/Chat.jsx';
import ChatUserList from '../components/ChatUserList';


export default function ChatPage() {

    const { lang } = useContext(LanguageContext);
    const language = lang.ChatPage;

    const { user: currentUser, error } = useContext(UserContext);
    const { chats, refreshChats, setActiveChat } = useContext(ChatNotificationsContext);
    const [chatSeleccionado, setChatSeleccionado] = useState(null);

    useEffect(() => {
        return () => setActiveChat(null);
    }, [setActiveChat]);

    const startChatWithUser = (selectedUser) => {
        if (!currentUser?.id) return;

        const existente = chats.find((chat) =>
            chat.usuarios?.some((usuario) => usuario.id === selectedUser.id)
        );

        const chat = existente ?? {
            id: null,
            usuarios: [currentUser, selectedUser],
            ultimo_mensaje: null,
        };

        setChatSeleccionado(chat);
        setActiveChat(chat.id);
    };

    const handleSelectChat = (chat) => {
        setChatSeleccionado(chat);
        setActiveChat(chat?.id ?? null);
    };

    const handleChatCreated = (chat) => {
        setChatSeleccionado(chat);
        setActiveChat(chat.id);
        refreshChats();
    };

    const handleBack = () => {
        setChatSeleccionado(null);
        setActiveChat(null);
        refreshChats();
    };

    const handleMessageSent = () => {
        refreshChats();
    };

    const receptorBorrador = chatSeleccionado?.usuarios?.find(
        (usuario) => usuario.id !== currentUser?.id
    );

    return (
        <>
            {error && <p className="error">{error}</p>}

            <div className={`chat-page${chatSeleccionado ? ' chat-page--open' : ''}`}>
                <div className="chat-left-column">
                    <div className="chat-left-users">
                        <ChatUserList
                            onSelectUser={startChatWithUser}
                        />
                    </div>

                    <div className="chat-left-chats">
                        <ChatConversaciones
                            currentUser={currentUser}
                            onSelectChat={handleSelectChat}
                        />
                    </div>
                </div>

                <div className="chat-right-column">
                    {chatSeleccionado ? (
                        <Chat
                            key={chatSeleccionado.id ?? `nuevo-${receptorBorrador?.id}`}
                            selectedChat={chatSeleccionado}
                            currentUser={currentUser}
                            onBack={handleBack}
                            onChatCreated={handleChatCreated}
                            onMessageSent={handleMessageSent}
                        />
                    ) : (
                        <div className="chat-placeholder">
                            <p>{language.chats}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
