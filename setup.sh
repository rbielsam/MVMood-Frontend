if [ -f .env.example ]; then
    cp .env.example .env
else
    touch .env
fi

echo "VITE_API_URL=http://127.0.0.1:8000" >> .env

echo "⚠️  Edita .env con tus credenciales de Pusher (VITE_PUSHER_APP_ID, VITE_PUSHER_APP_KEY, VITE_PUSHER_APP_SECRET)"

sudo apt install npm
npm install
npm run dev