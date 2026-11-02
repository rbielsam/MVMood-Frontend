import { useState, useContext, useEffect } from 'react';
import HeaderLogged from '../components/HeaderLogged';
import Sidebar from '../components/Sidebar';
import Button from "../components/Button";
import '../indexLogged.css';
import Footer from '../components/Footer';
import TermConditions from '../components/TermConditions';
import { LanguageContext } from '../contexts/language.context';
import { UserContext } from '../contexts/user.context';
import userPic from "../assets/settingsprofile/user.png";


export default function ProfilePage() {

    const API_URL = import.meta.env.VITE_API_URL;

    const {user, setUser, getDataLoggedUser, updateNickname, updatePassword, error, setError, token} = useContext(UserContext);

    const {translations, lang, setLang} = useContext(LanguageContext);
    const language = lang.ProfilePage;

    const [profilePic, setProfilePic] = useState({userPic});
    const [nickname, setNickname] = useState("");
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        setNickname(user.nickname);
    }, [user.nickname]);

    const handleProfilePicChange = async (e) => {

        const foto_perfil = e.target.files?.[0];

        if (!foto_perfil) return;

        const formData = new FormData();
        formData.append("foto_perfil", foto_perfil);

        const data = await updateNickname(formData);
        
    };

    const handleNicknameChange = async (e) => {
        e.preventDefault();

        const newNickname = nickname.trim();

        if (!newNickname) return;

        const formData = new FormData();
        formData.append("nickname", newNickname);

        const data = await updateNickname(formData);

        setIsEditingNickname(false);
    };

    const handlePasswordInput = async (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };


    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordMessage("");

        const data = await updatePassword(passwords.current, passwords.next, passwords.confirm);

        if (data?.error) {
            setPasswordError(data.error);
        }

        else if (data) {
            setPasswordMessage(language.password_updated);
            setPasswords({ current: '', next: '', confirm: '' });
        }
        else {
            setPasswordError('Error por editar y pasar diccionario');
        }

    }

    const deleteAccount = async () => {
        try {
            const response = await fetch(`${API_URL}/api/perfil/delete`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    //"Content-Type": "application/json",
                    //"Accept": "application/json"
                }
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error(`${language.errorDeleteUser} ${errorResponse}`);
                setPasswordError(`${language.errorDeleteUser} ${errorResponse}`);

                return;
            }

            console.log(`${language.okDeleteUser}`);
            localStorage.removeItem("token");
            localStorage.removeItem("language");
            localStorage.removeItem("theme");
            localStorage.removeItem("nickname");
            localStorage.removeItem("pusherTransportTLS");
            window.location.replace("/");

        } catch (err) {
            console.error(`${language.errorServerConnectionProfile} ${err.message}`);
            setError(`${language.errorServerConnectionProfile} ${err.message}`);
        }
    }


    return (
        <>
            <HeaderLogged />
            <div className="container">
                <Sidebar />
                <div className="main">
                    {error && (<p className="error">{error}</p>)}
                    <h2>{language.settings}</h2>

                    <div className="settings-section profile-section">
                        <h3>{language.profile_edit}</h3>
                        <div className="profile-card">
                            <div className="profile-picture-section">
                                <div className="profile-picture-container">
                                    <img className="profile-picture" src={user.foto_perfil ? `http://localhost:8000/storage/${user.foto_perfil}` : userPic} />
                                    <div className="profile-picture-overlay">
                                        <label htmlFor="profile-pic-input" className="change-photo-btn">
                                            <span>📷</span>
                                        </label>
                                        <input
                                            className='imputs'
                                            id="profile-pic-input"
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleProfilePicChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="profile-details">
                                <div className="nickname-section">
                                    <div className="section-label">{language.nickname}</div>
                                    {!isEditingNickname ? (
                                        <div className="nickname-display">
                                            <span className="nickname-text">{nickname}</span>
                                            <button onClick={() => setIsEditingNickname(true)} className="edit-nickname-btn">
                                                ✏️ Edit
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleNicknameChange} className="nickname-edit-form">
                                            <input 
                                                type="text" 
                                                name="nickname"
                                                value={nickname}
                                                maxLength={255}
                                                required
                                                className="imputs"
                                                onChange={(e) => setNickname(e.target.value)}
                                            />
                                            <div className="form-actions">
                                                <Button>{language.save}</Button>
                                                <Button className="buttonCancel" onClick={() => {setIsEditingNickname(false); setNickname(user.nickname)}}>{language.cancel} </Button>
                                                {/*<button type="submit" className="save-btn">Save</button>
                                                <button type="button" onClick={() => setIsEditingNickname(false)} className="cancel-btn">{language.cancel}</button>*/}
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="settings-section">
                        <button className="settings-button" onClick={() => setShowPasswordForm((prev) => !prev)}>
                            {language.change_password}
                        </button>

                        <button className="settings-button" onClick={() => setShowTerms(true)}>{language.terms_conditions}</button>
                        <button className="settings-button" onClick={() => setShowHelp(true)}>Para borrar o añadir otra cosa</button>
                        <button className="settings-button delete" onClick={deleteAccount}>{language.delete_account}</button>
                    </div>

                    {showPasswordForm && (
                        <div className="modal-overlay" onClick={() => setShowPasswordForm(false)}>
                            <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>{language.change_password}</h3>
                                    <button type="button" className="modal-close" onClick={() => setShowPasswordForm(false)}>
                                        ×
                                    </button>
                                </div>
                                
                                <form onSubmit={handlePasswordChange}>
                                    <div className="form-group">
                                        <label htmlFor="current">{language.current_password}</label>
                                        <input
                                            className='imputs'
                                            id="current"
                                            name="current"
                                            type="password"
                                            value={passwords.current}
                                            onChange={handlePasswordInput}
                                            placeholder={language.current_password}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="next">{language.new_password}</label>
                                        <input
                                            className='imputs'
                                            id="next"
                                            name="next"
                                            type="password"
                                            value={passwords.next}
                                            onChange={handlePasswordInput}
                                            placeholder={language.new_password}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirm">{language.repeat_password}</label>
                                        <input
                                            className='imputs'
                                            id="confirm"
                                            name="confirm"
                                            type="password"
                                            value={passwords.confirm}
                                            onChange={handlePasswordInput}
                                            placeholder={language.repeat_password}
                                        />
                                    </div>

                                    {passwordError && <p className="error">{passwordError}</p>}
                                    {passwordMessage && <p className="message">{passwordMessage}</p>}

                                    <div className="form-actions">
                                        {/*<button type="submit" className="save-btn">{language.confirm_password}</button>*/}
                                        <Button>{language.confirm_password}</Button>
                                        <Button className="buttonCancel" onClick={() => setShowPasswordForm(false)}>{language.cancel}</Button>
                                        {/*<button type="button" className="cancel-btn" onClick={() => setShowPasswordForm(false)}>
                                            {language.cancel}
                                        </button>*/}                                
                                    </div>

                                </form>
                            </div>
                        </div>
                    )}

                    {showHelp && (
                        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
                            <div className="modal-card modal-card--wide" onClick={(event) => event.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>Si teneis alguna sugerencia se puede poner si no se borra</h3>
                                    <button type="button" className="modal-close" onClick={() => setShowHelp(false)}>
                                        ×
                                    </button>
                                </div>
                                <div className="help-content">
                                    <h4>Ayuda y soporte de MVMood</h4>
                                    <p>Estamos aquí para resolver tus dudas, ayudarte con tu cuenta y acompañarte en el uso diario de la plataforma.</p>
                                    <ul>
                                        <li><strong>¿Problemas para iniciar sesión?</strong> Comprueba tu correo institucional y contraseña.</li>
                                        <li><strong>Cambio de contraseña:</strong> Usa el botón “Cambiar contraseña” para renovar tu acceso de forma segura.</li>
                                        <li><strong>Publicaciones y mensajes:</strong> Mantén siempre el respeto y evita compartir datos personales.</li>
                                    </ul>
                                    <p>Si necesitas ayuda personalizada, contacta con:</p>
                                    <p><strong>Email:</strong> contacto@tu-dominio.com</p>
                                    <p>También puedes enviar tus preguntas desde dentro de la plataforma y te responderemos lo antes posible.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {showTerms && (
                        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
                            <div className="modal-card modal-card--wide" onClick={(event) => event.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>{language.terms_conditions}</h3>
                                    <button type="button" className="modal-close" onClick={() => setShowTerms(false)}>
                                        ×
                                    </button>
                                </div>
                                <div className="terms-content">
                                    <TermConditions showCheckbox={false}></TermConditions>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}