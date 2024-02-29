import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import instance from "@/lib/api";
import { UserIcon } from "../UserIcon";

export const RealPost = ({ user, itemName }) => {
  const userType = Cookies.get("type");
  const [price, setPrice] = useState(false);
  const message =
    userType === "users" ? ["Donate", "Sell"] : ["Request", "Buy"];

  useEffect(() => {
    const getPrice = async () => {
      try {
        const items = user.items.filter((el) => el?.item.title === itemName);
        setPrice(items?.free);
      } catch (error) {
        console.log(error);
      }
    };
    getPrice();
  }, []);

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-md w-[320px]">
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
          <p key={i} className="text-base text-gray-700 mb-2 ml-5">
            {el}
          </p>
        ))}
      </div>
      <div>
        <p className="text-base text-gray-700 font-bold">Items:</p>
        {user?.items?.map((el, i) => (
          <div key={i}>
            {el?.item?.title === itemName && (
              <>
                <p>{el?.item?.title}</p>
                {el?.count > 0 && <p>counts: {el?.count}</p>}
                {el?.weight !== 0 && <p>weight: {el?.weight}</p>}
                {el?.price !== 0 && <p>price: {el?.price}$ </p>}
              </>
            )}
          </div>
        ))}
        <br />
        <button
          type="button"
          className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {price ? message[0] : message[1]}
        </button>
      </div>
    </div>
  );
};
