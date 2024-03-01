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

    return (
        <div className="md:ml-52 mt-24 ml-[5%] mr-[5%] ">
            <div className="flex flex-col gap-5">
                <div className='md:ml-52 mt-24 ml-[5%] mr-[5%] '>
                    {Array.isArray(info?.requests) && info?.requests.map((request, index) => (
                        <div key={index}>

                            <UserIcon />
                            <p>Username: {request?.user?.username}</p>
                            <p>Email: {request?.user?.email}</p>



                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default Requests;
