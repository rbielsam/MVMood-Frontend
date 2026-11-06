import { useState, useContext } from 'react';
import { UserContext } from '../contexts/user.context.jsx';
import { LanguageContext } from '../contexts/language.context.jsx';
import '../indexChat.css';
import ChatConversaciones from '../components/ChatConversaciones.jsx';
import Chat from '../components/Chat.jsx';
import ChatUserList from '../components/ChatUserList';


export default function ChatPage() {

    const { lang } = useContext(LanguageContext);
    const language = lang.ChatPage;

    const { user: currentUser, error } = useContext(UserContext);
    const [chatSeleccionado, setChatSeleccionado] = useState(null);
    const [conversaciones, setConversaciones] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const startChatWithUser = (selectedUser) => {
        if (!currentUser?.id) return;

        const existente = conversaciones.find((chat) =>
            chat.usuarios?.some((usuario) => usuario.id === selectedUser.id)
        );

        setChatSeleccionado(existente ?? {
            id: null,
            usuarios: [currentUser, selectedUser],
            ultimo_mensaje: null,
        });
    };

    const handleChatCreated = (chat) => {
        setChatSeleccionado(chat);
        setRefreshKey((key) => key + 1);
    };

    const handleBack = () => {
        setChatSeleccionado(null);
        setRefreshKey((key) => key + 1);
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
                            refreshKey={refreshKey}
                            onChatsLoaded={setConversaciones}
                            onSelectChat={setChatSeleccionado}
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
