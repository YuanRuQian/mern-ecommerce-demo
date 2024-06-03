import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./componenets/RootLayout.tsx";
import Login from "./componenets/Login.tsx";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "./store.ts";
import ProductList from "./componenets/ProductList.tsx";
import Register from "./componenets/Register.tsx";
import { useAppSelector } from "./hook.ts";
import ProductDetails from "./componenets/ProductDetails.tsx";
import Users from "./componenets/Users.tsx";
import { loadUserInfoAsync } from "./slice/authSlice.ts";

const App = () => {
    const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);
    const currentUser = useAppSelector((state) => state.auth.user);

    const dispatch = useDispatch<AppDispatch>();

    if (isUserLoggedIn && !currentUser) {
        dispatch(loadUserInfoAsync());
    }

    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index={isUserLoggedIn} element={<ProductList />} />
                <Route index={!isUserLoggedIn} element={<Login />} />
                <Route path="products" element={<ProductList />} />
                <Route
                    path="product/details/:id"
                    element={<ProductDetails />}
                />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="users" element={<Users />} />
            </Route>
        </Routes>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
