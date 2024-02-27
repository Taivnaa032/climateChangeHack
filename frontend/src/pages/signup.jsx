import instance from "@/lib/api";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    accountType: "",
    username: "",
    email: "",
    password: "",
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
      const type = formData.accountType === "User" ? "users" : "receivers";
      const { data } = await instance.post(`/${type}/create`, {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        materials: formData.materials,
        location: formData.location,
        items: formData.items,
        bio: formData.bio,
        purpose: formData.purpose,
      });
      console.log("data =====> ", data);
        if (data) {
          const token = data.token;
        localStorage.setItem("climateAuth", JSON.stringify({ data, token }));
        console.log("Data saved to localStorage:", { data, token });

        toast.success("Successfully registered and logged in", {
          duration: 2000,
          iconTheme: {
            primary: "white",
            secondary: "green",
          },
          style: {
            background: "green",
            color: "#fff",
          },
        });

        router.push("/");
      } else {
        console.error("Token not received in the response");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  const accountOptions = ["User", "Receiver"];

  console.log(formData);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-10"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/watercolor-oil-painting-background_52683-106439.jpg")',
      }}
    >
      <div className="flex flex-row w-1/2 h-[100%]">
        <div className="bg-white p-8 rounded-bl-lg rounded-tl-lg w-full mt-16">
          <h2 className="text-3xl font-bold text-[#387f75] mb-6 font-mono">
            Sign Up
          </h2>
          <select
            name="accountType"
            required
            className="form-control border-solid border-2"
            value={formData.accountType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a Account Type
            </option>
            {accountOptions.map((account) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </select>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-[#7bbcb6]"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 p-3 w-full border-2 border-teal-400 rounded focus:outline-none focus:border-teal-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#7bbcb6]"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-3 w-full border-2 border-teal-400 rounded focus:outline-none focus:border-teal-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#7bbcb6]"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-3 w-full border-2 border-teal-400 rounded focus:outline-none focus:border-teal-600"
                required
              />
            </div>

            {formData.accountType === "User" && (
              <div className="mb-4">
                <label
                  htmlFor="bio"
                  className="block text-sm font-semibold text-[#7bbcb6]"
                >
                  Bio:
                </label>
                <input
                  type="text"
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="mt-1 p-3 w-full border-2 border-teal-400 rounded focus:outline-none focus:border-teal-600"
                />
              </div>
            )}

            {formData.accountType === "Receiver" && (
              <div className="mb-4">
                <label
                  htmlFor="purpose"
                  className="block text-sm font-semibold text-[#7bbcb6]"
                >
                  Purpose:
                </label>
                <input
                  type="text"
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="mt-1 p-3 w-full border-2 border-teal-400 rounded focus:outline-none focus:border-teal-600"
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="materials"
                className="block text-sm font-semibold text-[#7bbcb6]"
              >
                Materials:
              </label>
              <input
                type="text"
                id="materials"
                name="materials"
                value={formData.materials}
                onChange={handleChange}
                className="mt-1 p-3 w-full border-2 border-teal-400 rounded focus:outline-none focus:border-teal-600"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="items"
                className="block text-sm font-semibold text-[#7bbcb6]"
              >
                Items:
              </label>
              <input
                type="text"
                id="items"
                name="items"
                value={formData.items}
                onChange={handleChange}
                className="mt-1 p-3 w-full border-2 border-teal-400 rounded focus:outline-none focus:border-teal-600"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-[#7bbcb6]"
              >
                Location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 p-3 w-full border-2 border-teal-400 rounded focus:outline-none focus:border-teal-600"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#387f75] to-[#7bbcb6] text-white p-3 rounded-full focus:outline-none focus:ring focus:border-teal-300"
            >
              Sign Up
            </button>
            <p className="mt-3">
              Already have an account?{" "}
              <button
                className="font-bold"
                onClick={() => router.push("/login")}
              >
                Log In
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
