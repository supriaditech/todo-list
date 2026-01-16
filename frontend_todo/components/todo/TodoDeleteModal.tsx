import { FaExclamationTriangle, FaTrash } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const TodoDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4   animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100">
        {/* Header Warning */}
        <div className="bg-red-50 p-6 flex flex-col items-center text-center border-b border-red-100">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3 text-red-500">
            <FaExclamationTriangle size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Hapus Tugas?</h3>
          <p className="text-gray-500 text-sm mt-1">
            Tindakan ini tidak bisa dibatalkan. Data akan hilang permanen.
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 flex gap-3 bg-white">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-white bg-red-500 hover:bg-red-600 rounded-xl font-bold shadow-lg shadow-red-200 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <>
                <FaTrash /> Hapus
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
