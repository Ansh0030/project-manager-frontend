import { useState } from "react";
import KanbanBoard from "./KanbanBoard";
import HistoryPanel from "../history/HistoryPanel";
import { FiTrash2 } from "react-icons/fi";

const BoardAccordion = ({ board, onDelete }) => {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete board "${board.name}"?`)) {
            onDelete(board._id);
        }
    };

    return (
        <div className="bg-purple-50 rounded-2xl shadow-md mb-4">
            {/* Accordion Header */}
            <div
                onClick={() => setOpen(!open)}
                className="p-4 cursor-pointer flex justify-between items-center hover:bg-purple-100 transition rounded-t-2xl"
            >
                <h3 className="text-lg font-semibold text-purple-700">{board.name.toUpperCase()}</h3>

                <div className="flex items-center gap-3">
                    <span className="text-purple-700 font-bold">{open ? "-" : "+"}</span>

                    {/* Delete Icon */}
                    <FiTrash2
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        className="text-gray-400 hover:text-red-500 cursor-pointer transition"
                    />
                </div>
            </div>

            {/* Accordion Content */}
            {open && (
                <div className="flex gap-6 p-6 bg-purple-100 rounded-b-2xl">
                    {/* 80% Kanban */}
                    <div className="w-4/5">
                        <KanbanBoard boardId={board._id} />
                    </div>

                    {/* 20% History */}
                    <div className="w-1/5">
                        <HistoryPanel boardId={board._id} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoardAccordion;
