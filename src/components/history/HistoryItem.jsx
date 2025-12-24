import { MdAdd, MdEdit, MdDelete } from "react-icons/md";

export default function HistoryItem({ item }) {
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

  const { color, icon } = config[item.action] || {};

  return (
    <div className="flex justify-between items-center py-2 px-2 rounded-md hover:bg-gray-50 transition text-sm">
      <div className="flex items-center gap-2">
        <span
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}
        >
          {icon}
          {item.action}
        </span>
        <span className="text-gray-700">{item.name}</span>
      </div>

      <span className="text-gray-400 text-xs whitespace-nowrap">
        {item.time}
      </span>
    </div>
  );
}
