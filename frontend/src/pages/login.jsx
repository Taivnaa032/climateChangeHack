import { useState } from "react";
import { useRouter } from "next/router";
import instance from "@/lib/api";
import { useAuth } from "@/context/Auth";

const LogIn = () => {
  const { login, formData, handleChange, accountOptions } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
    router.push("/")
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/watercolor-oil-painting-background_52683-106439.jpg")',
      }}
    >
      <div className="flex flex-col md:flex-row w-2/3 h-[100%] rounded-lg bg-slate-200  shadow-2xl">
        <div className="bg-white p-8 rounded-bl-lg rounded-tl-lg md:w-1/3">
          <h2 className="text-3xl font-bold text-[#387f75] mb-6 font-mono">
            Log In
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
            <div className="mb-4"></div>

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

            <button
              type="submit"
              className="bg-gradient-to-r from-[#387f75] to-[#7bbcb6] text-white p-3 rounded-full focus:outline-none focus:ring focus:border-teal-300"
            >
              Log In
            </button>
          </form>
          <p className="mt-3">
            Don't have an account?{" "}
            <button
              className="font-bold"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </button>
          </p>
        </div>
        <div
          className="flex items-center justify-center bg-cover bg-center p-10 md:w-2/3"
          style={{
            backgroundImage:
              'url("https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752")',
          }}
        >
          <p className="font-semifold font-mono text-3xl text-white">
            {" "}
            Embark on a journey towards a sustainable and eco-friendly future by
            joining our community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
