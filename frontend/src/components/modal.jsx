import React, { useState, useEffect } from "react";
import instance from "@/lib/api";
import Cookie from "js-cookie";
import { useInput } from "@/hook/useInput";
import { itemsOptions } from "./data/ItemOptions";

const Modal = ({ isOpen, onClose, children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weight, weightBind] = useInput();
  const [count, countBind] = useInput();

  const userId = Cookie.get("userId");
  const type = Cookie.get("type");

  const measure = type === "users" ? "have" : "want";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.get(`/items/title/${searchTerm}`);

      const result = await instance.post(`/${type}/addItems/${userId}`, {
        items: [
          {
            item: data._id,
            weight,
            count,
          },
        ],
      });

      console.log(result);
    } catch (error) {
      console.error("Error during adding item:", error);
    }
  };

  const handleSuggestionClick = (value) => {
    setSearchTerm(value);
    setSuggestions([]);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSuggestions(
      itemsOptions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      )
    );
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
            <div>
              {/* Modal content goes here */}
              <h1 className="text-xl font-bold mb-4">Add Item</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="items"
                    className="block text-sm font-semibold text-[#7bbcb6]"
                  >
                    Items:
                  </label>
                  <div className="flex flex-col gap-5">
                    <input
                      type="text"
                      name="items"
                      required
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="form-control border-solid border-2"
                      placeholder="Search items..."
                    />
                    {suggestions.length > 0 && (
                      <ul className="absolute top-10 left-0 z-10 bg-white border border-gray-300 rounded w-full">
                        {suggestions.map((suggestion) => (
                          <li
                            key={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="cursor-pointer p-2 hover:bg-gray-200"
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}

                    <input
                      type="text"
                      {...countBind}
                      className="form-control border-solid border-2"
                      placeholder={`How many ${searchTerm} you ${measure}`}
                    />
                    <input
                      type="text"
                      {...weightBind}
                      className="form-control border-solid border-2"
                      placeholder={`How much ${searchTerm} you ${measure}`}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-green-600 py-1 px-7 rounded-2xl text-white"
                >
                  ADD
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
