import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/layout/Navbar";
import BoardAccordion from "../components/board/BoardAccordion";
import AddBoardModal from "../components/board/AddBoardModal";

const ProjectPage = () => {
    const { id } = useParams();
    const [boards, setBoards] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchBoards = async () => {
        try {
            const { data } = await api.get(`/boards/project/${id}`);
            setBoards(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, [id]);

    const handleBoardCreated = (newBoard) => {
        setBoards((prev) => [...prev, newBoard]);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Project Boards</h2>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Add Board
                    </button>
                </div>

                {boards.length === 0 ? (
                    <div className="bg-white p-6 rounded shadow text-center text-gray-500">
                        No boards created yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {boards.map((board) => (
                            <BoardAccordion key={board._id} board={board} />
                        ))}
                    </div>
                )}
            </div>

            {showModal && (
                <AddBoardModal
                    projectId={id}
                    onClose={() => setShowModal(false)}
                    onBoardCreated={handleBoardCreated}
                />
            )}
        </div>
    );
};

export default ProjectPage;
