import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/layout/Navbar";
import BoardAccordion from "../components/board/BoardAccordion";

const ProjectPage = () => {
    const { id } = useParams();
    const [boards, setBoards] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchBoards = async () => {
        try {
            const { data } = await api.get(`/boards/${id}`);
            setBoards(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">
                        Project Boards
                    </h2>

                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        + Add Board
                    </button>
                </div>

                {/* Boards Accordion */}
                <div className="space-y-4">
                    {boards.map((board) => (
                        <BoardAccordion
                            key={board._id}
                            board={board}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
