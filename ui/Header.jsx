import React from "react";
import { Link } from "react-router-dom";

function Header() {
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
        </nav>
      </div>
    </header>
  );
}

export default Header;
