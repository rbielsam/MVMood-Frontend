import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import echo from "../lib/echo";
import { LanguageContext } from "./language.context";
import { UserContext } from "./user.context";

const ChatNotificationsContext = createContext();


function ChatNotificationsProvider({ children }) {

    const API_URL = import.meta.env.VITE_API_URL;

    const { user, token } = useContext(UserContext);
    const { lang } = useContext(LanguageContext);
    const language = lang.errorChat;

    const [chats, setChats] = useState([]);
    const [unreadByChat, setUnreadByChat] = useState({});
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const activeChatIdRef = useRef(null);
    const chatsRef = useRef([]);

    useEffect(() => {
        chatsRef.current = chats;
    }, [chats]);

    const totalUnread = useMemo(
        () => Object.values(unreadByChat).reduce((total, count) => total + count, 0),
        [unreadByChat]
    );

    // Carga las conversaciones y sus contadores de mensajes sin leer
    const refreshChats = useCallback(async () => {
        if (!token) {
            setChats([]);
            setUnreadByChat({});
            setCargando(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/chats`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const data = await response.json();

            if (!response.ok || !Array.isArray(data)) {
                const errorResponse = data.message ?? response.status;
                console.error(`${language.errorConversacionesChat} ${errorResponse}`);
                setError(`${language.errorConversacionesChat} ${errorResponse}`);
                setChats([]);
                setUnreadByChat({});
                return;
            }

            setChats(data);
            setError("");

            const contadores = {};
            data.forEach((chat) => {
                if (chat.unread_count > 0) {
                    contadores[chat.id] = chat.unread_count;
                }
            });

            setUnreadByChat(contadores);
        } catch (err) {
            console.error(`${language.errorServerConnectionChat} ${err.message}`);
            setError(`${language.errorServerConnectionChat} ${err.message}`);
        } finally {
            setCargando(false);
        }
    }, [API_URL, token, language.errorConversacionesChat, language.errorServerConnectionChat]);

    // Marca una conversación como leída
    const markAsRead = useCallback(async (chatId) => {
        if (!chatId) return;

        setUnreadByChat((prev) => {
            if (!prev[chatId]) return prev;

            const siguiente = { ...prev };
            delete siguiente[chatId];
            return siguiente;
        });

        try {
            await fetch(`${API_URL}/api/chats/${chatId}/leer`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });
        } catch (err) {
            console.error(`${language.errorServerConnectionChat} ${err.message}`);
        }
    }, [API_URL, token, language.errorServerConnectionChat]);

    // Guarda la conversación abierta y la marca como leída
    const setActiveChat = useCallback((chatId) => {
        activeChatIdRef.current = chatId;

        if (chatId) {
            markAsRead(chatId);
        }
    }, [markAsRead]);

    useEffect(() => {
        if (!token || !user?.id) return;

        refreshChats();
    }, [token, user?.id, refreshChats]);

    // Escucha todos los mensajes dirigidos al usuario, aunque no esté en ese chat
    useEffect(() => {
        if (!token || !user?.id) return;

        const channel = echo.private(`user.${user.id}`);

        const handleNewMessage = (event) => {
            const mensaje = event.mensaje;
            const chatId = mensaje?.chat_id;

            if (!chatId || mensaje.emisor_id === user.id) return;

            if (!chatsRef.current.some((chat) => chat.id === chatId)) {
                refreshChats();
                return;
            }

            setChats((prev) => prev.map((chat) =>
                chat.id === chatId ? { ...chat, ultimo_mensaje: mensaje } : chat
            ));

            if (activeChatIdRef.current === chatId) {
                markAsRead(chatId);
                return;
            }

            setUnreadByChat((prev) => ({
                ...prev,
                [chatId]: (prev[chatId] ?? 0) + 1
            }));
        };

        channel.listen(".nuevo-mensaje", handleNewMessage);

        return () => {
            channel.stopListening(".nuevo-mensaje", handleNewMessage);
            echo.leave(`user.${user.id}`);
        };
    }, [token, user?.id, refreshChats, markAsRead]);

    return (
        <ChatNotificationsContext.Provider value={{
            chats,
            unreadByChat,
            totalUnread,
            cargando,
            error,
            refreshChats,
            markAsRead,
            setActiveChat
        }}>
            {children}
        </ChatNotificationsContext.Provider>
    );
}

export { ChatNotificationsContext, ChatNotificationsProvider };
