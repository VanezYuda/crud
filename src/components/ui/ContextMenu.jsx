import { useEffect, useRef } from "react";

export default function ContextMenu({
  position,
  onEdit,
  onDelete,
  onClose,
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-45 rounded-xl border bg-white shadow-lg"
      style={{ top: position.y, left: position.x }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="w-full px-4 py-3 text-left hover:bg-gray-50"
      >
        Edit
      </button>

      <div className="h-px bg-gray-100" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
      >
        Hapus
      </button>
    </div>
  );
}
