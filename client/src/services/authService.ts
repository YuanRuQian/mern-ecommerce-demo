import axios from "axios";

const API_URL = "http://localhost:5050/api/auth/";

const login = (email: string, password: string) => {
    return axios
        .post(`${API_URL}signin`, { email, password })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const register = (username: string, email: string, password: string) => {
    return axios
        .post(API_URL + "signup", {
            username,
            email,
            password
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const AuthService = {
    login,
    logout,
    register
};

export default AuthService;
