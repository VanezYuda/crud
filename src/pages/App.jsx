import { useEffect, useState, Suspense } from "react";
import { MdHistory } from "react-icons/md";
import FruitTable from "../components/fruit/FruitTable";
import ContextMenu from "../components/ui/ContextMenu";
import LazyLoading from "../components/loading/LazyLoading";
import { getFruits, saveFruits } from "../utils/localStorage";
import { addHistory } from "../utils/historyStorage";
import HistoryList from "../components/history/HistoryList";
import { lazyWithDelay } from "../utils/lazyWithDelay";

const FruitForm = lazyWithDelay(
  () => import("../components/fruit/FruitForm"),
  800
);
const FruitModal = lazyWithDelay(
  () => import("../components/fruit/FruitModal"),
  800
);
const ConfirmDeleteModal = lazyWithDelay(
  () => import("../components/ui/ConfirmDeleteModal"),
  800
);

export default function FruitPage() {
  const [fruits, setFruits] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyTrigger, setHistoryTrigger] = useState(0);

  useEffect(() => {
    setFruits(getFruits());
  }, []);

  //Filter
  const filteredFruits = fruits.filter((f) =>
    `${f.nama} ${f.kategori} ${f.kualitas}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  //ADD
  const addFruit = (data) => {
    const updated = [...fruits, data];
    setFruits(updated);
    saveFruits(updated);
    addHistory("ADD", data.nama);
    setHistoryTrigger((v) => v + 1);

    setSearch("");
    setOpen(false);
  };

  // Edit
  const editFruit = (data) => {
    const updated = fruits.map((f, i) => (i === editIndex ? data : f));
    setFruits(updated);
    saveFruits(updated);
    addHistory("EDIT", data.nama);
    setHistoryTrigger((v) => v + 1);

    setSearch("");
    setEditIndex(null);
    setOpen(false);
  };

  // Delete
  const confirmDelete = () => {
    const target = fruits[deleteIndex];
    const updated = fruits.filter((_, i) => i !== deleteIndex);
    setFruits(updated);
    saveFruits(updated);
    addHistory("DELETE", target.nama);
    setHistoryTrigger((v) => v + 1);

    setSearch("");
    setDeleteIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow">
        {/* Header  */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h1 className="text-lg sm:text-xl font-semibold">List Buah</h1>

            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-12 h-10 flex items-center justify-center rounded-lg border hover:bg-gray-100 active:scale-95 transition cursor-pointer"
              >
                <MdHistory className="text-xl text-gray-700" />
              </button>

              <button
                onClick={() => {
                  setEditIndex(null);
                  setOpen(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-cell"
              >
                Tambah Buah
              </button>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Cari buah, kategori, kualitas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* History */}
        {showHistory && (
          <div className="mb-4 p-4 rounded-lg bg-gray-50">
            <HistoryList key={historyTrigger} />
          </div>
        )}
  
        {/* Table */}
        <FruitTable
          fruits={filteredFruits}
          onRightClick={(e, i) => {
            e.preventDefault();
            setContextMenu({
              x: e.clientX,
              y: e.clientY,
              index: i,
            });
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <p className="mt-3 text-xs text-gray-500 italic">
          Desktop: klik kanan / touchpad dua jari
          <br />
          Mobile & Tablet: tombol Edit / Hapus
        </p>
      </div>

      {/* Context menu */}
      {contextMenu && (
        <ContextMenu
          position={contextMenu}
          onEdit={() => {
            handleEdit(contextMenu.index);
            setContextMenu(null);
          }}
          onDelete={() => {
            handleDelete(contextMenu.index);
            setContextMenu(null);
          }}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Modal */}
      <Suspense fallback={<LazyLoading />}>
        <FruitModal isOpen={open} onClose={() => setOpen(false)}>
          <FruitForm
            onSubmit={editIndex !== null ? editFruit : addFruit}
            defaultValues={editIndex !== null ? fruits[editIndex] : {}}
          />
        </FruitModal>

        <ConfirmDeleteModal
          isOpen={deleteIndex !== null}
          onClose={() => setDeleteIndex(null)}
          onConfirm={confirmDelete}
        />
      </Suspense>
    </div>
  );
}
