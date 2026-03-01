import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post("/auth/login", form);
            login(data);
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
            <div className="bg-white rounded-3xl shadow-2xl flex w-[900px] h-[600px] overflow-hidden">

                {/* Left side - form */}
                <div className="w-1/2 p-12 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-8 text-purple-700 text-center">
                        Project Manager
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full border border-purple-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full border border-purple-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                            onChange={handleChange}
                        />

                        <button className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition duration-200 text-lg font-semibold">
                            Login
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-purple-700 font-medium hover:underline">
                            Register
                        </Link>
                    </p>
                </div>

                {/* Right side - illustration */}
                <div className="w-1/2 bg-purple-50 flex items-center justify-center">
                    <img
                        src="https://undraw.co/api/illustrations/undraw_project_management_lh5a.svg"
                        alt="Project Management Illustration"
                        className="w-[80%] h-[80%] object-contain"
                    />
                </div>

            </div>
        </div>
    );
};

export default Login;
