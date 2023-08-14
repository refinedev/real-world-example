import { Authenticated, ErrorComponent, HttpError, Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import { HashRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";

import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";

import { Layout } from "./components";
import { LoginPage, RegisterPage } from "./pages/auth";
import { HomePage } from "./pages/home";
import { ProfilePage } from "./pages/profile";
import { SettingsPage } from "./pages/settings";
import { EditorPage, EditArticlePage } from "./pages/editor";
import { ArticlePage } from "./pages/article";

import { TOKEN_KEY } from "./constants";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    if (request.headers) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      request.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
      return response;
  },
  (error) => {
      const customError: HttpError = {
        ...error,
        errors: error.response?.data?.errors,
        message: error.response?.data?.message,
        statusCode: error.response?.status,
      };

      return Promise.reject(customError);
  },
);

export { axiosInstance };

function App() {
  return (
    <HashRouter>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(axiosInstance)}
        authProvider={authProvider(axiosInstance)}
      >
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route index element={<HomePage />} />

            <Route path="editor" element={<EditorPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="article/:slug" element={<ArticlePage />} />
            <Route path="profile/:username" element={<ProfilePage />} />
            <Route path="profile/:username/:page" element={<ProfilePage />} />
            <Route path="editor/:slug" element={<EditArticlePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
      </Refine>
    </HashRouter>
  );
}

export default App;
