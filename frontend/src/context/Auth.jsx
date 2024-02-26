import instance from "@/lib/api";
import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();
import Cookies from "js-cookie";

const AuthProvider = ({ children }) => {
  const router = useRouter();

  const accountOptions = ["User", "Receiver"];

  const [userInfo, setUserInfo] = useState({
    id: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    accountType: "",
  });

  const login = async () => {
    const type = formData.accountType === "User" ? "users" : "receivers";
    try {
      const { data } = await instance.post(`/${type}/login`, {
        email: formData.email,
        password: formData.password,
      });
      toast.success("Succesfully logged in", {
        duration: 2000,
        iconTheme: {
          primary: "white",
          secondary: "green",
        },
        style: {
          background: "green",
          color: "#fff",
        },
      });
      setUserInfo({
        type: data.type,
        id: data.userId,
      });
      Cookies.set("token", data.token);
      Cookies.set("userId", data.userId);
      Cookies.set("type", data.type);
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (error) {
      toast.error("Email or password is incorrect", {
        duration: 2000,
        iconTheme: {
          primary: "white",
          secondary: "#ff3333",
        },
        style: {
          background: "#ff3333",
          color: "#fff",
        },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("token");
      config.headers.token = token;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider
      value={{
        login: login,
        handleChange: handleChange,
        accountOptions: accountOptions,
        formData: formData,
        userInfo: userInfo,
        auth: auth,
        setAuth: setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
