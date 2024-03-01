import { useEffect, useState } from "react";
import instance from "@/lib/api";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import { Notification } from "@/components/Notification";

const Requests = () => {
  const [info, setInfo] = useState(null);

  const userId = Cookie.get("userId");
  const type = Cookie.get("type");

  const handleSubmit = async (id) => {
    console.log(id);
    try {
      const requestBody = {
        got: false,
        gave: false,
      };

      if (type === "users") {
        requestBody.got = true;
      }

      if (type === "receivers") {
        requestBody.gave = true;
      }

      await instance.put(`/${type}/${id}`, {
        requests: [requestBody],
      });
      toast.success("Successfully submitted");
    } catch (error) {
      console.error(error);
      toast.error("Error sending request");
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await instance.get(`/${type}/${userId}`);
        setInfo(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getUserInfo();
  }, [userId, type]);

  return (
    <div className="md:ml-52 mt-24 ml-[5%] mr-[5%] ">
      <div className="flex flex-col gap-5">
        {Array.isArray(info?.requests) &&
          info?.requests?.map((req, i) => <Notification req={req} key={i} />)}
      </div>
    </div>
  );
};

export default Requests;
