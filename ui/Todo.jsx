import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(title, description, status, priority, dueDate);

    try {
      const response = await axios.post(
        "https://todo-sync-google-calender.onrender.com/task",
        {
          title,
          description,
          status,
          priority,
          dueDate,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.status == "success") {
        console.log(response.data);
        toast.success("successfully created task");
      }
    } catch (error) {
      toast.error("fail to create task");
      console.log(error);
      console.log(error.message);
    } finally {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }
  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-dvh">
      <form className="w-xs" onSubmit={handleSubmit}>
        <h2 className="text-lg text-center mb-4 uppercase font-medium tracking-wide text-gray-500 font-openSans">
          create a task
        </h2>
        <div className="mb-2">
          <label
            htmlFor="title"
            className="block font-openSans text-gray-500 text-base font-normal mb-1"
          >
            Title
          </label>
          <input
            className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
            type="text"
            id="title"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="description"
            className="block font-openSans text-gray-500 text-base font-normal mb-1"
          >
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            value={description}
            id="description"
            required
            className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
          ></textarea>
        </div>
        <div className="mb-2">
          <label
            htmlFor="duedate"
            className="block font-openSans text-gray-500 text-base font-normal mb-1"
          >
            Due Date
          </label>

          <input
            id="duedate"
            name="duedate"
            value={dueDate}
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="status"
            className="block font-openSans text-gray-500 text-base font-normal mb-1"
          >
            Status
          </label>
          <select
            onChange={(e) => setStatus(e.target.value)}
            name="status"
            id="status"
            className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
          >
            <option>select status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block font-openSans text-gray-500 text-base font-normal mb-1"
          >
            Priority
          </label>
          <select
            onChange={(e) => setPriority(e.target.value)}
            name="priority"
            id="priority"
            className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
          >
            <option>select priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button
          type="submit"
          className="font-openSans px-3 py-1.5 rounded-sm bg-cyan-500 cursor-pointer text-gray-600 text-base font-medium tracking-wide mb-2"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default Todo;
