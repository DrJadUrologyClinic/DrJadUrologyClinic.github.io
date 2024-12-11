// headerFooterManager.js
document.addEventListener("DOMContentLoaded", function () {
  const base = document.querySelector("base")?.getAttribute("href") || ".";

  // Add Header with Centered Menu Toggle
  const header = `
    <header style="background-color: rgb(25, 39, 51, 1); color: rgb(43, 245, 255, 1); padding: 10px; direction: rtl; text-align: center;">
      <div style="display: flex; justify-content: center; align-items: center;">
        <!-- Logo -->
        <a href="${base}/index.html" style="position: absolute; left: 10px; top: 10px;">
          <img src="${base}/images/logo.webp" alt="Logo" style="width: 50px; height: 50px; object-fit: contain; border-radius: 50%;">
        </a>
        <!-- Centered Menu Toggle -->
        <button id="menu-toggle" aria-label="menu toggle" style="background: none; border: none; color: rgb(43, 245, 255, 1); font-size: 2em; cursor: pointer;">
          &#9776;
        </button>
      </div>
      <!-- Hidden Navigation Menu -->
      <nav id="menu" style="display: none; flex-direction: column; position: absolute; top: 60px; right: 50%; transform: translateX(50%); background: rgb(25, 39, 51, 1); border: 2px solid rgb(43, 245, 255, 1); border-radius: 5px; padding: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">
        <ul style="list-style: none; padding: 0; margin: 0; text-align: center;">
          <li style="margin: 10px 0;"><a href="${base}/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1); font-size: 1.2em;">الرئيسية</a></li>
          <li style="margin: 10px 0;"><a href="${base}/about/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1); font-size: 1.2em;">عن الدكتور</a></li>
          <li style="margin: 10px 0;"><a href="${base}/مشاكل_المسالك_البولية/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1); font-size: 1.2em;">مشاكل المسالك</a></li>
          <li style="margin: 10px 0;"><a href="${base}/services/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1); font-size: 1.2em;">الخدمات</a></li>
          <li style="margin: 10px 0;"><a href="${base}/FAQ/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1); font-size: 1.2em;">الأسئلة الشائعة</a></li>
          <li style="margin: 10px 0;"><a href="${base}/reservations/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1); font-size: 1.2em;">حجز موعد</a></li>
          <li style="margin: 10px 0;"><a href="${base}/contactUs/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1); font-size: 1.2em;">تواصل معنا</a></li>
        </ul>
      </nav>
    </header>
  `;

  // Updated Footer
const footer = `
<footer style="background-color: rgb(25, 39, 51, 1); color: rgb(43, 245, 255, 1); padding: 20px; width: 100%; text-align: center; font-size: 0.9em;">
  <div style="max-width: 1200px; margin: auto; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 20px; align-items: flex-start;">
    <!-- Logo and Name -->
    <div style="flex: 1; min-width: 200px; text-align: center;">
      <a href="${base}/index.html">
        <img src="${base}/images/logo.webp" alt="Logo" style="width: 60px; height: 60px; object-fit: contain; border-radius: 50%; margin-bottom: 10px;">
      </a>
      <p style="margin: 5px 0; font-size: 1.1em;">عيادة الدكتور جاد الصمادي</p>
    </div>

    <!-- Footer Links -->
    <div style="flex: 2; display: flex; justify-content: space-between; gap: 15px; flex-wrap: wrap;">
      <!-- Clinic Links -->
      <div>
        <h4 style="margin-bottom: 10px; font-size: 1em;">العيادة</h4>
        <ul style="list-style: none; padding: 0; margin: 0; text-align: right;">
          <li><a href="${base}/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1);">الرئيسية</a></li>
          <li><a href="${base}/about/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1);">عن الدكتور</a></li>
          <li><a href="${base}/reservations/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1);">حجز موعد</a></li>
          <li><a href="${base}/location/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1);">الموقع</a></li>
        </ul>
      </div>

      <!-- Services Links -->
      <div>
        <h4 style="margin-bottom: 10px; font-size: 1em;">الخدمات</h4>
        <ul style="list-style: none; padding: 0; margin: 0; text-align: right;">
          <li><a href="${base}/services/flexibleCystoscopy/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1);">تنظير المثانة</a></li>
          <li><a href="${base}/services/urodynamicTesting/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1);">تخطيط ديناميكية المثانة</a></li>
          <li><a href="${base}/services/prostateBiopsy/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1);">خزعة البروستات</a></li>
          <li><a href="${base}/services/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1);">التصوير بالالتراساوند</a></li>
        </ul>
      </div>

      <!-- Contact Links -->
      <div>
        <h4 style="margin-bottom: 10px; font-size: 1em;">معلومات التواصل</h4>
        <ul style="list-style: none; padding: 0; margin: 0; text-align: right;">
          <li><a href="mailto:Jadsmadi@live.com" style="text-decoration: none; color: rgb(43, 245, 255, 1);">البريد الإلكتروني</a></li>
          <li><a href="https://wa.me/962778089234" target="_blank" style="text-decoration: none; color: rgb(43, 245, 255, 1);">واتساب</a></li>
          <li><a href="${base}/location/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1);">الموقع</a></li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Bottom Section -->
  <div style="margin-top: 20px; border-top: 1px solid rgb(43, 245, 255, 1); padding-top: 10px;">
    <p style="margin: 0;">&copy; 2024 عيادة الدكتور جاد الصمادي. جميع الحقوق محفوظة.</p>
    <ul style="list-style: none; display: flex; justify-content: center; gap: 15px; padding: 0; margin: 10px 0 0;">
      <li><a href="${base}/privacy-policy/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1);">سياسة الخصوصية</a></li>
      <li><a href="${base}/terms-and-conditions/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1);">الشروط والأحكام</a></li>
      <li><a href="${base}/contactUs/index.html" style="text-decoration: none; color: rgb(43, 245, 255, 1);">تواصل معنا</a></li>
    </ul>
  </div>
</footer>
`;


  // Inject Header and Footer
  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);

  // Toggle Menu Visibility
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.style.display = menu.style.display === "none" ? "flex" : "none";
  });
});
