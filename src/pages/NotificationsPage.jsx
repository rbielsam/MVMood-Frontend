import '../indexLogged.css';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/language.context';


export default function NotificationsPage({ data }) {

    const {lang} = useContext(LanguageContext);
    //const language = lang.content.NotificationsPage;
    const language = lang.NotificationsPage;

    return (
        <>
            {data?.mensaje && <p className="message">{data.mensaje}</p>}
            {data?.error && <p className="error">{data.error}</p>}

            <h2>{language.notifications}</h2>

            {!data?.notificaciones || data.notificaciones.length === 0 ? (
                <div className="post">
                    <p>{language.no_notifications}</p>
                </div>
            ) : (
                data.notificaciones.map((notification) => (
                    <div
                        key={notification.id}
                        className={`notification ${notification.unread ? 'unread' : ''}`}
                    >
                        <h4>{notification.title}</h4>
                        <p>{notification.body}</p>
                        <div className="notification-time">{notification.tiempo}</div>
                    </div>
                ))
            )}
        </>
    );
}