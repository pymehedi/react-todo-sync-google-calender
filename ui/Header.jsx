import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Header() {
  async function handleLogout() {
    try {
      const response = await axios.get(
        "https://todo-sync-google-calender.onrender.com/logout",
        {
          withCredentials: true,
        }
      );
      if (response.data.status == "success") {
        toast.success("Successfully logout");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="bg-gray-100 border-b border-b-gray-200">
      <div className="flex justify-between items-baseline max-w-[1140px] mx-auto py-4">
        <Link to="/" className="font-openSans font-medium text-xl">
          <span className="text-cyan-500">React</span>|
          <span className="text-yellow-500">Todo</span>
        </Link>

        <nav className="flex gap-6">
          <Link
            to="settings"
            className="hover:text-cyan-500 font-openSans font-normal text-base text-gray-400
          tracking-wide hover:bg-gray-100 px-2 py-1 rounded-sm"
          >
            Settings
          </Link>
          <Link
            to="todo"
            className="hover:text-cyan-500 font-openSans font-normal text-base text-gray-400
          tracking-wide hover:bg-gray-100 px-2 py-1 rounded-sm"
          >
            To-Dos
          </Link>
          <Link
            to="dashboard"
            className="hover:text-cyan-500 font-openSans text-base text-gray-400
          tracking-wide hover:bg-gray-100 px-2 py-1 rounded-sm"
          >
            Dashboard
          </Link>
          <Link
            to="/"
            onClick={handleLogout}
            className="hover:text-cyan-500 font-openSans text-base text-gray-400
          tracking-wide hover:bg-gray-100 px-2 py-1 rounded-sm"
          >
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
