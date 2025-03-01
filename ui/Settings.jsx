import React from "react";

function Settings() {
  function handleSubmit() {
    window.open(
      "https://todo-sync-google-calender.onrender.com/auth/google",
      "_blank"
    );
  }
  return (
    <div className="bg-gray-50 h-full flex justify-center items-center flex-col gap-2">
      <button
        onClick={handleSubmit}
        className="flex items-center justify-center gap-2 bg-white text-gray-600 border border-gray-100 px-4 py-2 rounded-sm hover:bg-cyan-50 focus:outline-none transition font-openSans cursor-pointer shadow-2xs tracking-wide text-base font-medium"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google Logo"
          className="w-5 h-5"
        />
        <span>Connect Google Account</span>
      </button>
      <p className="font-openSans text-gray-400 font-normal text-sm">
        Sync your task with your account
      </p>
    </div>
  );
}

export default Settings;
