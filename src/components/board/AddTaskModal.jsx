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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Create Task</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Task Title"
                        className="w-full border p-2 rounded mb-3"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Description"
                        className="w-full border p-2 rounded mb-3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <select
                        className="w-full border p-2 rounded mb-4"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>Todo</option>
                        <option>In Progress</option>
                        <option>Done</option>
                    </select>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded"
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
