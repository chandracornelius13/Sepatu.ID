document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil semua elemen yang dibutuhkan
    // Mengambil semua input checkbox yang ada di dalam sidebar
    const checkboxes = document.querySelectorAll('.sidebar input[type="checkbox"]');
    // Mengambil semua kartu produk
    const cards = document.querySelectorAll('.product-card');

    // 2. Fungsi Utama Filter
    function filterProducts() {
        // --- Ambil status checkbox BRAND ---
        // Menggunakan optional chaining (?.) untuk menghindari error jika elemen tidak ditemukan
        const nikeChecked = document.getElementById('nike')?.checked;
        const adidasChecked = document.getElementById('adidas')?.checked;
        const pumaChecked = document.getElementById('puma')?.checked;

        // --- Ambil status checkbox HARGA ---
        const p1Checked = document.getElementById('p1')?.checked; // Di bawah 1 Juta
        const p2Checked = document.getElementById('p2')?.checked; // 1 - 2 Juta
        const p3Checked = document.getElementById('p3')?.checked; // Di atas 2 Juta

        // Cek apakah user sedang mengaktifkan filter
        const isBrandFilterActive = nikeChecked || adidasChecked || pumaChecked;
        const isPriceFilterActive = p1Checked || p2Checked || p3Checked;

        // Loop ke setiap kartu produk untuk cek apakah cocok dengan filter
        cards.forEach(card => {
            // Ambil data teks dari kartu produk (Brand dan Harga)
            const brandElement = card.querySelector('.brand');
            const priceElement = card.querySelector('.price');

            // Pastikan elemen ada sebelum membaca datanya
            if (!brandElement || !priceElement) return;

            const brandText = brandElement.innerText.toLowerCase();
            const priceText = priceElement.innerText;
            
            // Ubah harga dari string "Rp 1.500.000" menjadi angka murni 1500000
            // replace(/[^0-9]/g, '') membuang semua karakter selain angka
            const priceValue = parseInt(priceText.replace(/[^0-9]/g, ''));

            // --- LOGIKA PENCOCOKAN BRAND ---
            let brandMatch = false;
            if (!isBrandFilterActive) {
                brandMatch = true; // Jika tidak ada brand dicentang, anggap cocok semua
            } else {
                if (nikeChecked && brandText.includes('nike')) brandMatch = true;
                if (adidasChecked && brandText.includes('adidas')) brandMatch = true;
                if (pumaChecked && brandText.includes('puma')) brandMatch = true;
            }

            // --- LOGIKA PENCOCOKAN HARGA ---
            let priceMatch = false;
            if (!isPriceFilterActive) {
                priceMatch = true; // Jika tidak ada harga dicentang, anggap cocok semua
            } else {
                if (p1Checked && priceValue < 1000000) priceMatch = true;
                if (p2Checked && priceValue >= 1000000 && priceValue <= 2000000) priceMatch = true;
                if (p3Checked && priceValue > 2000000) priceMatch = true;
            }

            // --- KEPUTUSAN AKHIR ---
            // Tampilkan HANYA jika Brand cocok DAN Harga cocok
            if (brandMatch && priceMatch) {
                card.style.display = 'flex'; // Munculkan produk
                
                // Efek animasi fade-in sederhana
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.display = 'none'; // Sembunyikan produk
            }
        });
        
        // Refresh AOS (Library animasi scroll) jika dipakai, agar posisi animasi dihitung ulang
        if (typeof AOS !== 'undefined') {
            setTimeout(() => { AOS.refresh(); }, 100);
        }
    }

    // 3. Pasang Event Listener ke semua checkbox
    // Agar setiap kali diklik, fungsi filterProducts langsung jalan
    checkboxes.forEach(box => {
        box.addEventListener('change', filterProducts);
    });
});

// --- TAMBAHAN: LOGIKA BUKA/TUTUP FILTER MOBILE ---
const openFilterBtn = document.getElementById('openFilterBtn');
const closeFilterBtn = document.getElementById('closeFilterBtn');
const filterSidebar = document.getElementById('filterSidebar');
const filterOverlay = document.getElementById('filterOverlay');

// Fungsi Buka Sidebar
if (openFilterBtn) {
    openFilterBtn.addEventListener('click', () => {
        filterSidebar.classList.add('active');
        filterOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Matikan scroll halaman belakang
    });
}

// Fungsi Tutup Sidebar
function closeFilter() {
    if (filterSidebar) {
        filterSidebar.classList.remove('active');
        filterOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Nyalakan scroll halaman lagi
    }
}

// Pasang event listener untuk menutup
if (closeFilterBtn) {
    closeFilterBtn.addEventListener('click', closeFilter);
}

if (filterOverlay) {
    filterOverlay.addEventListener('click', closeFilter); // Klik area gelap untuk menutup
}