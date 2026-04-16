import { useContext } from "react";
import type { Task } from "../entities/Task.ts";
import { TasksContext } from "../contexts/TaskContext";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TasksContext);

  const update = () => {
    if (task.status === "todo") {
      updateTask(task.id, { status: "doing" });
    } else if (task.status === "doing") {
      updateTask(task.id, { status: "done" });
    } else {
      deleteTask(task.id);
    }
  };

  const statusColor = {
    todo: "bg-gray-400",
    doing: "bg-yellow-400",
    done: "bg-green-500",
  }[task.status];

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-lg text-gray-800">{task.title}</h2>

        {/* Status indicator */}
        <span
          className={`w-3 h-3 rounded-full ${statusColor}`}
          title={task.status}
        />
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>

      {/* Info */}
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        <span className="capitalize">Status: {task.status}</span>
        <span className="capitalize">Priority: {task.priority}</span>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          onClick={update}
          className="px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition">
          Atualizar
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="px-3 py-1 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition">
          Excluir
        </button>
      </div>
    </div>
  );
};
