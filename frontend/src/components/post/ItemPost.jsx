import Cookies from "js-cookie";
import { useState } from "react";
import { UserIcon } from "../UserIcon";
import instance from "@/lib/api";
import toast from "react-hot-toast";

export const ItemPost = ({ itemValue, user, profile, homePost }) => {
  const userType = Cookies.get("type");
  const userId = Cookies.get("userId");
  const reversedType = userType === "users" ? "receivers" : "users";
  const message =
    userType === "users" ? ["Donate", "Sell"] : ["Request", "Buy"];

  const handleSubmit = async (id) => {
    console.log(reversedType);
    try {
      const { data } = await instance.post(
        `/${reversedType}/addRequest/${id}`,
        {
          requests: [
            {
              user: userId,
              sent: true,
              item: itemValue._id,
              free: itemValue?.free,
              count: itemValue?.count,
              weight: itemValue?.weight,
            },
            {
              user: id,
              sent: false,
            },
          ],
        }
      );
      console.log(data);
      toast.success("Successfully sent request");
    } catch (error) {
      console.error(error);
      toast.error("Error sending request");
    }
  };
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-md ">
      {!homePost && (
        <>
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
          <p className="text-base text-gray-700 mb-2">
            Location: {user?.location}
          </p>
          <div className="flex gap-x-1">
            {user?.materials?.map((el, i) => (
              <p className="text-base text-gray-700 mb-2 ml-5">{el}</p>
            ))}
          </div>
        </>
      )}
      <div>
        <p className="text-base text-gray-700 font-bold">Item:</p>
        <div className="flex flex-col">
          <div className="flex gap-5 items-center">
            <p>name: </p>
            <p className="text-lg">{itemValue?.item?.title}</p>
          </div>
          {itemValue?.count != 0 && (
            <div className="flex gap-5 items-center">
              <p>count:</p>
              <p className="text-lg">
                {itemValue?.count != 0 && itemValue?.count}
              </p>
            </div>
          )}
          {itemValue?.weight != 0 && (
            <p>weight: {itemValue?.weight != 0 && itemValue?.weight} </p>
          )}
          {itemValue?.price > 0 && (
            <p>price: {itemValue?.price != 0 && itemValue?.price}$ </p>
          )}
        </div>
        <br />
        {profile ? (
          <button
            type="button"
            className="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            End
          </button>
        ) : (
          <button
            type="button"
            className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => handleSubmit(user?._id)}
          >
            {itemValue?.free ? message[0] : message[1]}
          </button>
        )}
      </div>
    </div>
  );
};
