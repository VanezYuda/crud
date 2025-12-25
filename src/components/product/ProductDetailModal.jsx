export default function ProductDetailModal({
  isOpen,
  product,
  onClose,
}) {
  if (!isOpen || !product) return null;

  return (
    <div className="
      fixed inset-0 z-50 flex items-center justify-center
    ">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="
          absolute inset-0 bg-black/40 backdrop-blur-sm
        "
      />

      {/* MODAL */}
      <div className="
        relative bg-white rounded-lg p-6
        w-[90%] max-w-lg z-10
      ">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded mb-4"
        />

        <h2 className="text-xl font-bold mb-2">
          {product.title}
        </h2>

        <p className="text-gray-700 mb-2">
          {product.description}
        </p>

        <p className="text-green-600 font-bold text-lg">
          ${product.price}
        </p>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="
              px-4 py-2 bg-gray-200 rounded
              hover:bg-gray-300
            "
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
