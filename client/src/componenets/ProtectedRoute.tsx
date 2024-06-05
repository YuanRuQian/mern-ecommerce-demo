import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hook";

type ProtectedRouteProps = {
    children: React.ReactNode;
    redirectIfLoggedIn: boolean;
};

export const ProtectedRoute = ({
    children,
    redirectIfLoggedIn
}: ProtectedRouteProps) => {
    const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);

    if (redirectIfLoggedIn && isUserLoggedIn) {
        return <Navigate to="/" replace />;
    }

    if (!redirectIfLoggedIn && !isUserLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

type ProtectedAdminRouteProps = {
    children: React.ReactNode;
};

export const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
    const isUserAdmin = useAppSelector((state) => state.auth.isUserAdmin);

    if (!isUserAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};
