import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://todo-sync-google-calender.onrender.com/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.status == "success") {
        console.log(response.data);
        toast.success("Login successfully done");
        navigate("/verify-otp");
      }
    } catch (error) {
      toast.error("Incorrect email or password");
      console.log(error.response);
      console.log(error.status);
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  }
  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-dvh">
      <form className="w-xs" onSubmit={handleSubmit}>
        <h2 className="text-lg text-center mb-4 uppercase font-medium tracking-wide text-gray-500 font-openSans">
          login to your account
        </h2>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block font-openSans text-gray-500 text-base font-normal mb-1"
          >
            Email
          </label>
          <input
            className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block font-openSans text-gray-500 text-base font-normal mb-1"
          >
            Password
          </label>
          <input
            className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
            type="password"
            id="password"
            name="password"
            minLength={8}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="font-openSans px-3 py-1.5 rounded-sm bg-cyan-500 cursor-pointer text-gray-600 text-base font-medium tracking-wide mb-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
