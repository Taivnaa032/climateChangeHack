import PostReceiver from "@/components/post/postReceiver";
import PostUser from "@/components/post/postUser";
import { Material } from "@/components/Material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import instance from "@/lib/api";

const Home = () => {
  const materials = [
    "65d9cbae52894d7eae492384",
    "65d9cc2352894d7eae492385",
    "65d9cc3d52894d7eae492386",
    "65d9cc6852894d7eae492387",
    "65d9cc8352894d7eae492388",
  ];

  const [type, setType] = useState();
  const userType = Cookies.get("type");

  useEffect(() => {
    // const showPosts = async () => {
    //   try {
    //     if (type === "users") {
    //       setType("receivers");
    //     } else {
    //       setType("users");
    //     }
    //     const { data } = await instance.get();
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };
    if (userType === "users") {
      setType("receivers");
    } else {
      setType("users");
    }
  }, []);

  console.log(type);
  return (
    <div className="md:ml-52 mt-24 ml-[5%] mr-[5%] ">
      <h1 className="text-center text-2xl text-white font-semibold">
        Recyclable Materials
      </h1>
      <div className="flex flex-col justify-evenly bg-slate-200 mt-5 md:flex-row">
        {materials.map((el, i) => (
          <Material type={el} key={i} userType={type} />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-5">
        <PostReceiver />
        <PostUser />
      </div>
    </div>
  );
};

export default Home;