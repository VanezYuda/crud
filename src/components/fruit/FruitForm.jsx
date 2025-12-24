import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fruitSchema } from "../../schemas/fruitSchema";

export default function FruitForm({ onSubmit, defaultValues }) {
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

  // Reset form saat mode edit / tambah berubah
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
          Form Data Buah
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
          <p className="text-xs text-red-500 mt-1">{errors.nama.message}</p>
        )}
      </div>

      {/* harga & stok */}
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
            <p className="text-xs text-red-500 mt-1">{errors.harga.message}</p>
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
            <p className="text-xs text-red-500 mt-1">{errors.stok.message}</p>
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

      {/* kualitas */}
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

      {/* tanggal */}
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

      {/* tombol */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded-xl py-2.5 text-sm sm:text-base text-white font-medium transition
      ${
        isSubmitting
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
      }
      shadow-lg`}
      >
        {isSubmitting ? "Menyimpan..." : "Simpan Data"}
      </button>
    </form>
  );
}
