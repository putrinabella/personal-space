import { pgSchema, uuid } from "drizzle-orm/pg-core";

export const authSchema = pgSchema("auth");

export const users = authSchema.table(
  "users",
  {
    id: uuid("id").primaryKey(),
    // Jangan tambahkan kolom lain dari Supabase di sini jika tidak ingin mengelolanya
  },
  (table) => {
    return {
      // Ini memberi tahu Drizzle untuk tidak mengubah tabel ini
      // Sayangnya Drizzle belum punya opsi "ignore" penuh,
      // jadi trik terbaik adalah membiarkannya saja atau
      // pastikan tidak ada perubahan struktur di sini.
    };
  },
);
