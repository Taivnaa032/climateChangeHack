import { useEffect, useState } from 'react';
import instance from "@/lib/api";
import Cookie from "js-cookie";
import toast from 'react-hot-toast';

const Requests = () => {
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);
    const userId = Cookie.get("userId");
    const type = Cookie.get("type");

    const reversedType = type === "users" ? "receivers" : "users";



    const handleSubmit = async (id) => {
        console.log(id)
        try {

            const requestBody = {
                got: false, gave: false
            }

            if (type === "users") {
                requestBody.got = true;
            }

            if (type === "receivers") {
                requestBody.gave = true;
            }

            const { data } = await instance.put(`/${type}/${id}`, {
                requests: [requestBody]
            });
            console.log(data);
            toast.success("Successfully sent request");
        } catch (error) {
            console.error(error);
            toast.error("Error sending request");
        }
    };

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await instance.get(`/${type}/${userId}`);
                const userData = response.data;
                console.log("userData", userData);
                setUserData(userData);
                setUser(userData);
            } catch (error) {
                console.error(error.message);
            }
        };

        getUserInfo();
    }, [userId, type]);
    console.log("user", user);

    return (
        <div className='md:ml-52 mt-24 ml-[5%] mr-[5%] '>
            {Array.isArray(user?.requests) && user?.requests.map((request, index) => (
                <div key={index}>
                    <img
                        className="w-10 h-10 rounded-full mr-2"
                        src={request?.user?.image}
                        alt={`${request?.user?.username}'s profile`}
                    />
                    <p>Username: {request?.user?.username}</p>
                    <p>Email: {request?.user?.email}</p>

                    {(type === "receivers") && (
                        <div>
                            <p>did you take the item(s)?</p>

                            <button onClick={() => handleSubmit(request?.user?._id)}>YES</button>
                        </div>
                    )}


                    {(type === "users") && (
                        <div>
                            <p>did you give the item(s)?</p>
                            <button onClick={() => handleSubmit(request?.user?._id)}>YES</button>
                        </div>
                    )}


                </div>
            ))}
        </div>
    );

}

export default Requests  
