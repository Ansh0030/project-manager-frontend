import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="bg-purple-600 shadow-md px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Project Manager</h1>

            <div className="flex items-center gap-4">
                <span className="text-white font-medium">{user?.name}</span>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
