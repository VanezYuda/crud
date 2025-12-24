export default function FruitModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-end md:items-center justify-center
        bg-black/40 p-2 md:p-4
      "
    >
      <div
        className="
          relative
          w-full md:max-w-lg
          max-h-[90vh]
          bg-white
          rounded-t-2xl md:rounded-2xl
          shadow-xl
          flex flex-col
          animate-scaleIn
        "
      >
        {/* content */}
        <div className="p-4 md:p-6 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-3 md:px-6 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="
              rounded-md
              px-4 py-2
              text-sm font-medium
              text-gray-600
              hover:bg-gray-100
              transition
            "
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
