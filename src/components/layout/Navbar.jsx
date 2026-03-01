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
        <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">
                Project Manager
            </h1>

            <div className="flex items-center gap-4">
        <span className="text-gray-600">
          {user?.name}
        </span>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
