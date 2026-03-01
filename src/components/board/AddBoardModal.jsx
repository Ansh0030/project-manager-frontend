import { useState } from "react";
import api from "../../services/api";

const AddBoardModal = ({ projectId, onClose, onBoardCreated }) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) return;

        try {
            setLoading(true);

            const { data } = await api.post("/boards", {
                name,
                projectId,
            });

            onBoardCreated(data);
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Create Board</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Board Name"
                        className="w-full border p-2 rounded mb-4"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBoardModal;
