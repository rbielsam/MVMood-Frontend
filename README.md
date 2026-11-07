# MVMood — Frontend

SPA de **MVMood**, la red social privada del instituto MVM. Está pensada para que alumnado y profesorado del centro puedan conectar entre sí: publicar novedades, comentar, dar «me gusta», hablar por chat y personalizar su perfil.

El acceso está limitado a cuentas con correo `@institutmvm.cat`. Este repositorio contiene únicamente la interfaz; la API está en [`../MVMoodLaravel`](../MVMoodLaravel).

## Funcionalidades

- **Inicio de sesión, registro y recuperación de contraseña** con enlaces enviados por correo.
- **Home** con el listado paginado de publicaciones.
- **Publicaciones**: crear con texto e imagen, editar y borrar las propias.
- **Comentarios y likes** en cada publicación.
- **Chat privado** entre usuarios, con mensajes en tiempo real mediante Pusher.
- **Perfil**: cambio de nickname, foto de perfil, contraseña y eliminación de la cuenta.
- **Aviso para administradores**: el rol `admin` no puede crear publicaciones; la interfaz muestra un aviso y el backend también lo impide.
- **Tres idiomas**: español, catalán e inglés.
- **Modo claro y oscuro**, con la preferencia guardada en el navegador.
- **Diseño responsive**, con menú lateral colapsable en móvil.
- **Mensajes unificados**: errores en cajas rojas y confirmaciones en cajas verdes.

> La pantalla de notificaciones está preparada, pero todavía no tiene backend propio.

## Stack

- React 19
- Vite 8
- React Router 7
- Laravel Sanctum mediante bearer token guardado en `localStorage`
- Laravel Echo + Pusher para el chat en tiempo real
- CSS propio (incluye módulos para algunos componentes)

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0` y npm.
- El backend de [`../MVMoodLaravel`](../MVMoodLaravel) en funcionamiento.
- Una cuenta de Pusher configurada en ambos proyectos para poder usar el chat.

## Configuración

### Instalación rápida

El repositorio incluye `setup.sh`, que copia `.env.example`, añade `VITE_API_URL`, instala las dependencias y arranca el servidor de desarrollo:

```bash
chmod +x setup.sh
./setup.sh
```

Después, edita `.env` con los datos de Pusher.

### Instalación manual (recomendada)

```bash
cp .env.example .env
# Edita .env con la URL de la API y las claves de Pusher
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Variables de entorno

| Variable | Para qué sirve |
|---|---|
| `VITE_API_URL` | URL base del backend. En desarrollo, `http://127.0.0.1:8000`. |
| `VITE_PUSHER_APP_KEY` | Clave pública de Pusher para el chat. |
| `VITE_PUSHER_APP_CLUSTER` | Clúster de Pusher (por ejemplo, `eu`). |

`VITE_PUSHER_APP_SECRET` aparece en el archivo de ejemplo, pero **no se usa en el navegador**: el secret de Pusher solo debe configurarse en el backend. Nunca pongas el secret real en el frontend.

## Comandos

```bash
# Servidor de desarrollo con recarga en caliente
npm run dev

# Compilación para producción
npm run build

# Análisis de código
npm run lint

# Previsualizar la compilación
npm run preview
```

## Rutas de la aplicación

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Inicio de sesión. |
| `/signup` | Público | Registro con correo del instituto. |
| `/forgotpassword` | Público | Solicitud de recuperación de contraseña. |
| `/reset-password` | Público | Formulario para establecer una nueva contraseña. |
| `/home` | Privado | Listado de publicaciones. |
| `/profile` | Privado | Perfil del usuario. |
| `/notifications` | Privado | Pantalla de notificaciones (pendiente de backend). |
| `/chat` | Privado | Conversaciones privadas. |
| `*` | Público | Página de error para rutas desconocidas. |

Las rutas privadas están protegidas: si no hay token, la aplicación redirige al inicio de sesión.

## Estructura del proyecto

```text
src/
  pages/          Pantallas de la aplicación
  components/     Componentes reutilizables (header, sidebar, posts, chat...)
  hooks/          Lógica de publicaciones, comentarios y likes
  contexts/       Usuario, idioma y estado compartido
  languages/      Textos en español, catalán e inglés
  lib/            Configuración de Laravel Echo / Pusher
  App.jsx         Definición de rutas
  main.jsx        Punto de entrada
```

La interfaz consume la API mediante `fetch`; nunca accede directamente a la base de datos.

## Notas

- Abre la aplicación en `http://localhost:5173` (no `127.0.0.1`) para que coincida con el origen permitido por CORS en el backend.
- Las imágenes de publicaciones y fotos de perfil las sirve el backend desde `storage`; por eso es necesario ejecutar `php artisan storage:link`.
- El token de sesión se guarda en `localStorage`; al cambiar la contraseña o cerrar sesión se invalida.
- El chat necesita que las claves de Pusher coincidan en el `.env` del backend y en el de la SPA.
- Actualmente no hay pruebas automáticas de frontend; se comprueba con `npm run build` y `npm run lint`.

## Documentación

- Manual de la aplicación: [`../docs/Documentation.html`](../docs/Documentation.html)
- Constitución y reglas del proyecto: [`../docs/constitution.md`](../docs/constitution.md) y [`../AGENTS.md`](../AGENTS.md)
- Especificaciones por funcionalidad: [`../specs`](../specs)
- Estado y decisiones del proyecto: [`../MEMORY.md`](../MEMORY.md)
