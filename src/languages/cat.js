const cat = {
    login: {
        logInMVMood: "Incia sessió a MVMood",
        email: "email",
        password: "contrasenya",
        logIn: "Iniciar sessió",
        signUp: "Registra't",
        forgotPassword: "Has oblidat la constrasenya?"
    },

    signUp: {
        terms: "por hacer",
        acceptTerms: "Accepto els termes i condicions",
        signUpMVMood: "Registra't a MVMood",
        nickname: "Nom d'usuari",
        email: "Email",
        password: "Contrasenya",
        repeatPassword: "Repeteix la contrasenya",
        signUp: "Registra't"
    },

    forgotPassword: {
        writeEmail: "Escriu el teu email",
        email: "email",
        resetPassword: "Restableix la contrasenya"
    },

    errorPage: {
        title: "Error en accedir a la ruta seleccionada",
        returnHome: "Tornar a l'inici"
    },

    Sidebar: {
        home: 'Inici',
        profile: "Perfil",
        notifications: 'Notificacions',
        chat: 'Chat',
        messages: "Missatges",
        logout: 'Tancar Sessió'
    },

    HomePage: {
        no_posts: 'No hi ha publicacions encara. Sigues el primer en publicar!',
        create_post: "Nova publicació",
        cancel: "Cancel·lar"
    },

    CreatePostForm: {
        create: 'Nova publicació',
        share_your_updates: "Comparteix les teves novetats...",
        send: 'Enviar'
    },

    Post: {
        no_comments_yet: "No hi ha comentaris",
        likes: "M\'agrada",
        comment: "Comentar",
        edit: 'Editar',
        report: "Reportar",
        type_message: 'Escriu un missatge...',
        comments: 'Comentaris',
        save: "Guardar",
        cancel: "Cancel·lar",
        delete: 'Eliminar',
        sure_delete_post: "¿Segur que vols eliminar aquesta publicació?",
    },

    NotificationsPage: {
        notifications: 'Notificacions',
        no_notifications: 'No hi ha notificacions encara.',
    },

    ProfilePage: {
        errorServerConnectionProfile: "Error de conexió amb el servidor: ",
        settings: 'Configuració',
        profile_edit: 'Editar perfil',
        nickname: "Nom d'usuari",
        save: "Guardar",
        cancel: "Cancel·lar",
        change_password: 'Canviar contrasenya',
        terms_conditions: 'Termes i condicions',
        delete_account: 'Eliminar compte',
        current_password: "Contrasenya actual",
        new_password: "Nova contrasenya",
        repeat_password: "Repeteix la contrasenya",
        confirm_password: "Confirmar contrasenya",
        fill_all_fields: "S'han d'omplir tots el camps",
        password_mismatch: "Les contrasenyes no coincideixen",
        password_too_short: "Contrasenya massa curta",
        password_updated: "Contrasenya actualitzada",
        errorDeleteUser: "Error al eliminar el compte: ",
        okDeleteUser: "Compte eliminat correctament"
    },

    ChatPage: {
        chats: "Chats"
    },

    Chat: {
        back: "Enrere",
        send: "Envia"
    },

    ConversacionesChat: {
        conversations: "Converses",
        loading_conversations: "Carregant converses...",
        no_conversations_yet: "Encara no n´hi han converses",
        no_messages_yet: "No hi ha missatges encara"
    },

    ChatUserList: {
        users: "Usuaris"
    },

    LanguageMenu: {
        english: "Anglès",
        spanish: "Castellà",
        catalan: "Català"
    },

    UserFunctions: {
        errorServerConnection: "Error al conectar amb el servidor: ",
        errorServerLogin: "Error del servidor al login: ",
        okLogin: "Login correcte: ",
        errorServerRegister: "Error en el registre: ",
        okRegister: "Registre correcte",
        errorServerResetPassword: "Error al actualitzar la contrasenya: ",
        okResetPassword: "Contrasenya actualitzada correctament",
        errorServerGetDataUserLogged: "Error al rebre dades d'usuari: ",
        okGetDataUserLogged: "Dades d'usuario rebuts correctament",
        errorServerUpdateNickname: "Error al rebre el Nickname actualitzat: ",
        okUpdateNickname: "Nickname actualitzat correctament",
        errorServerUpdatePassword: "Error al actualitzar la constrasenya: ",
        okUpdatePassword: "Contrasenya actualitzada correctament"
    },

    errorPosts: {
        errorServerConnectionPosts: "Error al conectar amb el servidor: ",
        errorServerLoadPosts: "Error al carregar els POSTS: ",
        okLoadPosts: "POSTS carregats correctament",
        errorServerCreatePost: "Error a la creació del POST: ",
        okCreatePost: "Publicació creada correctament",
        errorServerDeletePost: "Error eliminant el POST: ",
        okDeletePost: "Publicació eliminada correctament",
        errorServerUpdatePost: "Error a la edició del POST: ",
        okUpdatePost: "Publicaci editada correctament"
    },

    errorLikes: {
        errorServerConnectionLikes: "Error al conectar amb el servidor: ",
        errorLike: "Error al processar el LIKE: ",
        okLike: "LIKE processat correctament"
    },

    errorComments: {
        errorServerConnetionComments: "Error a la petici al servidor: ",
        errorLoadingComments: "Error caregant les comentaris: ",
        okCreateComment: "Comentari creat correctament",
        errorCreatingComment: "Error creant el comentari: "
    },

    errorChat: {
        errorServerConnectionChat: "Error al conectar amb el servidor: ",
        errorReturnChat: "El chat retornat no és vàlid: ",
        errorFormatoInesperado: "Format inesperat no correcte: ",
        okLiveMessageReceived: "Missatge en viu rebut: ",
        ignoredMessage: "Missatge ignorat, ya existeix a la llista",
        renderedChat: "Chat actualitza´t",
        errorConversacionesChat: "Resposta inesperada del servidor: ",
        errorReceivedListUsers: "Error al rebre la llista d'usuaris: "
    }
};

export default cat;