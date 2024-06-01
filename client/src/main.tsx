import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import RootLayout from "./componenets/RootLayout.tsx";
import Login from "./componenets/Login.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";
import ProductList from "./componenets/ProductList.tsx";
import Register from "./componenets/Login.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route path="products" element={<ProductList />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
