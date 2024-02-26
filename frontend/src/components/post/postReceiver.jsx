import { useState } from "react";
import ProgressBar from "./progressBarReceiver";
import { UserIcon } from "../UserIcon";

const PostReceiver = () => {
  const initialCaption =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda libero numquam ut inventore, voluptatem nobis nostrum officiis vero ";
  const maxLength = 100;

  const [caption, setCaption] = useState(initialCaption.slice(0, maxLength));
  return (
    <div className="bg-slate-200 rounded mt-10 w-full gap-2 flex flex-col p-3">
      <div className="flex flex-row items-center gap-2">
        <UserIcon />
        <p className=""> Receiver</p>
      </div>
      <div className="">
        <p>Caption: {caption}</p>
      </div>
      <ProgressBar />
      <button className="bg-green-500 w-1/4 rounded text-white">Sell</button>
    </div>
  );
};

export default PostReceiver;
