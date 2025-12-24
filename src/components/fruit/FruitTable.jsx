export default function FruitTable({
  fruits,
  onRightClick,
  onEdit,
  onDelete,
}) {
  //  empety state
  if (!fruits || fruits.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white py-14 text-center text-gray-400 shadow-sm cursor-pointer">
        <p className="text-sm font-medium">Data buah masih kosong</p>
        <p className="text-xs">Tambahkan data buah untuk memulai</p>
      </div>
    );
  }

  return (
    <>
      {/* tampil hanya di layar besar */}
      <div className="relative hidden lg:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "Nama Buah",
                "Harga",
                "Stok",
                "Kategori",
                "Kualitas",
                "Tanggal Masuk",
              ].map((title) => (
                <th
                  key={title}
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-600"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {fruits.map((f, i) => (
              <tr
                key={i}
                onContextMenu={(e) => onRightClick?.(e, i)}
                className="cursor-context-menu transition hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {f.nama}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  Rp{" "}
                  <span className="font-medium">
                    {Number(f.harga).toLocaleString("id-ID")}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex min-w-10 justify-center rounded-lg px-2 py-0.5 text-xs font-semibold
                      ${
                        f.stok <= 5
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-700"
                      }`}
                  >
                    {f.stok}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                    {f.kategori}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold
                      ${
                        f.kualitas === "A"
                          ? "bg-green-100 text-green-700"
                          : f.kualitas === "B"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {f.kualitas}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {f.tanggalMasuk}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile: 1 kolom | tablet: 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {fruits.map((f, i) => (
          <div
            key={i}
            className="rounded-xl border bg-white p-4 shadow-sm"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">
                {f.nama}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold
                  ${
                    f.kualitas === "A"
                      ? "bg-green-100 text-green-700"
                      : f.kualitas === "B"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
              >
                {f.kualitas}
              </span>
            </div>

            {/* content */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Harga:</span>{" "}
                Rp {Number(f.harga).toLocaleString("id-ID")}
              </p>

              <p>
                <span className="font-medium">Stok:</span>{" "}
                <span
                  className={`ml-1 rounded px-2 py-0.5 text-xs font-semibold
                    ${
                      f.stok <= 5
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-700"
                    }`}
                >
                  {f.stok}
                </span>
              </p>

              <p>
                <span className="font-medium">Kategori:</span>{" "}
                {f.kategori}
              </p>

              <p>
                <span className="font-medium">Tanggal:</span>{" "}
                {f.tanggalMasuk}
              </p>
            </div>

            {/* Aksi */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onEdit?.(i)}
                className="flex-1 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white active:scale-95"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete?.(i)}
                className="flex-1 rounded-lg bg-red-600 py-2 text-xs font-semibold text-white active:scale-95"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
