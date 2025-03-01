import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://todo-sync-google-calender.onrender.com/verify-otp",
        {
          otp: otp,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        console.log(response.data);
        navigate("/verify-2fa");
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      navigate("/login");
    } finally {
      setOtp("");
    }
  }
  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-dvh">
      <form className="w-xs" onSubmit={handleSubmit}>
        <h2 className="text-lg text-center mb-4 uppercase font-medium tracking-wide text-gray-500 font-openSans">
          verify your otp
        </h2>
        <div className="mb-4">
          <label
            htmlFor="otp"
            className="block font-openSans text-gray-500 text-base font-normal mb-1"
          >
            OTP
          </label>
          <input
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            name="otp"
            required
            value={otp}
            id="otp"
            maxLength="6"
            pattern="\d*"
            className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
          />
        </div>

        <button
          type="submit"
          className="font-openSans px-3 py-1.5 rounded-sm bg-cyan-500 cursor-pointer text-gray-600 text-base font-medium tracking-wide mb-2"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default VerifyOtp;
