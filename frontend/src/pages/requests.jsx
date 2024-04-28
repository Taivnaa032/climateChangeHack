import { useEffect, useState } from "react";
import instance from "@/lib/api";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import { Notification } from "@/components/Notification";
import { UserIcon } from "@/components/UserIcon";

const Requests = () => {
  const [info, setInfo] = useState(null);

  const userId = Cookie.get("userId");
  const type = Cookie.get("type");

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

  const handleSubmit = async (id) => {
    try {
      const updatedRequests = info.requests.map((request) => {
        if (request.user._id === id) {
          return {
            ...request,
            read: true,
          };
        }
        return request;
      });

      const { data } = await instance.put(`/${type}/updateRequest/${userId}`, {
        requests: updatedRequests,
      });

      setInfo((prevInfo) => ({
        ...prevInfo,
        requests: updatedRequests,
      }));

      toast.success("Successfully marked as read");
    } catch (error) {
      console.error(error);
      toast.error("Error marking as read");
    }
  };

  return (
    <div className="md:ml-52 mt-24 ml-[5%] mr-[5%] ">
      <div className="flex flex-col gap-5">
        {Array.isArray(info?.requests) &&
          info?.requests.map((request, index) => (
            <div key={index}>
              <UserIcon />
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <p>Username: {request?.user?.username}</p>
                  <p>Email: {request?.user?.email}</p>
                </div>
                <div>
                  {!request.read ? (
                    <div className="text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        fill="currentColor"
                        className="bi bi-dot"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                      </svg>
                    </div>
                  ) : (
                    <div>
                      <div className="text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          className="bi bi-check-lg"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                className="border-2"
                onClick={() => handleSubmit(request?.user?._id)}
              >
                Mark as checked
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Requests;
