import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./componenets/RootLayout.tsx";
import Login from "./componenets/Login.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <div>404 Not Found</div>
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RootLayout>
                <RouterProvider router={router} />
            </RootLayout>
        </Provider>
    </React.StrictMode>
);
