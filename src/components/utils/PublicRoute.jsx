import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { Navigate, Outlet } from "react-router-dom";


export default function PublicRoute () {

    const {token} = useContext(UserContext);
    const redirectPath = "/home";

    if (token && token !== "undefined") {
        return <Navigate to={redirectPath} replace />
    }

    return <Outlet />  // Si no se cumple la condición entonces si carga las rutas donde queremos ir
}