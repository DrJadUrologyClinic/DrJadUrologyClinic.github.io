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
          <li style="margin: 10px 0;"><a href="${base}/index.html" style="text-decoration: none; font-size: 1.2em;">الرئيسية</a></li>
          <li style="margin: 10px 0;"><a href="${base}/about/index.html" style="text-decoration: none; font-size: 1.2em;">عن الدكتور</a></li>
          <li style="margin: 10px 0;"><a href="${base}/مشاكل_المسالك_البولية/index.html" style="text-decoration: none; font-size: 1.2em;">مشاكل المسالك</a></li>
          <li style="margin: 10px 0;"><a href="${base}/services/index.html" style="text-decoration: none; font-size: 1.2em;">الخدمات</a></li>
          <li style="margin: 10px 0;"><a href="${base}/FAQ/index.html" style="text-decoration: none; font-size: 1.2em;">الأسئلة الشائعة</a></li>
          <li style="margin: 10px 0;"><a href="${base}/reservations/index.html" style="text-decoration: none; font-size: 1.2em;">حجز موعد</a></li>
          <li style="margin: 10px 0;"><a href="${base}/location/index.html" style="text-decoration: none; font-size: 1.2em;">خارطة الموقع</a></li>
          <li style="margin: 10px 0;"><a href="${base}/contactUs/index.html" style="text-decoration: none; font-size: 1.2em;">تواصل معنا</a></li>
        </ul>
      </nav>
    </header>

    <style>
    #menu li:hover {
       background: rgb(25, 39, 51, 1);
      }
    </style>
  `;

 // Updated Footer
 const footer = `
<footer>
  <div class="content">
    <div class="top">

      <div class="logo-footer">
        <a href="${base}/index.html"><img src="${base}/images/logo.webp" alt="  شعار أفضل استشاري مسالك بولية في عمان أو أيقونة أفضل استشاري جراحة الكلى والمسالك و العقم و الإنجاب في عمان  " loading="lazy" width="150"  height="150"></a>
        <span class="logo-name"> عيادة الدكتور جاد الصمادي </span> 
      </div>

      <!--
      <div class="media-icons">
       <a href=""><img src="${base}/images/youtube.png"></a>
       <a href=""><img src="${base}/images/instagram.png"></a>
       <a href=""><img src="${base}/images/facebook.png"></a>
      </div>
      -->

    </div>

    <div class="link-boxes">
      <ul class="footer-box">
        <li class="footer-link-name">
             العيادة
        </li>
        <li><a href="${base}/index.html" title="الرئيسية - افضل دكتور كلى ومسالك في الاردن">الرئيسية</a></li>
        <li><a href="${base}/about/index.html" title="الدكتور جاد الصمادي - احسن استشاري مسالك وكلى وانجاب في الاردن">الدكتور جاد الصمادي</a></li>
        <li><a href="${base}/reservations/index.html" title="احجز موعد مع أفضل دكتور كلى ومسالك وعقم وانجاب في الاردن">المواعيد</a></li>
        <li><a href="${base}/location/index.html" title="موقع اشطر دكتور كلى ومسالك في الاردن">الموقع</a></li>
      </ul>
      <ul class="footer-box">
        <li class="footer-link-name">
             الخدمات
        </li>
        <li><a href="${base}/services/flexibleCystoscopy/index.html" title="أفضل دكتور تنظير مسالك ومثانة في الأردن">  تنظير المثانة </a></li>
        <li><a href="${base}/services/urodynamicTesting/index.html" title="أفضل دكتور مسالك تخطيط مثانة في الأردن">  تخطيط ديناميكية المثانة </a></li>
        <li><a href="${base}/services/prostateBiopsy/index.html" title="أفضل دكتور خزعة بروستات في الأردن">  خزعة البروستات </a></li>
        <li><a href="${base}/services/index.html" title="أفضل دكتور كلى ومسالك التراساوند في الأردن the best urologist ultrasound in Amman">  التصوير بالالتراساوند </a></li>
      </ul>
      <ul class="footer-box">
        <li class="footer-link-name">
          معلومات التواصل
        </li>
        <li><a href="mailto:Jadsmadi@live.com">  البريد الالكتروني </a></li>
        <li><a href="https://wa.me/962778089234" target="_blank" rel="noopener noreferrer"> تواصل معنا واتس أب </a></li>
        <li><a href="https://wa.me/962778089234" target="_blank" rel="noopener noreferrer">  962778089234+  </a></li>
        <li><a href="${base}/location/index.html" title="موقع احسن دكتور كلى ومسالك في الاردن">الموقع</a></li>
      </ul>
      <ul class="footer-box">
        <li class="footer-link-name">
          معلومات عامة
        </li>
        <li><a href="${base}/مشاكل_المسالك_البولية/أعراض_الكلى_والمسالك_البولية/index.html">أعراض الكلى والمسالك البولية</a></li>
        <li><a href="${base}/مشاكل_المسالك_البولية/أمراض_الكلى_والمسالك_البولية/index.html">أمراض الكلى والمسالك البولية</a></li>
        <li><a href="${base}/مشاكل_المسالك_البولية/عمليات_الكلى_والمسالك_البولية/index.html">عمليات الكلى والمسالك البولية</a></li>
      </ul>
    </div>

    <div class="bottom-details">
      <div class="bottom-text">
        <span class="copyright-text">Copyright &#169; 2025 <a href="${base}/index.html">عيادة الدكتور جاد الصمادي</a> جميع الحقوق محفوظة</span>
        <span class="policy-terms"><a href="${base}/privacy-policy/index.html">سياسة الخصوصية</a></span>
        <span class="policy-terms"><a href="${base}/terms-and-conditions/index.html">الشروط والأحكام</a></span>
        <span><a href="${base}/Jobs/index.html">الإعلانات والوظائف</a></span>
        
      </div>
    </div> 
  </div>    
