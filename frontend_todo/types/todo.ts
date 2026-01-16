export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  last_page: number;
}

export interface TodoResponse {
  statusCode: number;
  message: string;
  data: Todo[];
  meta: Meta;
}
