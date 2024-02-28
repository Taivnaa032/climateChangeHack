import React, { useState, useEffect } from "react";
import PostReceiver from "../components/post/postReceiver";
import instance from "@/lib/api";
import Cookie from "js-cookie";
import PostUser from "@/components/post/postUser";
import algoliasearch from "algoliasearch";

const client = algoliasearch("8F370138HD", "50cc35cd9d0d70834d9d9e4dbaa6c335");
const index = client.initIndex("items");

import Modal from "../components/modal";

// Add the Modal component here

const Profile = () => {
  const userId = Cookie.get("userId");
  const type = Cookie.get("type");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (!userId || !type) {
          console.error("UserId or type is undefined.");
          return;
        }

        const { data } = await instance.get(`/${type}/${userId}`);
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };

    getUserInfo();
  }, [userId, type]); // Include userId and type as dependencies

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(user);

  return (
    <div className="md:ml-52 mt-24 ml-[5%] mr-[5%] flex flex-col  md:flex-row gap-10">
      <div className="bg-slate-200 w-full md:w-1/3 flex  flex-col items-center rounded gap-4 break-words p-10 ">
        <div className="border-b-2 flex flex-col items-center border-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="126"
            height="126"
            fill="currentColor"
            className="bi bi-person-circle mt-10"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>

          <p className="text-2xl font-semibold">{user?.username}</p>
          <p className="text-slate-500 text-center">{user?.bio}</p>
        </div>
      </div>
      <div className="w-1/4 bg-slate-300 rounded flex flex-col">
        <div className="w-full grid grid-cols-1 items-center">
          Posts
          {type === "users" ? <PostUser /> : <PostReceiver />}
        </div>
      </div>

      <div className="w-1/4 rounded flex flex-col">
        <div className="w-full grid grid-cols-1 items-center">
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            Open Modal
          </button>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
