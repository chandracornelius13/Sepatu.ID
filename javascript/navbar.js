const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".main-nav");

hamburger.addEventListener("click", () => {
    // Toggle class 'active' pada hamburger (animasi jadi X)
    hamburger.classList.toggle("active");
    // Toggle class 'active' pada menu (muncul/hilang)
    navMenu.classList.toggle("active");
});

// Fitur tambahan: Tutup menu jika salah satu link diklik
document.querySelectorAll(".main-nav a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));