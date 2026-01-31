document.addEventListener("DOMContentLoaded", () => {
    // --- EXISTING NAVBAR LOGIC (Wrapped to prevent errors) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".main-nav");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".main-nav a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    // --- THEME TOGGLE LOGIC ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Icons
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';

    // Check Local Storage
    const savedTheme = localStorage.getItem("theme");
    
    // Apply saved theme
    if (savedTheme === "dark") {
        body.setAttribute("data-theme", "dark");
        if(themeToggleBtn) themeToggleBtn.innerHTML = sunIcon;
    }

    // Toggle Event
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            if (body.getAttribute("data-theme") === "dark") {
                // Switch to Light
                body.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
                themeToggleBtn.innerHTML = moonIcon;
            } else {
                // Switch to Dark
                body.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                themeToggleBtn.innerHTML = sunIcon;
            }
        });
    }
});