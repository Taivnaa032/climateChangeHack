import instance from "@/lib/api";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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
    const type = formData.accountType == "User" ? "users" : "receivers";
    try {
      const { data } = await instance.post(`/${type}/login`, {
        email: formData.email,
        password: formData.password,
      });
      toast.success("Амжилттай нэвтэрлээ", {
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
      toast.error("Email эсвэл нууц үг буруу байна", {
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

  return (
    <AuthContext.Provider
      value={{
        login: login,
        handleChange: handleChange,
        accountOptions: accountOptions,
        formData: formData,
        userInfo: userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
