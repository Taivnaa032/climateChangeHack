import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useInput } from "@/hook/useInput";
import { itemsOptions } from "./data/ItemOptions";
import instance from "@/lib/api";
import { MaterialOptions } from "./data/MaterialOptions";

const ModalMaterial = ({ isOpen, onClose, children }) => {
  const userId = Cookie.get("userId");
  const type = Cookie.get("type");
  const measure = type === "users" ? "have" : "need";
  const [material, setMaterial] = useState("Plastics");
  const addMaterial = async () => {
    console.log(material);
    try {
      const { data } = await instance.post(`/${type}/addMaterial/${userId}`, {
        materials: [material],
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative z-50 bg-white p-4 max-w-md mx-auto rounded-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              X
            </button>
            {/* Modal content goes here */}
            <h1 className="text-xl font-bold mb-4">
              Add Material you {measure}
            </h1>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="items"
                  className="block text-sm font-semibold text-[#7bbcb6]"
                >
                  Materials:
                </label>
                <div class="relative inline-block w-64">
                  <select
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={material}
                    onChange={(event) => setMaterial(event.target.value)}
                  >
                    {MaterialOptions.map((material, i) => (
                      <option key={i}>{material}</option>
                    ))}
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                onClick={addMaterial}
                className="bg-green-600 py-1 px-7 rounded-2xl text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalMaterial;
