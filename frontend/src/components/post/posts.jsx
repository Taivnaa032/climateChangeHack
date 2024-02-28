import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import instance from "@/lib/api";

const Posts = () => {
    const [data, setData] = useState([]);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const userType = Cookies.get("type");

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let endpoint;
                if (userType === "users") {
                    endpoint = "/receivers/all";
                } else if (userType === "receivers") {
                    endpoint = "/users/all";
                }

                const response = await instance.get(endpoint);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, [userType]);

    console.log("data:", data);

    return (
        <div className="grid grid-cols-3 gap-5">
            {Array.isArray(data) &&
                data.map((user, index) => (
                    <div key={index} className="flex flex-col bg-white p-4 rounded-lg shadow-md ">
                        <div className="flex items-center mb-4">
                            <img
                                className="w-10 h-10 rounded-full mr-2"
                                src={user.Image}
                                alt={`${user?.username}'s profile`}
                            />
                            <p className="text-lg font-semibold text-black">{user?.username}</p>
                        </div>
                        <p className="text-base text-gray-700 mb-2">
                            {user?.bio}
                        </p>
                        <p className="text-base text-gray-700 mb-2">Location: {user?.location}</p>
                        <div className="flex gap-x-1">

                            {
                                user?.materials?.map((el, i) => (
                                    <p className="text-base text-gray-700 mb-2 ml-5">{el}</p>
                                ))
                            }
                        </div>
                        <div>
                            <p className="text-base text-gray-700 font-bold">Items:</p>
                            {showFullDescription
                                ? user?.items?.map((el, i) => (
                                    <div key={i}>
                                        <p>{el?.item?.title}</p>
                                        {(el?.count != 0) && (<p>counts: {(el?.count != 0) && (el?.count)} </p>)}
                                        {(el?.weight != 0) && (<p>weight: {(el?.weight != 0) && (el?.weight)} </p>)}
                                    </div>
                                ))
                                : user?.items?.slice(0, 2).map((el, i) => (
                                    <div key={i}>
                                        <p>{el?.item?.title}</p>
                                        {(el?.count != 0) && (<p>counts: {(el?.count != 0) && (el?.count)} </p>)}
                                        {(el?.weight != 0) && (<p>weight: {(el?.weight != 0) && (el?.weight)} </p>)}
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
                            <button type="button" className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">REQUEST</button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Posts;
