import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Meta } from "@/types/todo";

interface Props {
  meta: Meta | null;
  onPageChange: (page: number) => void;
  loading: boolean;
}

export const TodoPagination = ({ meta, onPageChange, loading }: Props) => {
  if (!meta) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
      <span className="text-sm text-gray-500">
        Halaman <span className="font-bold text-gray-700">{meta.page}</span>{" "}
        dari {meta.last_page}
      </span>

      <div className="flex gap-2">
        <button
          disabled={meta.page <= 1 || loading}
          onClick={() => onPageChange(meta.page - 1)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <FaChevronLeft size={12} /> Prev
        </button>

        <button
          disabled={meta.page >= meta.last_page || loading}
          onClick={() => onPageChange(meta.page + 1)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};
