import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/project/${project._id}`)}
            className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
        >
            <h2 className="text-xl font-semibold text-purple-700">{project.name}</h2>
            <p className="text-gray-600 mt-2">{project.description}</p>
        </div>
    );
};

export default ProjectCard;
