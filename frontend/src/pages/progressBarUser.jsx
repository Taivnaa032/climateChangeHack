import { useState } from "react";

const initialState = {
    goal: "",
    reach: "" // Set 0 as the default value
};

const ProgressBar = () => {
    const [formData, setFormData] = useState(initialState);
    const maxReachValue = 100; // Set your desired maximum reach value

    const handleChange = (e) => {
        const { name, value } = e.target;

        let parsedValue = Number(value);

        if (name === "reach") {
            // Ensure reach is within a valid range
            parsedValue = Math.min(Math.max(parsedValue, 0), maxReachValue);
        }

        setFormData({
            ...formData,
            [name]: parsedValue
        });
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full h-3 mt-2 bg-gray-50 rounded-lg">
                <div className="bg-blue-600 text-2xl h-full font-medium text-blue-100 text-center p-0.5 leading-none rounded-full " style={{ width: `${formData.reach}%` }}></div>
            </div>

            {/* <input
                name="reach"
                type="number"
                placeholder=""
                className="form-control w-2/5 border-solid border-2 mt-4"
                value={formData.reach}
                onChange={handleChange}
                max={maxReachValue} // Set the maximum value for the input
            /> */}

        </div>
    );
}

export default ProgressBar;
