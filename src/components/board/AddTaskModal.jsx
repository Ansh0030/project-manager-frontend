import { useState } from "react";
import api from "../../services/api";

const AddTaskModal = ({ boardId, onClose, onTaskCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Todo");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post("/tasks", {
                title,
                description,
                status,
                boardId,
            });
            onTaskCreated(data);
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-purple-100 p-6 rounded-2xl w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-purple-700">CREATE TASK</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Task Title"
                        className="w-full border border-gray-400 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Description"
                        className="w-full border border-gray-400 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <select
                        className="w-full border border-gray-400 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>Todo</option>
                        <option>In Progress</option>
                        <option>Done</option>
                    </select>

                    <div className="flex justify-between items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
