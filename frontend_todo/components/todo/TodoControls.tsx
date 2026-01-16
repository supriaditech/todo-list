import { FaSearch, FaPlus } from "react-icons/fa";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  onOpenModal: () => void;
}

export const TodoControls = ({ search, setSearch, onOpenModal }: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 shrink-0">
      <div className="relative flex-1">
        <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari tugas..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <button
        onClick={onOpenModal}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md active:scale-95 transition"
      >
        <FaPlus /> Task Baru
      </button>
    </div>
  );
};
