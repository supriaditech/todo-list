"use client";

import { FaSpinner, FaExclamationTriangle, FaInbox } from "react-icons/fa";
import { useTodos } from "@/hooks/useTodos";
import { TodoHeader } from "@/components/todo/TodoHeader";
import { TodoControls } from "@/components/todo/TodoControls";
import { TodoItem } from "@/components/todo/TodoItem";
import { TodoModal } from "@/components/todo/TodoModal";
import { TodoPagination } from "@/components/todo/TodoPagination";
import { TodoDeleteModal } from "@/components/todo/TodoDeleteModal"; // 1. Import

export default function Home() {
  const {
    todos,
    loading,
    error,
    search,
    setSearch,
    isModalOpen,
    selectedTodo,
    openCreateModal,
    openEditModal,
    closeModal,
    saveTodo,
    toggleTodo,
    meta,
    setPage,

    askToDelete,
    confirmDelete,
    cancelDelete,
    isDeleteModalOpen,
  } = useTodos();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 font-sans text-gray-800 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[85vh]">
        <TodoHeader />

        <div className="p-6 flex flex-col flex-1 overflow-hidden pb-0">
          {error && (
            <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center gap-3">
              <FaExclamationTriangle /> {error}
            </div>
          )}

          <TodoControls
            search={search}
            setSearch={setSearch}
            onOpenModal={openCreateModal}
          />

          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {loading && (
              <div className="absolute inset-0 bg-white/50 z-10 flex flex-col items-center justify-center text-gray-400 gap-3">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
                <p>Memuat...</p>
              </div>
            )}

            {!loading && todos.length === 0 && (
              <div className="h-[90%] flex flex-col items-center justify-center  text-gray-400 border-2 border-dashed  border-gray-200 rounded-xl bg-gray-50/50">
                <FaInbox className="text-4xl mb-2 opacity-50" />
                <p>Belum ada tugas.</p>
              </div>
            )}

            {todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                index={index + 1 + (meta ? (meta.page - 1) * meta.limit : 0)}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={askToDelete}
                onEdit={() => openEditModal(todo)}
              />
            ))}
          </div>
        </div>

        <TodoPagination meta={meta} loading={loading} onPageChange={setPage} />
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <TodoModal
          isOpen={isModalOpen}
          initialData={selectedTodo}
          onClose={closeModal}
          onSave={saveTodo}
        />
      )}

      {/*  Modal Konfirmasi  */}
      <TodoDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
