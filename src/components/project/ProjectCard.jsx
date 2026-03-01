import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/project/${project._id}`)}
            className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-lg transition"
        >
            <h2 className="text-lg font-semibold">
                {project.name}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
                {project.description}
            </p>
        </div>
    );
};

export default ProjectCard;
