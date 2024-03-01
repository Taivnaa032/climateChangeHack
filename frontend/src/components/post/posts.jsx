import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import instance from "@/lib/api";
import toast from "react-hot-toast";
import { UserIcon } from "../UserIcon";
import { ItemPost } from "./ItemPost";

const Posts = () => {
  const [data, setData] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const userType = Cookies.get("type");
  const userId = Cookies.get("userId");
  const reversedType = userType === "users" ? "receivers" : "users";

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let endpoint;
        if (userType === "users") {
          endpoint = "/receivers/all";
        } else if (userType === "receivers") {
          endpoint = "/users/all";
        }
        const response = await instance.get(endpoint);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="grid grid-cols-3 gap-5 mb-10">
          {data
            .filter((el) => el.items.length > 0)
            .map((user, index) => (
              <div
                key={index}
                className="flex flex-col bg-white p-4 rounded-lg shadow-md gap-3"
              >
                <div className="flex gap-5">
                  <UserIcon image={user.image} username={user.username} />
                  <p className="text-lg font-semibold">{user.username}</p>
                  <p className="text-lg">{user.email}</p>
                </div>
                <p className="text-base text-gray-700 mb-2">{user.bio}</p>
                <p className="text-base text-gray-700 mb-2">
                  Location: {user.location}
                </p>
                <div className="flex gap-x-1">
                  <p>Materials: </p>
                  {user.materials.map((material, i) => (
                    <p key={i} className="text-base text-gray-700 mb-2 ml-5">
                      {material}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-10">
                  <p className="text-base text-gray-700 font-bold">Items:</p>
                  {showFullDescription
                    ? user.items.map((el, i) => (
                        <ItemPost
                          key={i}
                          itemValue={el}
                          user={user}
                          profile={false}
                          homePost={true}
                        />
                      ))
                    : user.items
                        .slice(0, 2)
                        .map((el, i) => (
                          <ItemPost
                            key={i}
                            itemValue={el}
                            user={user}
                            profile={false}
                            homePost={true}
                          />
                        ))}
                  {user.items.length > 2 && (
                    <button
                      onClick={toggleDescription}
                      className="text-blue-500 hover:underline cursor-pointer"
                    >
                      {showFullDescription ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full"></div>
      )}
    </>
  );
};

export default Posts;
