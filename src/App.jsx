import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/utils/ProtectedRoute';
import PublicRoute from './components/utils/PublicRoute';
import './index.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import ChatPage from './pages/ChatPage';


function App() {

  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      
        <Route path="*" element={<ErrorPage />} /> // Cualquier ruta que no esté registrada en las Route llevará a la página de error
      </Routes>
    </>
  );
}

export default App