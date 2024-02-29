import React, { useState, useEffect } from "react";
import PostReceiver from "../components/post/postReceiver";
import instance from "@/lib/api";
import Cookie from "js-cookie";
import PostUser from "@/components/post/postUser";
import algoliasearch from "algoliasearch";
import FileBase from "react-file-base64";
import Modal from "../components/modal";
import toast from "react-hot-toast";

const client = algoliasearch("8F370138HD", "50cc35cd9d0d70834d9d9e4dbaa6c335");
const index = client.initIndex("items");

import { MaterialAdd } from "@/components/MaterialAdd";
import { useAuth } from "@/context/Auth";
import { RealPost } from "@/components/post/RealPost";
import { ItemPost } from "@/components/post/ItemPost";

const Profile = () => {
  const { signOut } = useAuth();
  const userId = Cookie.get("userId");
  const type = Cookie.get("type");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    image: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const measure = type === "users" ? "have" : "need";

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    try {
      await instance.put(`/${type}/${userId}`, formData);
      toast.success("Sucessfully added profile picture");
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add profile picture");
    }
  };

  console.log();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (!userId || !type) {
          console.error("UserId or type is undefined.");
          return;
        }

        const { data } = await instance.get(`/${type}/${userId}`);
        console.log("data", data);
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };

    getUserInfo();
  }, [userId, type]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="md:ml-52 mt-24 ml-[5%] mr-[5%] flex flex-col  md:flex-row gap-10 items-center md:items-start ">
      <div className="bg-slate-200 w-full md:w-1/3 flex  flex-col items-center rounded gap-4 break-words p-10 ">
        <div className="border-b-2 flex flex-col items-center border-slate-400">
          <form onSubmit={handleSubmit}>
            <FileBase
              required
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, image: base64 })
              }
            />
            <button type="submit">add</button>
          </form>
          <img className="w-40 h-56" src={user?.image} alt="Cover" />
          <p className="text-2xl font-semibold">{user?.username}</p>
          <p className="text-slate-500 text-center">{user?.bio}</p>
        </div>
        <p className="">Materials you {measure}: </p>
        {user?.materials?.map((el) => (
          <p className="text-lg text-black" key={el}>
            {el}
          </p>
        ))}

        <MaterialAdd />
      </div>
      <div className="w-1/4  rounded flex flex-col gap-5">
        <p className="text-2xl">Items you {measure}</p>
        <div className="w-full grid grid-cols-1 items-center gap-5">
          {user?.items?.map((item, i) => (
            <ItemPost itemValue={item} key={i} user={user} profile={true} />
          ))}
        </div>
      </div>

      <div className="w-1/4 rounded flex flex-col">
        <div className="w-full grid grid-cols-1 items-center">
          <button
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
            onClick={() => setIsModalOpen(true)}
          >
            Add Item
          </button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Profile;
