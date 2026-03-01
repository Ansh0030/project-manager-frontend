import { useEffect, useState } from "react";
import api from "../../services/api";
import AddTaskModal from "./AddTaskModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FiMoreVertical } from "react-icons/fi";

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
            const { data } = await api.put(`/tasks/${taskId}`, { status });
            setTasks((prev) =>
                prev.map((task) => (task._id === taskId ? data : task))
            );
        } catch (error) {
            console.log(error);
        }
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        // If dropped in same place, do nothing
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        // Update task status if column changed
        const task = tasks.find((t) => t._id === draggableId);
        if (task && task.status !== destination.droppableId) {
            updateTaskStatus(task._id, destination.droppableId);
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

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-3 gap-4">
                    {columns.map((column) => (
                        <Droppable droppableId={column} key={column}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`bg-gray-100 p-4 rounded min-h-[200px] ${
                                        snapshot.isDraggingOver ? "bg-gray-200" : ""
                                    }`}
                                >
                                    <h5 className="font-semibold mb-3">{column}</h5>
                                    <div className="space-y-3">
                                        {tasks
                                            .filter((task) => task.status === column)
                                            .map((task, index) => (
                                                <Draggable
                                                    key={task._id}
                                                    draggableId={task._id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className={`bg-white p-3 rounded shadow flex items-center justify-between ${
                                                                snapshot.isDragging ? "opacity-80" : ""
                                                            }`}
                                                        >
                                                            <div
                                                                {...provided.dragHandleProps}
                                                                className="cursor-grab mr-3"
                                                            >
                                                                <FiMoreVertical className="text-gray-400" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h6 className="font-medium">{task.title}</h6>
                                                                <p className="text-sm text-gray-500">
                                                                    {task.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

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
