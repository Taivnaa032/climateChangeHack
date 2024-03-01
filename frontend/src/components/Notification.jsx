import instance from "@/lib/api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ItemPost } from "./post/ItemPost";

export const Notification = ({ req }) => {
  const userType = Cookies.get("type");
  const uType = userType === "users" ? "receivers" : "users";
  const [info, setInfo] = useState([]);
  console.log(req);

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const { data } = await instance.get(`/${uType}/${req.user}`);
        setInfo("user --> ", data);
        const res = await instance.get(`/items/item/${req.item}`);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotif();
  }, []);

  return (
    <div className="flex justify-around mx-5">
      <p>afds</p>
    </div>
  );
};
