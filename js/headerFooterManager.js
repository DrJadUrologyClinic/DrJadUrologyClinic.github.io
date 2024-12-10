class SpecialHeader extends HTMLElement {
  connectedCallback() {
    const base = document.querySelector('base')?.getAttribute('href') || '.';
    this.innerHTML = `
<header>
  <div class="header-nav"> 
    <input type="checkbox" aria-label="nav-toggle" id="nav-toggle" class="nav-toggle">
    <nav>
      <ul class="nav-menu">
        <li><a href="${base}/index.html" title="أفضل دكتور كلى ومسالك بولية في عمان">الرئيسية</a></li>
        <li><a href="${base}/about/index.html" title="استشاري جراحة الكلى والمسالك البولية">الدكتور جاد الصمادي</a></li>
        <li><a href="${base}/مشاكل_المسالك_البولية/index.html" title="مشاكل المسالك البولية">مشاكل المسالك البولية</a></li>
        <li><a href="${base}/services/index.html" title="الإجراءات داخل العيادة">الإجراءات داخل العيادة</a></li>
        <li><a href="${base}/FAQ/index.html" title="الأسئلة الشائعة">أسئلة شائعة</a></li>
        <li><a href="${base}/reservations/index.html" title="حجز موعد لدى دكتور مسالك بولية في عمان">حجز موعد</a></li>
        <li><a href="${base}/location/index.html" title="موقع أفضل وأرتب عيادة كلى ومسالك في الأردن">الموقع</a></li>
        <li><a href="${base}/contactUs/index.html" title="تواصل معنا في عيادة الدكتور جاد استشاري الكلى والمسالك البوليه">تواصل معنا</a></li>
    </nav>
    <label for="nav-toggle" class="nav-toggle-label">
      <span type="nav-toggle"></span>
    </label>
  </div>
  <div class="logo">
    <a href="${base}/index.html"><img src="${base}/images/logo.webp" alt="أفضل شعار دكتور كلى ومسالك في الاردن عمان"></a>
    <a href="${base}/index.html">عيادة الدكتور جاد الصمادي</a>
  </div>
</header>

    <style>

    /* Header styles */
    header {
      background-color: rgb(25, 39, 51, 1);
      padding: 0;
      display: flex;
      justify-content:flex-start;
      text-align: center;
      position: fixed;
      z-index: 999;
      width: 100%;
    }
    
    .header-nav {
      display: flex;
      width: 90%;
      align-items: center;
    }
    
    
    .header-nav li {
      padding: 0;
      padding-bottom: 5px;
      margin: 0;
    }
    
    .header-nav a {
      margin-top: 20px;
      margin-bottom: 5px;
    }
    
    .nav-menu {
      flex-wrap: wrap;
      width: 100%;
    }
    
    .logo {
      display: flex;
      justify-content:space-around;
      align-items: center;
      align-content: center;
    }

    .logo a {
      font-size: xx-large;
    }

    .logo a:hover {
      background-color: rgb(43, 245, 255, 1);
    }
    
    .logo img {
    aspect-ratio: 150 / 150;
    width: 60%;
    height: auto;
    object-fit: contain;
    margin-top: 5%;
    }
  
    
    /* Navigation styles */
    
    .nav-toggle {
      position: absolute !important;
      top: -9999px !important;
      left: -9999px !important;
     
    }
    
    .nav-toggle:focus ~ .nav-toggle-label {
      outline: 3px solid rgba(rgb(43, 245, 255, 1), .75);
    } 
    
    .nav-toggle-label {
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 1em;
      height: 100%;
      display: flex;
      align-items: center;
     
    }
    
    .nav-toggle-label span,
    .nav-toggle-label span::before,
    .nav-toggle-label span::after {
      display: block;
      background-color: rgb(43, 245, 255, 1);
      height: 2px;
      width: 2em;
      border-radius: 2px;
      position: relative;
     
    }
    
    .nav-toggle-label span::before,
    .nav-toggle-label span::after {
      content: '';
      position: absolute;
     
    }
    
    .nav-toggle-label span::before {
      bottom: 7px;
    }
    
    .nav-toggle-label span::after {
      top: 7px;
    }
    
    nav {
      position: absolute;
      background-color: rgb(25, 39, 51, 1);
      padding: 0;
      text-align: right;
      border-style: ridge;
      border-width: 5px;
      top: 100%;
      right: 0;
      width: 80%;
      transform: scale(1, 0);
      transform-origin: top;
      transition: transform 400ms ease-in-out;
     
    }
    
    nav ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    
    nav li {
      margin-bottom: 1em;
      margin-left: 1em;
      background-color: rgb(25, 39, 51, 1);

    }
    
    
    nav a {
      display: flex;
      font-size: smaller;
      text-wrap: nowrap;
      color: rgb(43, 245, 255, 1);
      border-style: ridge;
      border-radius: 5px;
      text-align: right;
      background-color: rgb(25, 39, 51, 1);
      opacity: 0;
      transition: opacity 150ms ease-in-out;
      padding-left: 5px;
      padding-right: 5px;
      margin-left: 5px;
      margin-right: 5px;
    }
    
    nav a:hover {
      color: rgb(25, 39, 51, 1);
      background-color: rgb(43, 245, 255, 1);
      border-radius: 5px;
    }
    
    .nav-toggle:checked ~ nav {
      transform: scale(1,1);
    }
    
    .nav-toggle:checked ~ nav a {
      opacity: 1;
      transition: opacity 250ms ease-in-out 250ms;
    }
    
    
    @media all and (min-width: 1250px){
      .nav-toggle-label {
        display: none;
      }
    
      header {
        display: flex;
        grid-template-columns: 1fr auto minmax(600px, 3fr) 1fr;
      }
     
      nav {
      all: unset;
      position:relative;
      text-align: right;
      transition: none;
      transform: scale(1,1);
      background: none;
      top: initial;
      right: initial;
        /* end Edge support stuff */
        
      grid-column: 2 / 3;
      display: flex;
      justify-content:flex-end;
      align-items: center; 
      }
      
      nav ul {
        display: flex;   
      }
      
      nav li {
        margin-bottom: 0;
      }
    
      .logo {
        width: 50%;
        font-size: large;
      }
    }
    
    @media (max-width: 1250px) {
      .logo {
        display: flex;
        align-items: center;
        align-content: center;
        width: 80%;
      }
       .logo a {
      font-size: medium;
      }
    
      .logo img {
        border-radius: 50%;
      }
    }
    
      
      nav a, .touch-effect {
        opacity: 1;
        position: relative;
      }
    
      nav a:hover, .touch-effect:active {
        color: rgb(25, 39, 51, 1);
        background-color: rgb(43, 245, 255, 1);
        border-radius: 5px;
      }
      
      nav a::before, .touch-effect {
        content: '';
        display: block;
        height: 5px;
        background: rgb(200, 250, 255, 1);
        position: absolute;
        top: -.75em;
        left: 0;
        right: 0;
        transform: scale(0, 1);
        transition: transform ease-in-out 250ms;
      }
      
      nav a:hover::before, .touch-effect:active {
        transform: scale(1,1);
      }
  </style>  `
  }
}

