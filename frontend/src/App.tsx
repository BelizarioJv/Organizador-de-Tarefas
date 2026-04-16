import { useState } from "react";
import { CreateTaskForm } from "./components/CreateTaskForm";
import { TasksContextProvider } from "./contexts/TaskContext";
import { TaskBoard } from "./components/TaskBoard";

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <TasksContextProvider>
      <div className="h-dvh  text-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-700">
          <h1 className="text-3xl font-bold tracking-wide">
            Organizador de Tarefas
          </h1>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-xl font-medium shadow-lg transition">
            + Nova tarefa
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          {/* Sidebar / Form */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 p-4 rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-indigo-400">
                Criar tarefa
              </h2>
              <CreateTaskForm />
            </div>
          </div>

          {/* Task Board */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800 p-4 rounded-2xl shadow-md h-full">
              <h2 className="text-lg font-semibold mb-4 text-indigo-400">
                Quadro de tarefas
              </h2>

              <div className="overflow-x-auto">
                <TaskBoard />
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {openModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-slate-800 rounded-2xl shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b border-slate-700 p-4">
                <h2 className="text-xl font-semibold text-indigo-400">
                  Nova tarefa
                </h2>
                <button
                  onClick={() => setOpenModal(false)}
                  className="text-gray-400 hover:text-white">
                  ✕
                </button>
              </div>

              <div className="p-4">
                <CreateTaskForm />
              </div>
            </div>
          </div>
        )}
      </div>
      <footer className="flex flex-row items-center justify-center p-4 text-amber-50 ">
        <div>
          <p>
            &copy; 2024 Organizador de Tarefas. Todos os direitos reservados.
          </p>
        </div>
        <div>
          <p>
            Desenvolvido por{" "}
            <a
              href="https://www.linkedin.com/in/joaobelizariodev/"
              target="_blank"
              className="text-indigo-400 hover:underline">
              João Belizário
            </a>
            .
          </p>
        </div>
      </footer>
    </TasksContextProvider>
  );
}

export default App;
