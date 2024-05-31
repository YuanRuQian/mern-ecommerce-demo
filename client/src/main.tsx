import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./componenets/RootLayout.tsx";
import Register from "./componenets/Register.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
    errorElement: <div>404 Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootLayout>
      <RouterProvider router={router} />
    </RootLayout>
  </React.StrictMode>,
);