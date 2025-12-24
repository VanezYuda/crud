import { useState } from "react";
import { MdHistory } from "react-icons/md";
import { getHistory } from "../../utils/historyStorage";
import HistoryItem from "./HistoryItem";
import ModalPreview from "./ModalPreview"; // JANGAN LUPA IMPORT

export default function HistoryList() {
  const history = getHistory() || [];
  const [isModalOpen, setIsModalOpen] = useState(false); // TAMBAH STATE INI

  // Grouping untuk modal preview
  const groupedHistory = Object.values(
    history.reduce((acc, item) => {
      if (!item?.name) return acc;
      
      if (!acc[item.name]) {
        acc[item.name] = { 
          ...item, 
          quantity: 1, 
          price: item.price ?? 0 
        };
      } else {
        acc[item.name].quantity += 1;
        acc[item.name].price += item.price ?? 0;
      }
      return acc;
    }, {})
  );

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <MdHistory className="text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-700">
            Riwayat Aktivitas
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            {history.length} aktivitas
          </span>
          {/* ✅ TOMBOL PREVIEW KEMBALI DITAMBAHKAN */}
          {history.length > 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Preview
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {history.length === 0 ? (
        <div className="py-6 text-center text-gray-400 text-sm">
          <p>Belum ada aktivitas</p>
          <p className="text-xs italic">
            Tambah, edit, atau hapus data untuk melihat riwayat
          </p>
        </div>
      ) : (
        <div className="max-h-64 overflow-y-auto px-2 py-1 divide-y">
          {history.map((item, index) => (
            <HistoryItem 
              key={item?.id || `history-${index}`} 
              item={item} 
            />
          ))}
        </div>
      )}

      {/* ✅ MODAL PREVIEW */}
      {isModalOpen && (
        <ModalPreview
          items={groupedHistory}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}