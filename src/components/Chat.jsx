import React, { useState, useEffect, useRef, useContext } from 'react';
import echo from '../lib/echo'; // Tu instancia de Laravel Echo
import { LanguageContext } from '../contexts/language.context';
import "../indexChat.css";


export default function Chat({ selectedChat, onBack, currentUser }) {

    const API_URL = import.meta.env.VITE_API_URL;

    const {translations, lang, setLang} = useContext(LanguageContext);
    //const language = lang.content.Chat;
    const language = lang.errorChat;

    const receptor = selectedChat.usuarios?.find(u => u.id !== currentUser.id);
    if (!selectedChat) return null;

    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState("");
    const scrollRef = useRef(null);
    const [cargando, setCargando] = useState(false);


    useEffect(() => {
        
        if (!selectedChat?.id) return;

        const chatId = selectedChat.id;
        // Cargar mensajes previos desde la API
        const cargarHistorial = async () => {
            try {
                const response = await fetch(`${API_URL}/api/chats/${selectedChat.id}/mensajes`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                // Devuelve los datos en .data.data
                // Los invertimos para que el más reciente esté abajo
                //setMensajes(data.data.reverse());

                //console.log("Historial recibido: ", data);

                if (!response.ok) {
                    console.error("Error HTTP: ", response.status, data);
                    return;
                }

                if (Array.isArray(data.data)) {
                    setMensajes(data.data.reverse());
                }
                else {
                    console.error(`${language.errorFormatoInesperado} ${data}`);
                }

            } catch (err) {
                console.error(`${language.errorServerConnectionChat} ${err}`);

            } finally {
                setCargando(false);
            }
        };

        cargarHistorial();

        // Suscripción a Pusher (Canal Privado)
        echo.private(`chat.${chatId}`)
            .listen('.nuevo-mensaje', (e) => {
            console.log(`${language.okLiveMessageReceived} ${e.mensaje.uuid}`);

            setMensajes((prev) => {
                // Verificamos si el mensaje ya está en la lista (por su UUID)
                const yaExiste = prev.some(m => m.uuid === e.mensaje.uuid);

                if (yaExiste) {
                    console.log(`${language.ignoredMessage}`);
                    return prev; // No hacemos nada, devolvemos la lista como estaba
                }

                // Si no existe, aplicamos la lógica del emisor
                if (e.mensaje.emisor_id !== currentUser.id) {
                    return [...prev, e.mensaje];
                }

                return prev;
            });
        });

        return () => {
            echo.leave(`chat.${chatId}`);
        };
    }, [selectedChat.id]);

    // Scroll automático al final
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    // Enviar mensaje a la API
    const handleSend = async (e) => {
        e.preventDefault();
        if (!nuevoMensaje.trim()) return;

        const receptor = selectedChat.usuarios?.find(u => u.id !== currentUser.id);
        const textoParaEnviar = nuevoMensaje;
        setNuevoMensaje(""); // Limpiamos el input

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
                    contenido: textoParaEnviar
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Añadimos nuestro propio mensaje a la lista local
                setMensajes(prev => [...prev, data.mensaje]);
            }
        } catch (error) {
            console.error(`${language.errorServerConnectionChat} ${error}`);
        }
    };

    console.log(`${language.renderedChat}`);

    return ( 
        <div className="chatbox-container">

            <div className="chatbox-header"> 
                <button onClick={onBack}>← {language.back}</button> 
                {/*<h3>{selectedChat.usuarios[0]?.nickname}</h3> */}
                <h3>{receptor?.nickname}</h3>
            </div> 
            <div className="chatbox-messages"> 
                {mensajes.map(msg => ( 
                    <div key={msg.uuid} className={`chatbox-msg ${msg.emisor_id === currentUser.id ? 'sent' : 'received'}`}> 
                        {msg.contenido} 
                    </div> 
                    ))} 
                <div ref={scrollRef} /> 
            </div> 
            <form onSubmit={handleSend} className="chatbox-input"> 
                <input value={nuevoMensaje} onChange={(e) => setNuevoMensaje(e.target.value)} /> 
                <button type="submit">{language.send}</button> 
            </form> 

        </div> 
    );  
}