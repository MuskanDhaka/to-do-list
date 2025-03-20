import { Navigate,Outlet } from "react-router-dom";
const ProtectedRoute = () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
      return accessToken && refreshToken ? <Outlet/> : <Navigate to="/" replace/>
}

export default ProtectedRoute;