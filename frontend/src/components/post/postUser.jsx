import { useState } from "react";
import ProgressBarUser from "./progressBarUser";
import { UserIcon } from "../UserIcon";

const PostUser = () => {
  const initialCaption =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda libero numquam ut inventore, voluptatem nobis nostrum officiis vero ";
  const maxLength = 100;

  const [caption, setCaption] = useState(initialCaption.slice(0, maxLength));
  return (
    <div className="bg-slate-200 rounded w-full gap-2 flex flex-col p-3 ">
      <div className="flex flex-row items-center gap-2">
        <UserIcon />
        <p className=""> User</p>
      </div>
      <div className="">
        <p>Caption: {caption}</p>
      </div>
      <ProgressBarUser />
      <button className="bg-green-600 text-white py-1 px-5 rounded-lg">
        Request
      </button>
    </div>
  );
};

export default PostUser;
