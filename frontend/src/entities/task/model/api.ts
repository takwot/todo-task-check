import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstanse } from "../../../shared/api/backend";
import { AxiosResponse } from "axios";
import { ITask } from "../../../features/todo-list/model/task.type";

const getAllTodo = async (): Promise<ITask[]> => {
  const res = await apiInstanse.get("/tasks");

  return res.data;
};

const addTodoHandle = async (task: { title: string; description?: string }) => {
  const res = await apiInstanse.post("/tasks", {
    title: task.title,
    description: task.description,
  });

  return res;
};
const deleteTodoHandle = async (id: string) => {
  const res = await apiInstanse.delete(`/tasks/${id}`);

  return res;
};

const updateTodoHandle = async (task: {
  id: string;
  title: string;
  status: boolean;
  description?: string;
}): Promise<AxiosResponse<any>> => {
  return await apiInstanse.put(`/tasks/${task.id}`, {
    title: task.title,
    status: task.status,
    description: task.description,
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo-list"],
      });
    },
    mutationFn: updateTodoHandle,
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodoHandle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo-list"],
      });
    },
  });
};
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodoHandle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo-list"],
      });
    },
  });
};

export const useTodos = () => {
  return useQuery({
    queryFn: getAllTodo,
    queryKey: ["todo-list"],
  });
};

const changeStatusTodo = async (status: boolean, id: string) => {
  const res = await apiInstanse.put(`/tasks/${id}`, { status });

  return res;
};

export const useChangeStatus = () => {
  return useMutation({
    mutationFn: (data: { id: string; status: boolean }) =>
      changeStatusTodo(data.status, data.id),
  });
};