</footer>

    <style>
/* Footer */
footer {
  width: 100%;
  bottom: 0;
  right: 0;
  background-color: rgb(25, 39, 51, 1);
  color: rgb(43, 245, 255, 1);
  padding: 5px;
  margin-top: auto;
  display: flex;
  justify-content: space-between; 
  text-align: center;
};

footer::before{
  content: '';
  position: absolute;
  right: 0;
  top: 100px;
  height: 1px;
  width: 100%;
}

footer .content {
width: 100%;
margin: auto;
padding: 30px 40px 40px 40px;
display: flex;
flex-direction: column;
border-color: rgb(43, 245, 255, 1);
}

footer .content .top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}

.content .top .logo-footer {
  color: rgb(43, 245, 255, 1);
  font-size:larger;
}

.logo-footer a {
  width: 10%;
  display: inline-block;
}

.logo-footer a:hover {
  background-color: transparent;
}

.logo-footer a img {
  object-fit: contain;
  border-radius: 50%;
  margin-bottom: -8px;
}

.content .top .media-icons {
  display: flex;
}

.content .top .media-icons a {
  width: 40px;
  height: 40px;
  background-color:transparent;
  margin: 0 8px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  transition: all 0.4s ease;
}

footer .content .link-boxes {
  
  display: flex;
  justify-content: space-between;
}

footer .content .link-boxes .footer-box {
  margin-right: 0;
  padding-right: 0;
  background-color: transparent;
  width: calc(100% / 4 - 10px);
}

.content .link-boxes .footer-box .footer-link-name {
  font-size: large;
  font-weight: bold;
  margin-bottom: 10px;
  position: relative;
}

.content .link-boxes .footer-box .footer-link-name::before {
  content: '';
  position: absolute;
  bottom: -2px;
  height: 2px;
  width: 50px;
  background: #fff;
}

footer .content .link-boxes .footer-box li {
  margin: 6px 0;
  list-style: none;
}

footer .content .link-boxes .footer-box li a {
  color:rgb(190, 244, 240);
  font-size: medium;
  text-decoration: none;
  opacity: 0.75;
  transition: all 0.4s ease;
}

footer .content .link-boxes .footer-box li a:hover {
opacity: 1;
text-decoration:underline;
color: rgb(25, 39, 51, 1);
background-color: rgb(43, 245, 255, 1);
}

footer .bottom-details {
  width: 100%;
}

footer .bottom-details .bottom-text {
 max-width: 1250px; 
 margin: auto;
 padding: 20px 40px;
 display: flex;
 justify-content: space-between;
}

.bottom-details .bottom-text span,
.bottom-details .bottom-text a {
  font-size: small;
  color: rgb(43, 245, 255, 1);
  background-color: rgb(25, 39, 51, 1);
  text-decoration: none;
}

.bottom-details .bottom-text a:hover {
  text-decoration: underline;
  color: rgb(25, 39, 51, 1);
  background-color: rgb(43, 245, 255, 1);
}

@media (max-width: 800px) {
  footer .content .link-boxes {
    flex-wrap: wrap;
  }
      .logo-footer a {
    width: 10%;
  }
  .logo-footer a img {
    margin-bottom: -5px;
  }
}

@media (max-width: 600px) {
  .content .top .logo-footer {
    font-size:medium;
}

.content .top .media-icons a {
  width: 35px;
  height: 35px;
  font-size: small;
  line-height: 35px;
}
footer .content .link-boxes .footer-box {
  width: calc(100% / 2 - 10px);
}
.bottom-details .bottom-text span,
.bottom-details .bottom-text a {
  font-size: smaller;
}
footer .bottom-details {
  font-size: small;
}
    .logo-footer a {
    width: 20%;
  }
.logo-footer a img {
  margin-bottom: -15px;
}

.bottom-text span {
 padding: 0 5%;
}
}

@media (max-width: 400px) {
  footer::before{
    right: 0;
    top: 145px;
  }
  footer .content .top {
    flex-direction: column;
  }
  .content .top .media-icons {
    margin-top: 10px;
  }
  .logo-footer a {
    width: 20%;
  }

}
  
  </style>
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

  // click-outside handler
  document.addEventListener('click', function(event) {
  const isClickInside = menu.contains(event.target) || menuToggle.contains(event.target);
  if (!isClickInside && menu.style.display === 'flex') {
    menu.style.display = 'none';
    menuToggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }
  });
  
});
