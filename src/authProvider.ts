import { AuthBindings } from "@refinedev/core";

import { TOKEN_KEY, API_URL } from "./constants";
import axios, { AxiosInstance } from "axios";

export const authProvider = (axiosInstance: AxiosInstance): AuthBindings => {
    return {
        login: async ({
            user,
        }: {
            user: { email: string; password: string };
        }) => {
            try {
                const { data } = await axios.post(`${API_URL}/users/login`, {
                    user,
                });

                localStorage.setItem(TOKEN_KEY, data.user.token);

                return {
                    success: true,
                    redirectTo: "/",
                };
            } catch (error: any) {
                return {
                    success: false,
                    error,
                };
            }
        },
        logout: async (props) => {
            localStorage.removeItem(TOKEN_KEY);
            return {
                success: true,
                redirectTo: props?.redirectPath || "/login",
            };
        },
        onError: async (error: any) => {
            if (error?.response?.status === 401) {
                return {
                    redirectTo: "/register",
                    error,
                };
            }

            return {
                error,
            };
        },
        check: async () => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (!token) {
                return {
                    authenticated: false,
                    error: new Error("No token found"),
                    redirectTo: "/login",
                };
            }
            return {
                authenticated: true,
            };
        },
        getPermissions: async () => null,
        getIdentity: async () => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (!token) {
                return null;
            }

            try {
                const userInfo = await axiosInstance.get(`${API_URL}/user`);
                return userInfo.data.user;
            } catch (error) {
                console.warn(error);
                return null;
            }
        },
    };
};