customElements.define('special-header', SpecialHeader)







class SpecialFooter extends HTMLElement {
  connectedCallback() {
    const base = document.querySelector('base')?.getAttribute('href') || '.';
    this.innerHTML = `
<footer>
  <div class="content">
    <div class="top">

      <div class="logo-footer">
        <a href="${base}/index.html"><img src="${base}/images/logo.webp" alt="  شعار أفضل استشاري مسالك بولية في عمان أو أيقونة أفضل استشاري جراحة الكلى والمسالك و العقم و الإنجاب في عمان  "></a>
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
        <li><a href="https://wa.me/962778089234" target="_blank"> تواصل معنا واتس أب </a></li>
        <li><a href="https://wa.me/962778089234" target="_blank">  962778089234+  </a></li>
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
        <span class="copyright-text">Copyright &#169; 2024 <a href="${base}/index.html">عيادة الدكتور جاد الصمادي</a> جميع الحقوق محفوظة</span>
        <span class="policy-terms"><a href="${base}/privacy-policy/index.html">سياسة الخصوصية</a></span>
        <span class="policy-terms"><a href="${base}/terms-and-conditions/index.html">الشروط والأحكام</a></span>
      </div>
    </div> 
  </div>    
</footer>
</body>
</html>

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
border-right: 0;
border-left: 0;
border-bottom: 0;
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

.logo-footer a img {
  aspect-ratio: 150 / 150;
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
  opacity: 0.7;
  text-decoration: none;
}

.bottom-details .bottom-text a:hover {
  opacity: 1;
text-decoration: underline;
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
  font-size: medium;
}
    .logo-footer a {
    width: 20%;
  }
.logo-footer a img {
  margin-bottom: -15px;
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
  
  </style>  `
  }
}

customElements.define('special-footer', SpecialFooter)
