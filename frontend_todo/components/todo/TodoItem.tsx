import { FaPen, FaTrash } from "react-icons/fa";
import { Todo } from "@/types/todo";

interface Props {
  todo: Todo;
  index: number;
  onToggle: (id: number, status: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export const TodoItem = ({
  todo,
  index,
  onToggle,
  onDelete,
  onEdit,
}: Props) => {
  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
        todo.completed
          ? "bg-gray-50 opacity-75"
          : "bg-white hover:border-blue-400 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-4 overflow-hidden w-full">
        <span className="text-gray-300 font-mono text-sm w-6">#{index}</span>

        {/* Checkbox Custom */}
        <div
          onClick={() => onToggle(todo.id, todo.completed)}
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-colors ${
            todo.completed
              ? "bg-blue-500 border-blue-500"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          {todo.completed && (
            <span className="text-white text-xs font-bold">✓</span>
          )}
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center gap-4 w-full">
            <p
              className={`truncate text-lg ${
                todo.completed ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {todo.title}
            </p>
            <p className="text-gray-500 text-sm">
              {new Date(todo.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <p
            className={`truncate text-lg ${
              todo.completed ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {todo.description}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 ml-4  ">
        {/* Tombol Edit */}
        <button
          onClick={onEdit}
          className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg transition"
          title="Edit"
        >
          <FaPen size={14} />
        </button>

        {/* Tombol Delete */}
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"
          title="Hapus"
        >
          <FaTrash size={14} />
        </button>
      </div>
    </div>
  );
};
