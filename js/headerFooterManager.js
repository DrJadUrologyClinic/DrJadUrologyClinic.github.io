class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
 <!-- header.html -->
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>عيادة الدكتور جاد الصمادي </title>
  <link rel="icon" type="image/DRJADALSMADI-icon" href="images/favicon.ico">
  <meta property="og:title" content="Dr. Jad Alsmadi Urology Clinic" />
  <meta property="og:description" content="DJUC - عيادة الدكتور جاد الصمادي - استشاري جراحة الكلى والمسالك البولية  " />
  <meta property="og:image" content="https://drjadurologyclinic.com/images/ogimage.webp" />
  <meta property="og:url" content="https://drjadurologyclinic.com/" />
  <meta property="og:type" content="website" />
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="header.css">
</head>
<header>
  <div class="header-nav"> 
    <input type="checkbox" aria-label="nav-toggle" id="nav-toggle" class="nav-toggle">
    <nav>
      <ul class="nav-menu">
        <li><a href="index.html">الرئيسية</a></li>
        <li><a href="about.html">الدكتور جاد الصمادي</a></li>
        <li><a href="مشاكل_المسالك_البولية.html">مشاكل المسالك البولية</a></li>
        <li><a href="services.html">الإجراءات داخل العيادة</a></li>
        <!--<li><a href="blog.html">المدونة</a></li>-->
        <li><a href="FAQ.html">أسئلة شائعة</a></li>
        <li><a href="reservations.html">حجز موعد</a></li>
        <li><a href="location.html">الموقع</a></li>
        <li><a href="contact.html">  تواصل معنا </a></li>
        <li><a href="admin.html">مدراء صفحة العيادة</a></li>
    </nav>
    <label for="nav-toggle" class="nav-toggle-label">
      <span type="nav-toggle"></span>
    </label>
  </div>
  <div class="logo">
    <a class="logo-image" href="index.html"><img src="images/logo.webp" alt="أفضل شعار دكتور كلى ومسالك"></a>
      <a class="logo-txt" href="index.html"><h1>عيادة الدكتور جاد الصمادي</h1></a>
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
    
    
    header li {
      padding: 0;
      padding-bottom: 5px;
      margin: 0;
    }
    
    header a {
      margin-top: 20px;
      margin-bottom: 5px;
    }
    
    header .nav-menu {
      flex-wrap: wrap;
      width: 100%;
    }
    
    .logo {
      display: flex;
      justify-content:space-around;
      align-items: center;
      align-content: center;
      display: flex;
    }
    
    .logo-image {
    height: auto;
    width: 20%;
    margin: 0;
    margin-top: 1%;
    padding: 0;
    }
    
    .logo-txt{
    margin: 0;
    margin-top: 1%;
    padding: 0;
    }

    .logo img {
  width: 500;
  height: 500;
    }
    
    .logo h1 {
      background-color: rgb(25, 39, 51, 1);
      color: rgb(43, 245, 255, 1);
      font-size: xx-large;
    }
    
    button {
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 10px;
      padding-right: 10px;
      margin: 10px;
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
        font-size: medium;
      }
    }
    
    @media (max-width: 795px) {
      .logo {
        display: flex;
        align-items: center;
        align-content: center;
        width: 50%;
      }
    
      .logo-image {
       width: 25%;
      }
    
      .logo img {
        border-radius: 50%;
      }
      
      .logo h1 {
        font-size:large;
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
      
    
      @media (max-width: 450px) {
        .logo {
          width: 80%;
        }
      
        .logo-image {
         width: 50%;
        }
    
        .logo h1 {
          font-size:medium;
        }
      }
      

  
  </style>  `
  }
}

customElements.define('special-header', SpecialHeader)








class SpecialFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>عيادة الدكتور جاد الصمادي </title>
  <link rel="icon" type="image/DRJADALSMADI-Icon" href="images/favicon.ico">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="footer.css">
</head>


<body>
  
<footer>
  <div class="content">
    <div class="top">

      <div class="logo-footer">
        <a href="index.html"><img src="images/logo.webp" alt="  أيقونة أفضل استشاري جراحة الكلى والمسالك و العقم و الإنجاب في عمان  "></a>
        <span class="logo-name"> عيادة الدكتور جاد الصمادي </span> 
      </div>

      <!--
      <div class="media-icons">
       <a href=""><img src="images/youtube.png"></a>
       <a href=""><img src="images/instagram.png"></a>
       <a href=""><img src="images/facebook.png"></a>
      </div>
      -->

    </div>

    <div class="link-boxes">
      <ul class="footer-box">
        <li class="footer-link-name">
             العيادة
        </li>
        <li><a href="index.html">  الرئيسية </a></li>
        <li><a href="about.html">  الدكتور جاد الصمادي </a></li>
        <li><a href="reservations.html">  المواعيد</a></li>
        <li><a href="location.html">  الموقع </a></li>
      </ul>
      <ul class="footer-box">
        <li class="footer-link-name">
             الخدمات
        </li>
        <li><a href="flexiblecystoscopy.html">  تنظير المثانة </a></li>
        <li><a href="Urodynamictesting.html">  تخطيط ديناميكية المثانة </a></li>
        <li><a href="Prostatebiopsy.html">  خزعة البروستات </a></li>
        <li><a href="services.html">  التصوير بالالتراساوند </a></li>
      </ul>
      <ul class="footer-box">
        <li class="footer-link-name">
          معلومات التواصل
        </li>
        <li><a href="mailto:Jadsmadi@live.com">  البريد الالكتروني </a></li>
        <li><a href="https://wa.me/962778089234" target="_blank"> تواصل معنا واتس أب </a></li>
        <li><a href="https://wa.me/962778089234" target="_blank">  962778089234+  </a></li>
        <li><a href="location.html">  الموقع </a></li>
      </ul>
      <ul class="footer-box">
        <li class="footer-link-name">
          معلومات عامة
        </li>
        <li><a href="أعراض_الكلى_والمسالك_البولية.html">أعراض الكلى والمسالك البولية</a></li>
        <li><a href="articlesأمراض_الكى_والمسالك_البولية.html">أمراض الكلى والمسالك البولية</a></li>
        <li><a href="articlesعمليات_الكلى_والمسالك_البولية.html">عمليات الكلى والمسالك البولية</a></li>
         <!-- <li><a href="blog.html">  المدونة </a></li>   -->
      </ul>
    </div>


    <div class="bottom-details">
      <div class="bottom-text">
       <span class="copyright-text">Copyright &#169; 2024 <a href="index.html">  عيادة الدكتور جاد الصمادي </a> جميع الحقوق محفوظة  </span>
       <span class="policy-terms"><a href="Privacypolicy.html">   سياسة الخصوصية   </a></span>
       <span class="policy-terms"><a href="Terms&conditions.html#">  الشروط و الأحكام  </a></span>
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
  width: 500;
  height: 500;
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

