import { apiClient } from "@/lib/axios";
import { TodoResponse } from "@/types/todo";

const ENDPOINT = "/todo";

export const todoService = {
  getAll: async (query = "", page = 1, limit = 4): Promise<TodoResponse> => {
    const { data } = await apiClient.get<TodoResponse>(
      `${ENDPOINT}?search=${query}&page=${page}&limit=${limit}`
    );
    return data;
  },

  create: async (title: string, description: string) => {
    return apiClient.post(ENDPOINT, {
      title,
      description,
    });
  },

  update: async (id: number, title: string, description: string) => {
    return apiClient.patch(`${ENDPOINT}/${id}`, {
      title,
      description,
    });
  },

  toggle: async (id: number) => {
    return apiClient.patch(`${ENDPOINT}/${id}/toggle`);
  },

  delete: async (id: number) => {
    return apiClient.delete(`${ENDPOINT}/${id}`);
  },
};
