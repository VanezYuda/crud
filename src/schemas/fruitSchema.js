import { z } from "zod";

export const fruitSchema = z.object({
  nama: z
    .string()
    .min(2, "Nama buah minimal 2 karakter"),
  harga: z
    .number({ invalid_type_error: "Harga wajib diisi" })
    .min(1000, "Harga minimal Rp 1.000"),
  stok: z
    .number({ invalid_type_error: "Stok wajib diisi" })
    .min(1, "Stok minimal 1"),
  kategori: z
    .string()
    .nonempty("Kategori wajib dipilih"),
  kualitas: z
    .string()
    .nonempty("Kualitas wajib dipilih"),
  tanggalMasuk: z
    .string()
    .nonempty("Tanggal masuk wajib diisi"),
});
