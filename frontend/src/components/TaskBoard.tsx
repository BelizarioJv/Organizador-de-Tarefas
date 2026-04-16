import { TaskCard } from "./TaskCard";
import type { Task } from "../entities/Task";
import { Badge, Flex, Grid, ScrollArea } from "@radix-ui/themes";
import { useState, useEffect, useContext } from "react";
import { tasksService } from "../services/api";
import { TasksContext } from "../contexts/TaskContext";

export const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { createTask, updateTask, deleteTask } = useContext(TasksContext);

  useEffect(() => {
    tasksService.fetchTasks().then((storedTasks) => {
      setTasks(storedTasks);
    });
  }, [createTask, updateTask, deleteTask]);

  const tasksTodo: Task[] =
    tasks.filter((tasks) => tasks.status === "todo") ?? [];
  const tasksInProgress: Task[] =
    tasks?.filter((tasks) => tasks.status === "doing") ?? [];
  const tasksDone: Task[] =
    tasks?.filter((tasks) => tasks.status === "done") ?? [];

  return (
    <ScrollArea scrollbars="horizontal">
      <Grid columns="3" gap="4" minWidth="64rem">
        <Flex direction="column" gap="4">
          <Badge size="3" color="gray">
            Para Fazer ({tasksTodo.length})
          </Badge>
          {tasksTodo.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>

        <Flex direction="column" gap="4">
          <Badge size="3" color="yellow">
            Em Progresso ({tasksInProgress.length})
          </Badge>
          {tasksInProgress.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>

        <Flex direction="column" gap="4">
          <Badge size="3" color="green">
            Concluídas ({tasksDone.length})
          </Badge>
          {tasksDone.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>
      </Grid>
    </ScrollArea>
  );
};
