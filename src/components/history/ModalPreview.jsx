export default function ModalPreview({ items, onClose }) {
  if (!items || items.length === 0) return null;

  // Hitung total semua
  const totalAll = items.reduce((sum, item) => 
    sum + ((item.price || 0) * (item.quantity || 1)), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 max-h-[70vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Detail Riwayat</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center py-3 border-b last:border-0"
            >
              <div>
                <p className="font-medium text-gray-800">{item.name || "Unknown Item"}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                    {item.quantity || 1}x
                  </span>
                  <span className="text-xs text-gray-500">
                    Rp {item.price?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold text-gray-900 block">
                  Rp {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  item.action === 'ADD' ? 'bg-green-100 text-green-800' :
                  item.action === 'EDIT' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.action || "ADD"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer dengan total */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center font-bold text-gray-800">
            <span>Total Keseluruhan:</span>
            <span className="text-lg">Rp {totalAll.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}