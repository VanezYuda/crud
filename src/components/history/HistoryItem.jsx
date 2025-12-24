import { MdAdd, MdEdit, MdDelete } from "react-icons/md";

export default function HistoryItem({ item }) {

  if (!item) return null;

  const config = {
    ADD: {
      color: "bg-green-100 text-green-700",
      icon: <MdAdd />,
    },
    EDIT: {
      color: "bg-yellow-100 text-yellow-700",
      icon: <MdEdit />,
    },
    DELETE: {
      color: "bg-red-100 text-red-700",
      icon: <MdDelete />,
    },
  };

  const action = item.action || "ADD";
  const { color, icon } = config[action] || config.ADD;
  const price = Number(item.price) || 0;

  return (
    <div className="flex justify-between items-center py-2 px-2 rounded-md hover:bg-gray-50 transition text-sm">
      <div className="flex items-center gap-2">
        <span
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}
        >
          {icon}
          {action}
        </span>
        <span className="text-gray-700">{item.name || "Unknown Item"}</span>
      </div>

      <div className="flex flex-col items-end">
        {/* HARGA HARUS MUNCUL DI SINI */}
        <span className="text-gray-700 font-medium">
          Rp {price.toLocaleString()}
        </span>
        <span className="text-gray-400 text-xs whitespace-nowrap">
          {item.time || ""}
        </span>
      </div>
    </div>
  );
}