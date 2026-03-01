import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", form);
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
            <div className="bg-white rounded-3xl shadow-2xl flex w-[900px] h-[600px] overflow-hidden">

                {/* Left side - illustration */}
                <div className="w-1/2 bg-purple-50 flex items-center justify-center">
                    <img
                        src="https://izood.net/wp-content/uploads/2022/03/Backlog-Program-vs-Project-Manager-680x450-1.png"
                        alt="Project Management Illustration"
                        className="w-[100%] h-[100%] object-cover"
                    />
                </div>

                {/* Right side - form */}
                <div className="w-1/2 p-12 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-8 text-purple-700 text-center">
                        Project Manager
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-full border border-purple-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                            onChange={handleChange}
                        />

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
                            Register
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/" className="text-purple-700 font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Register;
