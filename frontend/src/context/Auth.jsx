import instance from "@/lib/api";
import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

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

  const [auth, setAuth] = useState({ user: null, token: '' });

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("climateAuth");

    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }

  }, [auth.token]);

  return (
    <AuthContext.Provider
      value={{
        login: login,
        handleChange: handleChange,
        accountOptions: accountOptions,
        formData: formData,
        userInfo: userInfo,
        auth: auth,
        setAuth: setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
