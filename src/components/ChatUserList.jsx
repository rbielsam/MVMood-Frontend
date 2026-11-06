import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../contexts/language.context";


export default function ChatUserList ({ onSelectUser }) {

    const API_URL = import.meta.env.VITE_API_URL;

    const { lang } = useContext(LanguageContext);
    const language = lang.ChatUserList;
    const errorLanguage = lang.errorChat;

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUserList = async () => {
            try {

                const response  = await fetch(`${API_URL}/api/users`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Accept": "application/json"
                    }
                });

                const data = await response.json();

                if (!response.ok || !Array.isArray(data)) {
                    console.error(`${errorLanguage.errorReceivedListUsers} ${data.message ?? response.status}`);
                    setUsers([]);
                    return;
                }

                setUsers(data);

            } catch (err) {
                console.error(`${errorLanguage.errorServerConnectionChat} ${err.message}`);
                setUsers([]);
            }
        }

        getUserList();
    }, [API_URL, errorLanguage.errorReceivedListUsers, errorLanguage.errorServerConnectionChat]);

    const listUsers = () => {
        return users.map(user => (
            <li key={user.id} className="user-item" onClick={() => onSelectUser(user)}>
                <p>{user.nickname}</p>
            </li>
        ))
    }

    return (
        <div className="users-list">
            <h3>{language.users}</h3>
            <ul className="users-list-items">
                {listUsers()}
            </ul>
        </div>
    );

}
