import { useContext } from "react";
import type { Task } from "../entities/Task";
import { TasksContext } from "../contexts/TaskContext";

import * as Tooltip from "@radix-ui/react-tooltip";
import * as Dialog from "@radix-ui/react-dialog";

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
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-lg text-gray-800">{task.title}</h2>

        {/* Tooltip (Radix) */}
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span className={`w-3 h-3 rounded-full ${statusColor}`} />
            </Tooltip.Trigger>

            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-black text-white text-xs px-2 py-1 rounded"
                sideOffset={5}>
                {task.status}
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>

      {/* Info */}
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        <span>Status: {task.status}</span>
        <span>Priority: {task.priority}</span>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          onClick={update}
          className="px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition">
          Atualizar
        </button>

        {/* Dialog (Radix) para confirmar delete */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="px-3 py-1 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition">
              Excluir
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/40" />

            <Dialog.Content className="fixed top-1/2 left-1/2-translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-lg">
              <Dialog.Title className="font-semibold mb-2">
                Confirmar exclusão
              </Dialog.Title>

              <Dialog.Description className="text-sm text-gray-600 mb-4">
                Tem certeza que deseja excluir esta tarefa?
              </Dialog.Description>

              <div className="flex justify-end gap-2">
                <Dialog.Close asChild>
                  <button className="px-3 py-1 text-sm bg-gray-200 rounded">
                    Cancelar
                  </button>
                </Dialog.Close>

                <Dialog.Close asChild>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded">
                    Excluir
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};
