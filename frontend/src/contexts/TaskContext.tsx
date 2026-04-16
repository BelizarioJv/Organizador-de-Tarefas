import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Task } from "../entities/Task";
import { z } from "zod";
import { tasksService } from "../services/api";

const UpdateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "doing", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

interface TasksContextData {
  tasks: Task[];
  createTask: (attributes: Omit<Task, "id">) => Promise<Task>;
  updateTask: (
    id: number,
    attributes: Partial<Omit<Task, "id">>,
  ) => Promise<Task>;
  deleteTask: (id: number) => Promise<void>;
}

export const TasksContext = createContext({} as TasksContextData);

export const TasksContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    tasksService.fetchTasks().then((data) => setTasks(data));
  }, []);

  const createTask = async (attributes: Omit<Task, "id">) => {
    const task = await tasksService.save(attributes);
    setTasks((current) => [...current, task]);
    return task;
  };

  const updateTask = async (
    id: number,
    attributes: Partial<Omit<Task, "id">>,
  ) => {
    const parsedAttributes = UpdateTaskSchema.parse(attributes);
    const updatedTask = await tasksService.update(id, parsedAttributes);

    setTasks((current) =>
      current.map((task) => (task.id === id ? updatedTask : task)),
    );

    return updatedTask;
  };

  const deleteTask = async (id: number) => {
    await tasksService.delete(id);
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
