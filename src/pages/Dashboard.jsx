import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/layout/Navbar";
import ProjectCard from "../components/project/ProjectCard";
import CreateProjectModal from "../components/project/CreateProjectModal";

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const fetchProjects = async () => {
        const { data } = await api.get("/projects");
        setProjects(data);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        Projects
                    </h2>

                    <button
                        onClick={() => setOpenModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Add Project
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                        />
                    ))}
                </div>
            </div>

            {openModal && (
                <CreateProjectModal
                    close={() => setOpenModal(false)}
                    refresh={fetchProjects}
                />
            )}
        </div>
    );
};

export default Dashboard;
