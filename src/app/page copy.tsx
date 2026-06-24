"use client";

import { useEffect, useState } from "react";

// Definisikan tipe data sederhana untuk UI kita
interface FoodEntry {
  id: string;
  foodName: string;
  price: string;
  reviewText: string;
  ratingOverall: number;
  dateVisited: string;
  isFavoriteFood: boolean;
  category: { name: string; iconSlug: string };
  restaurant: { name: string; address: string };
  tags: { tag: { name: string; bgColor: string } }[];
}

export default function Home() {
  const [foods, setFoods] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  // Ambil data kuliner dari API route yang kita tes kemarin
  useEffect(() => {
    fetch("/api/food")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    // <div className="min-h-screen bg-base-100 bg-cute-grid pb-24 text-base-content relative">
    //   {/* 🥬 AREA KONTEN UTAMA */}
    //   <main className="max-w-2xl mx-auto px-4 py-8">
    //     <header className="text-center mb-8">
    //       <h1 className="heading-h1 text-[#FF7B9C]">Eunoia Diary 🎀</h1>
    //       <p className="text-subtitle mt-1">
    //         Fresh grid layout with a cute dock navbar
    //       </p>
    //     </header>

    //     {/* Contoh Kartu Jurnal Makanan */}
    //     <div className="bg-white border-4 border-neutral rounded-[32px] overflow-hidden shadow-[8px_8px_0px_rgba(74,62,61,1)]">
    //       <div className="bg-primary p-4 border-b-4 border-neutral text-center">
    //         <h2 className="heading-h2 text-primary-content">
    //           Welcome to My Garden! 🌿
    //         </h2>
    //       </div>
    //       <div className="p-6 space-y-4">
    //         <p className="text-body">
    //           Lihat ke belakang latar aplikasinya! Sekarang ada garis
    //           kotak-kotak samar transparan mirip buku harian sekolah yang imut
    //           banget.
    //         </p>
    //         <div className="p-4 bg-secondary/30 border-2 border-dashed border-primary rounded-2xl">
    //           <p className="text-data-body font-semibold">💡 Info Tip:</p>
    //           <p className="text-caption">
    //             Menu navigasi sekarang pindah ke bawah menggunakan Dock ala iOS
    //             yang fleksibel.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </main>

    //   {/* 📱 CUTE DOCK NAVBAR (Melayang di Bawah Tengah) */}
    //   <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
    //     <div className="dock bg-white border-4 border-neutral rounded-full px-4 py-2 shadow-[6px_6px_0px_rgba(74,62,61,1)] flex items-center gap-2">
    //       {/* Tombol Home */}
    //       <button
    //         onClick={() => setActiveTab("home")}
    //         className={`dock-item btn btn-circle btn-ghost transition-all duration-200 ${activeTab === "home" ? "bg-primary scale-110 border-2 border-neutral" : "text-2xl"}`}
    //       >
    //         {activeTab === "home" ? "🏡" : "🏠"}
    //       </button>

    //       {/* Tombol Add Food */}
    //       <button
    //         onClick={() => setActiveTab("add")}
    //         className={`dock-item btn btn-circle btn-ghost transition-all duration-200 ${activeTab === "add" ? "bg-secondary scale-110 border-2 border-neutral" : "text-2xl"}`}
    //       >
    //         {activeTab === "add" ? "✍️" : "📝"}
    //       </button>

    //       {/* Tombol Gallery / Stats */}
    //       <button
    //         onClick={() => setActiveTab("gallery")}
    //         className={`dock-item btn btn-circle btn-ghost transition-all duration-200 ${activeTab === "gallery" ? "bg-accent scale-110 border-2 border-neutral" : "text-2xl"}`}
    //       >
    //         {activeTab === "gallery" ? "💖" : "✨"}
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto bg-cute-grid">
      <div className="p-8 max-w-md mx-auto space-y-6">
        {/* Memakai class lama dengan tema warna baru */}
        <h1 className="heading-h1 text-primary-content bg-primary p-4 rounded-box text-center border-4 border-neutral shadow-[6px_6px_0px_rgba(74,62,61,1)]">
          Your Title Here! 🥬
        </h1>

        <p className="text-body">
          Ini adalah teks body yang ukurannya otomatis mengikuti setingan lamamu
          dan langsung berganti font tulisan tangan!
        </p>

        {/* Button bawaan DaisyUI yang otomatis bernuansa imut */}
        <div className="flex gap-2">
          <button className="btn btn-secondary border-2 border-neutral shadow-[4px_4px_0px_#4A3E3D]">
            🎁 Commissions
          </button>
          <button className="btn btn-accent border-2 border-neutral shadow-[4px_4px_0px_#4A3E3D]">
            📸 Gallery
          </button>
        </div>
      </div>
      <div className="bg-white border-4 border-[#4A3E3D] rounded-[32px] overflow-hidden shadow-[8px_8px_0px_#4A3E3D] max-w-md mx-auto">
        {/* Bagian Atas Kartu (Warna Hijau Kebun) */}
        <div className="bg-[#C5E384] p-4 border-b-4 border-[#4A3E3D] text-center">
          <h2 className="font-header text-2xl font-bold text-[#4A3E3D] tracking-wide">
            Your Title Here! 🥬
          </h2>
        </div>

        {/* Bagian Isi Konten */}
        <div className="p-6 bg-[#FFFDF6]">
          <h3 className="font-header text-xl text-[#4A3E3D] mb-2">
            My Untitled Site
          </h3>
          <p className="font-body text-base text-[#4A3E3D] leading-relaxed">
            Kombinasi font{" "}
            <span className="bg-[#EAF4D3] px-1 rounded font-bold text-emerald-800">
              Fredoka
            </span>{" "}
            dan{" "}
            <span className="bg-[#FFF1B5] px-1 rounded font-bold text-amber-800">
              Playpen Sans
            </span>{" "}
            bikin UI berasa hidup dan punya cita rasa *handcrafted art project*!
          </p>

          {/* Kotak Notes / Catatan khusus */}
          <div className="mt-4 p-4 bg-white border-2 border-dashed border-[#C5E384] rounded-2xl">
            <p className="font-header text-sm text-[#4A3E3D] mb-1">Notes! 📝</p>
            <ul className="font-body text-sm text-[#4A3E3D] space-y-1 list-disc list-inside">
              <li>Bikin nafsu makan naik pas lihat UI-nya.</li>
              <li>Segar, cerah, dan ramah di mata.</li>
            </ul>
          </div>
        </div>
      </div>
      {/* 👑 HEADER CUTE */}
      <header className="text-center mb-10 mt-4 relative">
        <span className="absolute -top-6 left-12 text-4xl animate-bounce">
          ✨
        </span>
        <h1 className="text-4xl font-extrabold text-[#FF7B9C] tracking-wide drop-shadow-sm">
          Eunoia Foodie Diary 🎀
        </h1>
        <p className="text-[#8A7A78] mt-2 text-lg italic">
          "What should I eat today? Let&apos;s trace back our favorite bites!"
        </p>
        <span className="absolute -bottom-2 right-12 text-3xl">🧋</span>
      </header>

      {/* 🪄 BUTTON UTAMA (SHUFFLE & ADD) */}
      <div className="flex gap-4 mb-8 justify-center">
        <button className="bg-[#FFB7B2] hover:bg-[#ffaba5] text-white font-bold px-5 py-3 rounded-2xl shadow-[4px_4px_0px_#4A3E3D] border-2 border-[#4A3E3D] transition-transform active:translate-y-1 active:shadow-none">
          🎲 Shuffle Diet!
        </button>
        <button className="bg-[#BFFCC6] hover:bg-[#a6f7b0] text-[#4A3E3D] font-bold px-5 py-3 rounded-2xl shadow-[4px_4px_0px_#4A3E3D] border-2 border-[#4A3E3D] transition-transform active:translate-y-1 active:shadow-none">
          ✍️ Log New Food
        </button>
      </div>

      {/* ⏳ LOADING STATE */}
      {loading && (
        <div className="text-center py-12 text-xl text-[#8A7A78]">
          <p className="animate-pulse">Cooking your memories... 🍳</p>
        </div>
      )}

      {/* 📭 KONDISI JIKA KOSONG */}
      {!loading && foods.length === 0 && (
        <div className="text-center py-12 border-4 border-dashed border-[#FFC6FF] rounded-3xl p-8 bg-white">
          <p className="text-2xl mb-2">Yikes, diary-nya masih kosong! 🍃</p>
          <p className="text-[#8A7A78]">
            Yuk, tambah ulasan makanan pertamamu sekarang!
          </p>
        </div>
      )}

      {/* 🍱 LIST JURNAL MAKANAN */}
      <div className="space-y-6">
        {foods.map((food) => (
          <article
            key={food.id}
            className="bg-white border-2 border-[#4A3E3D] rounded-3xl p-6 shadow-[6px_6px_0px_#4A3E3D] relative overflow-hidden transition-all hover:-translate-y-1"
          >
            {/* Ribbon Penanda Favorit */}
            {food.isFavoriteFood && (
              <div className="absolute top-0 right-0 bg-[#FFC6FF] text-[#4A3E3D] text-xs font-bold px-3 py-1 border-b-2 border-l-2 border-[#4A3E3D] rounded-bl-xl">
                ⭐ Best Pick!
              </div>
            )}

            {/* Nama Makanan & Kategori */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#E8AEB7] text-white text-xs px-2.5 py-1 rounded-full border border-[#4A3E3D]">
                {food.category?.name || "Food"}
              </span>
              <span className="text-xs text-[#8A7A78]">
                {new Date(food.dateVisited).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[#4A3E3D] mb-1">
              {food.foodName}
            </h3>

            {/* Tempat & Harga */}
            <p className="text-sm font-semibold text-[#FF7B9C] mb-3">
              📍 {food.restaurant?.name} • Rp{" "}
              {Number(food.price).toLocaleString("id-ID")}
            </p>

            {/* Review Box Tulisan Tangan */}
            <div className="bg-[#FFFDF6] border border-[#4A3E3D] rounded-2xl p-3 mb-4 text-base leading-relaxed text-[#5A4B4A] shadow-inner font-cute italic">
              "{food.reviewText || "No description left yet~"}"
            </div>

            {/* Bagian Bawah: Rating & Tags */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-dashed border-[#e3dcd2]">
              {/* Stars Score */}
              <div className="flex items-center gap-1 bg-[#FFEEBB] px-3 py-1 rounded-xl border border-[#4A3E3D] text-sm font-bold">
                💖 {food.ratingOverall}/10
              </div>

              {/* Tags Pastel */}
              <div className="flex flex-wrap gap-1.5">
                {food.tags?.map(({ tag }) => (
                  <span
                    key={tag.name}
                    className="text-xs px-2.5 py-1 rounded-lg font-bold border border-[#4A3E3D] text-white"
                    style={{ backgroundColor: tag.bgColor || "#A855F7" }}
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
