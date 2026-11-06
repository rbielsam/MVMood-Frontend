import { useState, useEffect, useRef, useContext } from 'react';
import echo from '../lib/echo';
import { LanguageContext } from '../contexts/language.context';
import "../indexChat.css";


export default function Chat({ selectedChat, onBack, currentUser, onChatCreated }) {

    const API_URL = import.meta.env.VITE_API_URL;

    const { lang } = useContext(LanguageContext);
    const language = lang.Chat;
    const errorLanguage = lang.errorChat;

    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState("");
    const [cargando, setCargando] = useState(Boolean(selectedChat?.id));
    const scrollRef = useRef(null);

    const receptor = selectedChat?.usuarios?.find(
        (usuario) => usuario.id !== currentUser?.id
    );

    useEffect(() => {
        const chatId = selectedChat?.id;
        if (!chatId) return;

        let cancelado = false;

        const cargarHistorial = async () => {
            try {
                const response = await fetch(`${API_URL}/api/chats/${chatId}/mensajes`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();

                if (!response.ok) {
                    console.error(`${errorLanguage.errorServerConnectionChat} ${data.message ?? response.status}`);
                    return;
                }

                if (Array.isArray(data.data)) {
                    setMensajes([...data.data].reverse());
                } else {
                    console.error(`${errorLanguage.errorFormatoInesperado} ${data}`);
                }
            } catch (err) {
                console.error(`${errorLanguage.errorServerConnectionChat} ${err}`);
            } finally {
                if (!cancelado) setCargando(false);
            }
        };

        cargarHistorial();

        echo.private(`chat.${chatId}`)
            .listen('.nuevo-mensaje', (e) => {
                if (e.mensaje.emisor_id === currentUser?.id) return;

                setMensajes((prev) => {
                    const yaExiste = prev.some(m => m.uuid === e.mensaje.uuid);
                    return yaExiste ? prev : [...prev, e.mensaje];
                });
            });

        return () => {
            cancelado = true;
            echo.leave(`chat.${chatId}`);
        };
    }, [selectedChat?.id, currentUser?.id, API_URL, errorLanguage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!nuevoMensaje.trim() || !receptor?.id || cargando) return;

        const texto = nuevoMensaje;
        setNuevoMensaje("");

        try {
            const response = await fetch(`${API_URL}/api/chats/enviar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    receptor_id: receptor.id,
                    contenido: texto
                })
            });
            const data = await response.json();

            if (!response.ok) {
                setNuevoMensaje(texto);
                console.error(`${errorLanguage.errorReturnChat} ${data.message ?? response.status}`);
                return;
            }

            if (!selectedChat.id) {
                if (data.chat && onChatCreated) {
                    onChatCreated(data.chat);
                } else {
                    setNuevoMensaje(texto);
                }
                return;
            }

            if (!data.mensaje) {
                setNuevoMensaje(texto);
                return;
            }

            setMensajes((prev) => {
                const yaExiste = prev.some(m => m.uuid === data.mensaje.uuid);
                return yaExiste ? prev : [...prev, data.mensaje];
            });
        } catch (error) {
            setNuevoMensaje(texto);
            console.error(`${errorLanguage.errorServerConnectionChat} ${error}`);
        }
    };

    if (!selectedChat) return null;

    return (
        <div className="chatbox-container">

            <div className="chatbox-header">
                <button type="button" className="chatbox-back" onClick={onBack}>
                    ← {language.back}
                </button>
                <h3>{receptor?.nickname}</h3>
            </div>

            <div className="chatbox-messages">
                {mensajes.map(msg => (
                    <div key={msg.uuid} className={`chatbox-msg ${msg.emisor_id === currentUser?.id ? 'sent' : 'received'}`}>
                        {msg.contenido}
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            <form onSubmit={handleSend} className="chatbox-input">
                <input
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    disabled={cargando}
                    aria-label={language.send}
                />
                <button type="submit" disabled={cargando}>{language.send}</button>
            </form>

        </div>
    );
}
