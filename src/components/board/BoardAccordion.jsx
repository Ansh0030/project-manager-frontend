import { useState } from "react";
import KanbanBoard from "./KanbanBoard";
import HistoryPanel from "../history/HistoryPanel";

const BoardAccordion = ({ board }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-md">
            {/* Accordion Header */}
            <div
                onClick={() => setOpen(!open)}
                className="p-4 cursor-pointer flex justify-between items-center"
            >
                <h3 className="text-lg font-semibold">
                    {board.name}
                </h3>
                <span>{open ? "-" : "+"}</span>
            </div>

            {/* Accordion Content */}
            {open && (
                <div className="flex gap-6 p-6 bg-gray-50">
                    {/* 60% Kanban */}
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
