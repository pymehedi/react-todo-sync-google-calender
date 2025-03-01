import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyPassKey() {
  const navigate = useNavigate();
  const [passkey, setPasskey] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://todo-sync-google-calender.onrender.com/verify-2fa",
        {
          passkey: passkey,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.status == "success") {
        console.log(response.data);
        navigate("/app");
      }
    } catch (error) {
      console.error(error);
      console.log(error.message);
    } finally {
      setPasskey("");
    }
  }
  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-dvh">
      <form className="w-xs" onSubmit={handleSubmit}>
        <h2 className="text-lg text-center mb-4 uppercase font-medium tracking-wide text-gray-500 font-openSans">
          verify your passkey
        </h2>
        <div className="mb-4">
          <label
            htmlFor="passkey"
            className="block font-openSans text-gray-500 text-base font-normal mb-1"
          >
            Passkey
          </label>
          <input
            onChange={(e) => setPasskey(e.target.value)}
            type="text"
            value={passkey}
            name="passkey"
            id="passkey"
            maxLength="6"
            pattern="\d*"
            required
            className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
          />
        </div>

        <button
          type="submit"
          className="font-openSans px-3 py-1.5 rounded-sm bg-cyan-500 cursor-pointer text-gray-600 text-base font-medium tracking-wide mb-2"
        >
          Verify Passkey
        </button>
      </form>
    </div>
  );
}

export default VerifyPassKey;
