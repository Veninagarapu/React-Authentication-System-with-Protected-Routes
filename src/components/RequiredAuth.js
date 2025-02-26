import { Navigate, useLocation } from 'react-router-dom';

const RequiredAuth = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem("accessToken"); // Example auth check

    return isAuthenticated ? children : <Navigate to="/" state={{ from: location.pathname }} replace />;
};

export default RequiredAuth;
