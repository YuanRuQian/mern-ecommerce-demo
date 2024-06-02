import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./componenets/RootLayout.tsx";
import Login from "./componenets/Login.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";
import ProductList from "./componenets/ProductList.tsx";
import Register from "./componenets/Register.tsx";
import { useAppSelector } from "./hook.ts";
import ProductDetails from "./componenets/ProductDetails.tsx";

const App = () => {
    const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);

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
