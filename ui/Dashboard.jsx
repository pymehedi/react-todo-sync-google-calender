import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2, FiTrash } from "react-icons/fi";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [updateId, setUpdateId] = useState("");
  console.log(selectedDate);

  async function handleSubmit(e) {
    e.preventDefault();
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (dueDate) updateData.dueDate = dueDate;

    try {
      const response = await axios.patch(
        `https://todo-sync-google-calender.onrender.com/task/${updateId}`,
        updateData,
        {
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        toast.success("Successfully updated");
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updateId ? { ...task, ...updateData } : task
          )
        );
        console.log(response.data);
      }
    } catch (error) {
      toast.error("Fail to update");
      console.error("Update error:", error);
    } finally {
      setModal(false);
    }
  }

  const filteredTasks = tasks.filter((task) => {
    return (
      (selectedStatus ? task.status === selectedStatus : true) &&
      (selectedPriority ? task.priority === selectedPriority : true) &&
      (selectedDate
        ? new Date(task.dueDate).toLocaleDateString("en-CA") ===
          new Date(selectedDate).toLocaleDateString("en-CA")
        : true)
    );
  });

  function handleUpdate(id) {
    setModal((state) => !state);
    setUpdateId(id);
  }
  async function handleDelete(id) {
    try {
      const response = await axios.delete(`https://todo-sync-google-calender.onrender.com/task/${id}`, {
        withCredentials: true,
      });

      if (response.data.status === "success") {
        toast.success("Successfully deleted");
        // Update the state to remove the deleted task
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      toast.error("Fail to delete");
      console.error("Error deleting task:", error.message);
    }
  }

  useEffect(function () {
    async function fetchTasks() {
      try {
        const response = await axios.get("https://todo-sync-google-calender.onrender.com/tasks", {
          withCredentials: true,
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error(error);
        console.error(error.message);
      }
    }
    fetchTasks();
  }, []);
  return (
    <div className="bg-gray-50 h-full overflow-scroll relative">
      <div className="max-w-[1140px] mx-auto">
        <h2 className="text-xl py-6 font-medium tracking-wide text-gray-700 font-openSans uppercase">
          List of all tasks
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            onChange={(e) => setSelectedStatus(e.target.value)}
            name="status"
            id="status"
            className="inline-block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 border border-gray-200"
          >
            <option value="">Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

          {/* Priority Filter */}

          <select
            onChange={(e) => setSelectedPriority(e.target.value)}
            name="status"
            id="status"
            className="inline-block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 border border-gray-200"
          >
            <option value="">Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Due Date Filter */}
          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            className="inline-block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 border border-gray-200"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-300">
                <th className="px-4 py-2 text-left text-base text-gray-700 font-openSans font-medium">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-base text-gray-700 font-openSans font-medium">
                  Description
                </th>
                <th className=" px-4 py-2 text-left text-base text-gray-700 font-openSans font-medium">
                  Due Date
                </th>
                <th className=" px-4 py-2 text-left text-base text-gray-700 font-openSans font-medium">
                  Status
                </th>
                <th className=" px-4 py-2 text-left text-base text-gray-700 font-openSans font-medium">
                  Priority
                </th>
                <th className=" px-4 py-2 text-left text-base text-gray-700 font-openSans font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-100">
                    {/* Editable Fields */}
                    <td className="px-4 py-2 text-base font-openSans text-gray-600 font-normal">
                      {task.title}
                    </td>
                    <td className=" px-4 py-2 text-base font-openSans text-gray-600 font-normal">
                      {task.description}
                    </td>
                    <td className="px-4 py-2 text-base font-openSans text-gray-600 font-normal">
                      {new Date(task.dueDate).toLocaleDateString("en-CA")}
                    </td>
                    <td className="px-4 py-2 text-base font-openSans text-gray-600 font-normal">
                      {task.status}
                    </td>
                    <td className="px-4 py-2 text-base font-openSans text-gray-600 font-normal">
                      {task.priority}
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleUpdate(task._id)}
                        className="text-base font-openSans text-gray-600 cursor-pointer"
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-base text-gray-600 font-openSans cursor-pointer"
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <div className="flex justify-center items-center bg-gray-50/10 backdrop-blur-sm absolute inset-0">
          <form className="w-xs" onSubmit={handleSubmit}>
            <h2 className="text-lg text-center mb-4 uppercase font-medium tracking-wide text-gray-500 font-openSans">
              update a task
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
                id="description"
                value={description}
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
                value={status}
                id="status"
                className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
              >
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
                value={priority}
                id="priority"
                className="block font-openSans outline-none bg-gray-100 px-4 py-2 rounded-sm text-base text-gray-500 w-full border border-gray-200"
              >
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
      )}
    </div>
  );
};

export default Dashboard;
