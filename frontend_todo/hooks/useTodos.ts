import { useState, useEffect, useCallback } from "react";
import { todoService } from "@/services/todoService";
import { Todo, Meta } from "@/types/todo";

export const useTodos = () => {
  // State Data
  const [todos, setTodos] = useState<Todo[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null); // Simpan info halaman

  // State Query
  const [page, setPage] = useState(1);
  const [limit] = useState(4); // Default 4 item per halaman
  const [search, setSearch] = useState("");

  // State UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Fetch Todos
  const fetchTodos = useCallback(
    async (q: string, p: number) => {
      setLoading(true);
      setError("");
      try {
        const response = await todoService.getAll(q, p, limit);
        setTodos(response.data);
        setMeta(response.meta);
      } catch (err) {
        console.error(err);
        setError("Gagal koneksi ke Backend.");
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  //  Search & Page Change
  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchTodos(search, page);
    }, 500);
    return () => clearTimeout(timer);
  }, [search, page, fetchTodos]);

  // Kalau search berubah, reset ke halaman 1
  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  // Refresh data
  const refresh = () => fetchTodos(search, page);

  //   Create
  const saveTodo = async (title: string, desc: string) => {
    try {
      if (selectedTodo) await todoService.update(selectedTodo.id, title, desc);
      else await todoService.create(title, desc);
      setIsModalOpen(false);
      refresh();
    } catch {
      alert("Gagal menyimpan data");
      setIsModalOpen(false);
    }
  };

  //   Toggle
  const toggleTodo = async (id: number, currentStatus: boolean) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !currentStatus } : t))
    );
    try {
      await todoService.toggle(id);
    } catch {
      refresh();
      alert("Gagal toggle status");
    }
  };

  const deleteTodo = async (id: number) => {
    if (!confirm("Hapus data?")) return;
    try {
      await todoService.delete(id);
      refresh();
    } catch {
      alert("Gagal hapus data");
    }
  };

  //   Delete
  const askToDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await todoService.delete(deleteId);
      setDeleteId(null); // Tutup modal
      refresh(); // Refresh data
    } catch {
      alert("Gagal menghapus data");
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  // Modal Actions
  const openCreateModal = () => {
    setSelectedTodo(null);
    setIsModalOpen(true);
  };
  const openEditModal = (t: Todo) => {
    setSelectedTodo(t);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return {
    todos,
    loading,
    error,
    search,
    setSearch: handleSearch,
    meta,
    page,
    setPage,
    isModalOpen,
    selectedTodo,
    openCreateModal,
    openEditModal,
    closeModal,
    saveTodo,
    toggleTodo,
    deleteTodo,
    askToDelete,
    confirmDelete,
    cancelDelete,
    isDeleteModalOpen: !!deleteId,
  };
};
