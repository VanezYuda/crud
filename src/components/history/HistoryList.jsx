import { MdHistory } from "react-icons/md";
import { getHistory } from "../../utils/historyStorage";
import HistoryItem from "./HistoryItem";

export default function HistoryList() {
  const history = getHistory();

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-gray-50 rounded-t-lg">
        <MdHistory className="text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-700">
          Riwayat Aktivitas
        </h3>
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
          {history.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
