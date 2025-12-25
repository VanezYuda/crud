import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fruitSchema } from "../../schemas/fruitSchema";

export default function FruitForm({ onSubmit, defaultValues }) {
  // Mode edit ditentukan dari defaultValues
  const isEdit = useMemo(() => {
    return defaultValues && Object.keys(defaultValues).length > 0;
  }, [defaultValues]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(fruitSchema),
    defaultValues: {
      nama: "",
      harga: "",
      stok: "",
      kategori: "",
      kualitas: "",
      tanggalMasuk: "",
      ...defaultValues,
    },
  });

  // Reset form ketika mode berubah (tambah ↔ edit)
  useEffect(() => {
    reset({
      nama: "",
      harga: "",
      stok: "",
      kategori: "",
      kualitas: "",
      tanggalMasuk: "",
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
      {/* Header */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          {isEdit ? "Edit Data Buah" : "Tambah Data Buah"}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Lengkapi data buah dengan benar
        </p>
      </div>

      {/* Nama */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Buah
        </label>
        <input
          {...register("nama")}
          placeholder="Contoh: Apel Fuji"
          className={`w-full rounded-xl border px-4 py-2 text-sm outline-none transition
            ${
              errors.nama
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            }`}
        />
        {errors.nama && (
          <p className="text-xs text-red-500 mt-1">
            {errors.nama.message}
          </p>
        )}
      </div>

      {/* Harga & Stok */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Harga
          </label>
          <input
            type="number"
            {...register("harga", { valueAsNumber: true })}
            placeholder="Contoh: 15000"
            className={`w-full rounded-xl border px-4 py-2 text-sm outline-none transition
              ${
                errors.harga
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              }`}
          />
          {errors.harga && (
            <p className="text-xs text-red-500 mt-1">
              {errors.harga.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stok
          </label>
          <input
            type="number"
            {...register("stok", { valueAsNumber: true })}
            placeholder="Jumlah stok"
            className={`w-full rounded-xl border px-4 py-2 text-sm outline-none transition
              ${
                errors.stok
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              }`}
          />
          {errors.stok && (
            <p className="text-xs text-red-500 mt-1">
              {errors.stok.message}
            </p>
          )}
        </div>
      </div>

      {/* Kategori */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kategori
        </label>
        <select
          {...register("kategori")}
          className={`w-full rounded-xl border px-4 py-2 text-sm bg-white outline-none transition
            ${
              errors.kategori
                ? "border-red-500"
                : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            }`}
        >
          <option value="">Pilih Kategori</option>
          <option value="Lokal">Lokal</option>
          <option value="Import">Import</option>
        </select>
      </div>

      {/* Kualitas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kualitas
        </label>
        <select
          {...register("kualitas")}
          className={`w-full rounded-xl border px-4 py-2 text-sm bg-white outline-none transition
            ${
              errors.kualitas
                ? "border-red-500"
                : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            }`}
        >
          <option value="">Pilih Kualitas</option>
          <option value="A">A (Premium)</option>
          <option value="B">B (Baik)</option>
          <option value="C">C (Standar)</option>
        </select>
      </div>

      {/* Tanggal */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tanggal Masuk
        </label>
        <input
          type="date"
          {...register("tanggalMasuk")}
          className={`w-full rounded-xl border px-4 py-2 text-sm outline-none transition
            ${
              errors.tanggalMasuk
                ? "border-red-500"
                : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            }`}
        />
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded-xl py-2.5 text-sm sm:text-base text-white font-medium transition
          ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : isEdit
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }
          active:scale-[0.98] shadow-lg`}
      >
        {isSubmitting
          ? isEdit
            ? "Mengupdate..."
            : "Menyimpan..."
          : isEdit
          ? "Update Data"
          : "Simpan Data"}
      </button>
    </form>
  );
}
