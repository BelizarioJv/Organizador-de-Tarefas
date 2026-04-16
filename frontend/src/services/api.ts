import type { Task } from "../entities/Task";

const BASE_URL = `${import.meta.env.VITE_API_URL}/tasks`;
const defaultHeaders = { "Content-Type": "application/json" };

export const tasksService = {
  async fetchTasks(): Promise<Task[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar tarefas: ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  },

  async save(body: Omit<Task, "id">): Promise<Task> {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(
        `Erro ao salvar tarefa: ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  },

  async update(id: number, body: Partial<Omit<Task, "id">>): Promise<Task> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(
        `Erro ao atualizar tarefa: ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(
        `Erro ao deletar tarefa: ${response.status} ${response.statusText}`,
      );
    }
  },
};
