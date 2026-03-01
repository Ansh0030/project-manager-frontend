import { useEffect, useState } from "react";
import api from "../../services/api";
import AddTaskModal from "./AddTaskModal";

const columns = ["Todo", "In Progress", "Done"];

const KanbanBoard = ({ boardId }) => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get(`/tasks/board/${boardId}`);
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [boardId]);

    const handleTaskCreated = (newTask) => {
        setTasks((prev) => [...prev, newTask]);
    };

    const updateTaskStatus = async (taskId, status) => {
        try {
            const { data } = await api.put(`/tasks/${taskId}`, {
                status,
            });

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === taskId ? data : task
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between mb-4">
                <h4 className="font-bold">Kanban Board</h4>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                >
                    + Add Task
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {columns.map((column) => (
                    <div key={column} className="bg-gray-100 p-4 rounded">
                        <h5 className="font-semibold mb-3">{column}</h5>

                        <div className="space-y-3">
                            {tasks
                                .filter((task) => task.status === column)
                                .map((task) => (
                                    <div
                                        key={task._id}
                                        className="bg-white p-3 rounded shadow cursor-pointer"
                                    >
                                        <h6 className="font-medium">{task.title}</h6>
                                        <p className="text-sm text-gray-500">
                                            {task.description}
                                        </p>

                                        <div className="flex gap-2 mt-2">
                                            {columns
                                                .filter((c) => c !== column)
                                                .map((c) => (
                                                    <button
                                                        key={c}
                                                        onClick={() =>
                                                            updateTaskStatus(task._id, c)
                                                        }
                                                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                                                    >
                                                        Move to {c}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <AddTaskModal
                    boardId={boardId}
                    onClose={() => setShowModal(false)}
                    onTaskCreated={handleTaskCreated}
                />
            )}
        </div>
    );
};

export default KanbanBoard;
