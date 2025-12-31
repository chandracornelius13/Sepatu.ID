/* DATA PRODUK (DATABASE MINI) 
   Pastikan path gambar '../asset/picture/...' dan link '../produk/...' 
   sudah sesuai. Script ini mengasumsikan dijalankan dari folder 'utama' atau 'produk'.
*/

const products = [
    { name: "Nike Dunk Low Retro", price: "Rp 506.850", img: "../asset/picture/Nike Dunk Low.webp", link: "../produk/Nike Dunk Low.html" },
    { name: "Nike P-6000 Premium", price: "Rp 2.325.400", img: "../asset/picture/p6000.webp", link: "../produk/(KERJAIN p6000).html" },
    { name: "Adidas Samba OG", price: "Rp 1.525.000", img: "../asset/picture/Samba.webp", link: "../produk/(KERJAIN SAMBA).html" },
    { name: "Adidas Handball Spezial", price: "Rp 899.000", img: "../asset/picture/Spezial.webp", link: "../produk/(KERJAIN SPEZIAL).html" },
    { name: "Puma Speedcat OG", price: "Rp 1.700.000", img: "../asset/picture/Speedcat.webp", link: "../produk/(KERJAIN SPEEDCAT).html" },
    { name: "Puma Palermo Special", price: "Rp 1.999.000", img: "../asset/picture/PALERMO.webp", link: "../produk/(KERJAIN PALERMO).html" },
    { name: "Adidas SL 72 RS", price: "Rp 1.600.000", img: "../asset/picture/SL72.webp", link: "../produk/(KERJAIN SL72).html" },
    { name: "Nike Air Max 90", price: "Rp 2.200.000", img: "../asset/picture/AIR MAX.webp", link: "../produk/(KERJAIN AIR MAX).html" },
    { name: "Puma Turino FSL", price: "Rp 1.200.000", img: "../asset/picture/Turino.webp", link: "../produk/(KERJAIN TURINO).html" }
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Deteksi Lokasi File untuk memperbaiki Link jika kita sedang di folder 'produk'
// Karena link di data di atas menggunakan '../produk/', jika kita SUDAH di folder produk,
// kita harus menghapus '../produk/' agar linknya valid.
const currentPath = window.location.pathname;
const isProductFolder = currentPath.includes('/produk/');

searchInput.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    
    // Hapus hasil sebelumnya
    searchResults.innerHTML = '';

    if (searchString.length === 0) {
        searchResults.classList.remove('active');
        return;
    }

    // Filter Produk
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchString);
    });

    // Tampilkan Hasil
    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            // Perbaikan Link Dinamis
            let finalLink = product.link;
            let finalImg = product.img;

            // Jika kita sedang membuka file di folder 'produk', sesuaikan pathnya
            if (isProductFolder) {
                finalLink = product.link.replace('../produk/', ''); 
                // Gambar tetap pakai ../asset karena folder asset biasanya di luar folder produk
            }

            const item = document.createElement('a');
            item.classList.add('search-item');
            item.href = finalLink; // Link menuju halaman detail
            
            item.innerHTML = `
                <img src="${finalImg}" alt="${product.name}">
                <div class="search-info">
                    <h4>${product.name}</h4>
                    <span>${product.price}</span>
                </div>
            `;
            
            searchResults.appendChild(item);
        });
        searchResults.classList.add('active');
    } else {
        searchResults.classList.remove('active');
    }
});

// Tutup dropdown jika klik di luar
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
    }
});