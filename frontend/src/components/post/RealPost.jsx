import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import instance from "@/lib/api";
import { UserIcon } from "../UserIcon";

export const RealPost = ({ user }) => {
  const userType = Cookies.get("type");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-md ">
      <div className="flex items-center gap-3">
        {user?.image ? (
          <img
            className="w-10 h-10 rounded-full mr-2"
            src={user.image}
            alt={`${user?.username}'s profile`}
          />
        ) : (
          <UserIcon />
        )}
        <p className="text-lg font-semibold text-black">{user?.username}</p>
      </div>
      <p className="text-base text-gray-700 mb-2">
        {userType === "users" ? user?.bio : user?.purpose}
      </p>
      <p className="text-base text-gray-700 mb-2">Location: {user?.location}</p>
      <div className="flex gap-x-1">
        {user?.materials?.map((el, i) => (
          <p className="text-base text-gray-700 mb-2 ml-5">{el}</p>
        ))}
      </div>
      <div>
        <p className="text-base text-gray-700 font-bold">Items:</p>
        {showFullDescription
          ? user?.items?.map((el, i) => (
              <div key={i}>
                <p>{el?.item?.title}</p>
                {el?.count != 0 && (
                  <p>counts: {el?.count != 0 && el?.count} </p>
                )}
                {el?.weight != 0 && (
                  <p>weight: {el?.weight != 0 && el?.weight} </p>
                )}
              </div>
            ))
          : user?.items?.slice(0, 2).map((el, i) => (
              <div key={i}>
                <p>{el?.item?.title}</p>
                {el?.count != 0 && (
                  <p>counts: {el?.count != 0 && el?.count} </p>
                )}
                {el?.weight != 0 && (
                  <p>weight: {el?.weight != 0 && el?.weight} </p>
                )}
              </div>
            ))}
        {user?.items?.length > 2 && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {showFullDescription ? "See Less" : "See More"}
          </button>
        )}
        <br />
        <button
          type="button"
          className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          REQUEST
        </button>
      </div>
    </div>
  );
};
