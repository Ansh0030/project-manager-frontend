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
            const { data } = await api.post("/boards", { name, projectId });
            onBoardCreated(data);
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-purple-100 p-6 rounded-2xl w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-purple-700">CREATE BOARD</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Board Name"
                        className="w-full border border-gray-400 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="flex justify-end gap-3">
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
