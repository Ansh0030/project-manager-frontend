const KanbanBoard = ({ boardId }) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h4 className="font-bold mb-4">
                Kanban Board (Board ID: {boardId})
            </h4>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded">
                    <h5 className="font-semibold">Todo</h5>
                </div>

                <div className="bg-gray-100 p-4 rounded">
                    <h5 className="font-semibold">In Progress</h5>
                </div>

                <div className="bg-gray-100 p-4 rounded">
                    <h5 className="font-semibold">Done</h5>
                </div>
            </div>
        </div>
    );
};

export default KanbanBoard;
