import { useEffect, useState } from "react";
import Post from "./postReceiver";
import instance from "@/lib/api";
import { useAuth } from "@/context/Auth";

const Profile = () => {
  const { userInfo } = useAuth();
  const [user, setUser] = useState();
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await instance.get(`/${userInfo.type}/${userInfo.id}`);
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserInfo();
  }, []);
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
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>

          <p className="text-2xl font-semibold">Munkhtenger</p>
          <p className="text-slate-500 text-center">
            I'm willing to help people who are trying to make this world green
            place
          </p>
        </div>
      </div>
      <div className="w-2/3 bg-slate-300 rounded flex flex-row">
        <div className="w-full grid grid-cols-1 items-center">
          Posts
          <Post />
        </div>
      </div>
    </div>
  );
};

export default Profile;
