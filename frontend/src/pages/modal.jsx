import React, { useState, useEffect } from "react";
import instance from "@/lib/api";
import Cookie from "js-cookie";

const Modal = ({ isOpen, onClose, children }) => {


    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const userId = Cookie.get("userId");
    const type = Cookie.get("type");
    const [user, setUser] = useState();
    const [data, setData] = useState([])

    const [formData, setFormData] = useState({
        materials: [],
        location: "",
        items: [],
        bio: "",
        purpose: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            instance.post((`/${type}/addItems/${userId}`), {
                items: formData.items
            });

        } catch (error) {
            console.error("Error during adding item:", error);
        }
    };




    // State for managing modal
    const [isModalOpen, setIsModalOpen] = useState(false);


    // useEffect(() => {
    //   instance.get(`/items/all`)
    //     .then(res => {
    //       setData(res.data);
    //     })
    //     .catch(err => console.log(err))
    // }, [])

    const itemsOptions = [
        "Food containers & lids",
        "Bottles",
        "Plant pots",
        "Pill bottles ",
        "Boxes & Cartons",
        "Paper&Plastic cups",
        "Newspaper & Damaged books",
        "Flattened Cardboards ",
        "Aluminum & Metal cans",
        "Foll & Foll trays",
        "Lids",
        "Electronics",
        "Aerosol spray cans (must be empty)",
        "Jars",
        "Jugs",
        "Backpack",
        "Fishing nets",
        "Carpets",
        "Wool",
        "Cotton",
        "Wood pulp fiber"
    ]


    const filteredItems = itemsOptions.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSuggestionClick = (value) => {
        setSearchTerm(value);
        setSuggestions([]);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        // Update suggestions based on the search term
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
                                    <div className="relative">
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
                                            <ul className="absolute top-10 h-96 overflow-scroll left-0 z-10 bg-white border border-gray-300 rounded w-full">
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
                                    </div>
                                </div>
                                <button type="submit">ADD</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal