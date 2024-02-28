import instance from "@/lib/api";
import Cookie from "js-cookie";
import { useState } from "react";
import ModalMaterial from "./ModalMaterial";

export const MaterialAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = Cookie.get("userId");
  const type = Cookie.get("type");
  return (
    <>
      <button
        className="bg-green-600 text-white py-1 px-5 rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        Add
      </button>
      <ModalMaterial
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
