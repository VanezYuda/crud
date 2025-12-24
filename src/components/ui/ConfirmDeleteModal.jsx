import { XMarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="relative bg-white rounded-xl w-80 p-6 shadow-lg">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Icons */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <h2 className="text-center text-lg font-semibold mb-2">
          Hapus Data
        </h2>
        <p className="text-center text-sm text-gray-500 mb-5">
          Yakin mau hapus data ini?  
          Tindakan ini tidak bisa dibatalkan.
        </p>

        {/* Aksi */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
