import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
const API_URL = import.meta.env.VITE_API_URL;

const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authEndpoint: `${API_URL}/api/broadcasting/auth`,
    authorizer: (channel) => ({
        authorize: (socketId, callback) => {
            fetch(`${API_URL}/api/broadcasting/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    socket_id: socketId,
                    channel_name: channel.name,
                }),
            })
                .then((response) => {
                    if (!response.ok) throw new Error(`Auth ${response.status}`);
                    return response.json();
                })
                .then((data) => callback(null, data))
                .catch((error) => callback(error, null));
        },
    }),
});

export default echo;
