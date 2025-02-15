// headerFooterManager.js
document.addEventListener("DOMContentLoaded", function () {
  const base = document.querySelector("base")?.getAttribute("href") || ".";
  
  // ======================
  // Header Template
  // ======================
  const header = `
    <header class="main-header">
      <div class="header-container">
        <a href="${base}/index.html" class="logo-link">
          <img src="${base}/images/logo.webp" alt="شعار العيادة" 
               class="header-logo" width="50" height="50">
        </a>
        <button id="menu-toggle" class="menu-toggle" 
                aria-label="فتح القائمة" aria-expanded="false">
          &#9776;
        </button>
        <nav id="main-menu" class="main-menu" aria-label="القائمة الرئيسية">
          <ul class="menu-list">
            ${[
              {text: 'الرئيسية', href: 'index.html'},
              {text: 'عن الدكتور', href: 'about/index.html'},
              {text: 'مشاكل المسالك', href: 'مشاكل_المسالك_البولية/index.html'},
              {text: 'الخدمات', href: 'services/index.html'},
              {text: 'الأسئلة الشائعة', href: 'FAQ/index.html'},
              {text: 'حجز موعد', href: 'reservations/index.html'},
              {text: 'تواصل معنا', href: 'contactUs/index.html'}
            ].map(item => `
              <li class="menu-item">
                <a href="${base}/${item.href}" class="menu-link">${item.text}</a>
              </li>
            `).join('')}
          </ul>
        </nav>
      </div>
    </header>`;

  // ======================
  // Footer Template
  // ======================
  const footer = `
    <footer class="main-footer">
      <div class="footer-content">
        <!-- Footer content remains similar but with semantic classes -->
      </div>
    </footer>`;

  // ======================
  // Injection & Functionality
  // ======================
  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);

  // Menu Toggle Functionality
  const menuToggle = document.getElementById("menu-toggle");
  const mainMenu = document.getElementById("main-menu");
  
  const toggleMenu = () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    mainMenu.classList.toggle("menu-visible");
    mainMenu.style.display = isExpanded ? "none" : "block";
  };

  menuToggle.addEventListener("click", toggleMenu);
  
  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mainMenu.style.display = "none";
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // ======================
  // Performance Monitoring (Optional)
  // ======================
  window.addEventListener("load", () => {
    if ("performance" in window) {
      const perfEntries = performance.getEntriesByType("paint");
      const fcp = perfEntries.find(entry => entry.name === "first-contentful-paint");
      if (fcp) console.log("First Contentful Paint:", fcp.startTime);
    }
  });
});