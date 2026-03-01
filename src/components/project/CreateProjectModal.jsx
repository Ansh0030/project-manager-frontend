import { useState } from "react";
import api from "../../services/api";

const CreateProjectModal = ({ close, refresh }) => {
    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/projects", form);
        refresh();
        close();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-96">
                <h2 className="text-xl font-bold mb-4">
                    Create Project
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        placeholder="Project Name"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={close}
                            className="px-4 py-1 border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            className="px-4 py-1 bg-blue-600 text-white rounded"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;
