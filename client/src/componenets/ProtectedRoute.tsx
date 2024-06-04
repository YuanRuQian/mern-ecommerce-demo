import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hook";
import { Alert } from "@mui/material";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);
    if (!isUserLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export const ProtectedAdminRoute = ({ children }: ProtectedRouteProps) => {
    const isUserAdmin = useAppSelector((state) => state.auth.isUserAdmin);

    if (!isUserAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};
