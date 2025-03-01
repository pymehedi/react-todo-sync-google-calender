import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [imageQr, setImageQr] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.log("password dont mathc");
      return;
    }
    try {
      const response = await axios.post(
        "https://todo-sync-google-calender.onrender.com/register",
        {
          email,
          password,
          passwordConfirm,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        toast.success("User created successfully");
        setImageQr(response.data.data.qrCode);
        console.log(response.data.data.qrCode);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error.message);
      console.log(error);
    } finally {
      // Clear the form fields after submitting
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    }
  }

  return (
    <div className="relative">
      <div className="flex justify-center items-center bg-gray-50 min-h-dvh">
        <form className="w-xs" onSubmit={handleSubmit}>
          <h2 className="text-lg text-center mb-4 uppercase font-medium tracking-wide text-gray-500 font-openSans">
            register your account
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
              value={email}
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block font-openSans text-gray-500 text-base font-normal mb-1"
            >
              Password
            </label>
            <input
              className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
              type="password"
              value={password}
              id="password"
              name="password"
              minLength={8}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="passwordConfirm"
              className="block font-openSans text-gray-500 text-base font-normal mb-1"
            >
              Confirm Password
            </label>
            <input
              className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
              type="password"
              value={passwordConfirm}
              id="passwordConfirm"
              name="passwordConfirm"
              minLength={8}
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-baseline">
            <button
              type="submit"
              className="font-openSans px-3 py-1.5 rounded-sm bg-cyan-500 cursor-pointer text-gray-600 text-base font-medium tracking-wide mb-2"
            >
              Register
            </button>
            <p className="font-openSans text-xs font-normal text-gray-300 text-center">
              Already registered please{" "}
              <Link
                to="/login"
                className="inline-flex justify-center items-baseline text-cyan-400 font-medium"
              >
                login <FiArrowUpRight />
              </Link>{" "}
              here!
            </p>
          </div>
        </form>
      </div>

      {imageQr && (
        <div className="absolute inset-0 bg-gray-50 flex justify-center items-center">
          <div className="max-w-[300px]">
            <img src={imageQr} alt="QR Code" />
            <p className="font-openSans text-base font-normal text-gray-600 mb-2">
              Please scan this QR code using google auth or any{" "}
              <Link
                to="/login"
                className="font-openSans text-cyan-500 underline cursor-pointer"
              >
                login
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
