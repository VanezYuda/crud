import { useState, useEffect } from "react";
import ProductDetailModal from "./ProductDetailModal";

export default function ProductList({ products }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [produkFilter, setProdukFilter] = useState(products);
  const [pencarian, setPencarian] = useState("");

  useEffect(() => {
    if (!pencarian) {
      setProdukFilter(products);
      return;
    }
    
    const hasil = products.filter(produk => 
      produk.title.toLowerCase().includes(pencarian.toLowerCase()) ||
      produk.description.toLowerCase().includes(pencarian.toLowerCase())
    );
    setProdukFilter(hasil);
  }, [products, pencarian]);

  const bukaModal = (produk) => {
    setSelectedProduct(produk);
    setIsOpen(true);
  };

  const tutupModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Daftar Produk
          </h1>
          <p className="text-gray-600">Jelajahi koleksi produk kami</p>
        </div>

        {/* Pencarian */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari produk..."
            value={pencarian}
            onChange={(e) => setPencarian(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Grid Produk */}
        {produkFilter.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Produk tidak ditemukan</p>
            {pencarian && (
              <button 
                onClick={() => setPencarian("")}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                Hapus pencarian
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600 text-sm">
              {produkFilter.length} produk ditemukan
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {produkFilter.map((produk) => (
                <div
                  key={produk.id}
                  className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Gambar */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={produk.thumbnail}
                      alt={produk.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                    {produk.discountPercentage && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Diskon {Math.round(produk.discountPercentage)}%
                      </div>
                    )}
                  </div>

                  {/* Info Produk */}
                  <div className="p-4">
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      {produk.category}
                    </div>
                    
                    <h3 className="font-bold text-gray-800 line-clamp-1 mb-1">
                      {produk.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-green-600">
                        ${produk.price}
                      </span>
                      {produk.discountPercentage && (
                        <span className="text-sm text-gray-400 line-through">
                          ${((produk.price * 100) / (100 - produk.discountPercentage)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {produk.description}
                    </p>
                    
                    <button
                      onClick={() => bukaModal(produk)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <ProductDetailModal
        isOpen={isOpen}
        product={selectedProduct}
        onClose={tutupModal}
      />
    </div>
  );
}