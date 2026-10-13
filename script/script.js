// Mengambil elemen HTML berdasarkan ID dan Class
const inputTodo = document.getElementById("todo");
const inputTanggal = document.getElementById("tanggal");
const outputBox = document.querySelector(".isi");
const delBtn = document.querySelector(".del");
const filterBtn = document.querySelector(".fil");

// Status untuk filter
let filterAktif = false;

// Fungsi bantuan: mengecek jika list kosong, tampilkan kembali teks placeholder
function cekListKosong() {
    const sisaItem = outputBox.querySelectorAll(".item");
    if (sisaItem.length === 0) {
        outputBox.innerHTML = `<p id="output">Belum ada tugas</p>`;
    }
}

// Fungsi menambah tugas baru
function tambah() {
    const teks = inputTodo.value.trim();
    const tgl = inputTanggal.value;

    // Validasi sederhana: pastikan input tidak kosong
    if (!teks || !tgl) {
        alert("Silakan isi nama tugas dan tanggal terlebih dahulu!");
        return;
    }

    // Hapus placeholder jika masih ada
    const placeholder = document.getElementById("output");
    if (placeholder) {
        placeholder.remove();
    }

    // 1. Buat kontainer untuk item tugas
    const item = document.createElement("div");
    item.className = "item";

    // 2. Buat pembungkus teks dan tanggal
    const info = document.createElement("div");
    info.className = "item-info";

    // 3. Elemen teks tugas
    const tulisan = document.createElement("p");
    tulisan.className = "item-text";
    tulisan.textContent = teks;
    tulisan.title = "Klik teks untuk menandai selesai";

    // 4. Elemen badge tanggal tugas
    const tanggalBadge = document.createElement("span");
    tanggalBadge.className = "item-date";
    tanggalBadge.textContent = `📅 ${tgl}`;

    // Masukkan judul & tanggal ke pembungkus info
    info.appendChild(tulisan);
    info.appendChild(tanggalBadge);

    // 5. Tombol hapus satuan (✕)
    const hapus = document.createElement("button");
    hapus.className = "btn-delete-item";
    hapus.textContent = "✕";
    hapus.title = "Hapus tugas";
    hapus.onclick = () => {
        item.remove();
        cekListKosong();
    };

    // Fitur klik tulisan untuk menandai selesai / belum selesai (coret teks)
    tulisan.onclick = () => {
        item.classList.toggle("completed");

        // Jika filter aktif, sembunyikan jika sudah selesai
        if (filterAktif && item.classList.contains("completed")) {
            item.style.display = "none";
        }
    };

    // Gabungkan info dan tombol hapus ke dalam elemen item
    item.appendChild(info);
    item.appendChild(hapus);

    // Masukkan item ke dalam box output
    outputBox.appendChild(item);

    // Reset input setelah berhasil menambahkan
    inputTodo.value = "";
    inputTanggal.value = "";
    inputTodo.focus();
}

// Fitur Delete All: Menghapus seluruh tugas
delBtn.onclick = () => {
    outputBox.innerHTML = `<p id="output">Belum ada tugas</p>`;
    if (filterAktif && filterBtn) {
        filterAktif = false;
        filterBtn.classList.remove("active");
        filterBtn.textContent = "FILTER";
    }
};

// Fitur Filter: Sembunyikan tugas yang sudah selesai / tampilkan semua
if (filterBtn) {
    filterBtn.onclick = () => {
        const items = outputBox.querySelectorAll(".item");
        if (items.length === 0) return;

        filterAktif = !filterAktif;
        filterBtn.classList.toggle("active");
        filterBtn.textContent = filterAktif ? "SHOW ALL" : "FILTER";

        items.forEach((item) => {
            if (filterAktif && item.classList.contains("completed")) {
                item.style.display = "none";
            } else {
                item.style.display = "flex";
            }
        });
    };
}

// Shortcut: Tekan 'Enter' pada input todo untuk langsung menambahkan
inputTodo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        tambah();
    }
});