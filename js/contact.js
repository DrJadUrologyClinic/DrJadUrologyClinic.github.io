const scriptURL = 'https://script.google.com/macros/s/AKfycbwxyXsPWOobFr0IrK-Jd8QtdY_095WYfFKdOBCGQ2goMElM7e7tjM117uq9K2UGzmBf/exec';
const form = document.forms['contact-form'];

form.addEventListener('submit', e => {
  e.preventDefault(); // Prevent default form submission

  const mobileInput = document.getElementById('mobile').value.trim();

  // Validate Jordanian mobile numbers
  const jordanMobileRegex = /^07[7-9]\d{7}$/; // Pattern for Jordanian mobile numbers

  if (!jordanMobileRegex.test(mobileInput)) {
    alert('يرجى إدخال رقم جوال صالح من الأردن (مثل: 079XXXXXXX أو 078XXXXXXX).');
    return;
  }

  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors', // Use no-cors mode to bypass CORS restrictions
    body: new FormData(form) // Send form data
  })
    .then(() => {
      alert('شكراً. لقد تم إرسال الملاحظات بنجاح. سيتم التواصل معكم في أقرب وقت.');
      window.location.href = 'Thankyouforcontact.html'; // Redirect to the Thank You page
    })
    .catch(error => {
      console.error('Error:', error.message);
      alert('فشل في إرسال النموذج!');
    });
});
