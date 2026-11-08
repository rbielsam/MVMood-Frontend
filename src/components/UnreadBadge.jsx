import { useContext } from "react";
import { LanguageContext } from "../contexts/language.context";


export default function UnreadBadge({ count }) {

    const { lang } = useContext(LanguageContext);
    const language = lang.ChatNotifications;

    const total = count > 99 ? "99+" : count;

    return (
        <span className="chat-unread-badge" aria-label={`${language.unread_messages}: ${count}`}>
            <svg
                className="chat-unread-badge-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
            >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="chat-unread-badge-count">{total}</span>
        </span>
    );
}
