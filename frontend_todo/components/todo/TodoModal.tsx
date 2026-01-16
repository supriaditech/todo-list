import { useState } from "react";
import { Todo } from "@/types/todo";
import { FaTimes, FaSave } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
  initialData?: Todo | null;
}

export const TodoModal = ({ isOpen, onClose, onSave, initialData }: Props) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [desc, setDesc] = useState(initialData?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Judul wajib diisi");
    if (title.length < 3) return alert("Judul minimal 3 karakter");
    if (title.length > 100) return alert("Judul maksimal 100 karakter");
    if (desc.length < 5) return alert("Deskripsi minimal 5 karakter");

    onSave(title, desc);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold">
            {initialData ? "Edit Tugas" : "Tambah Tugas"}
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-blue-700 p-1 rounded-full transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Tugas
            </label>
            <input
              autoFocus
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Contoh: Belajar Next.js"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi{" "}
              <span className="text-xs text-gray-400">(Min 5 huruf)</span>
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition h-24 resize-none"
              placeholder="Jelaskan detail tugas..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-bold shadow-lg shadow-blue-200 transition flex items-center justify-center gap-2"
            >
              <FaSave /> Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
