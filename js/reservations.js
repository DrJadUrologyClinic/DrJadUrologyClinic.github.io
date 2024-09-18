document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const prevWeekButton = document.getElementById('prev-week');
    const nextWeekButton = document.getElementById('next-week');
    const modal = document.getElementById('reservation-modal');
    const closeModal = document.querySelector('.modal .close');
    const reservationForm = document.getElementById('reservation-form');
    const selectedTimeInput = document.getElementById('selected-time');
    const confirmationDetails = document.getElementById('confirmation-details');
    const confirmationText = document.getElementById('confirmation-text');
    const saveReservation = document.getElementById('save-reservation');
    const shareReservation = document.getElementById('share-reservation');
    const offDays = JSON.parse(localStorage.getItem('offDays')) || [];

    const now = new Date();
    let currentDate = new Date(now);

    function formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        return new Intl.DateTimeFormat('ar-EG', options).format(date).replace(',', '');
    }

    function loadWeek(startDate) {
        calendar.innerHTML = ''; // Clear current calendar
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');

            const dateElement = document.createElement('div');
            dateElement.classList.add('date');
            dateElement.innerHTML = `${date.toLocaleDateString('ar-EG')}<br>${date.toLocaleDateString('ar-EG', { weekday: 'long' })}`;
            dayElement.appendChild(dateElement);

            const dateString = date.toISOString().slice(0, 10);
            const isOffDay = offDays.includes(dateString);

            if (isOffDay) {
                const offDayElement = document.createElement('div');
                offDayElement.classList.add('off-day');
                offDayElement.textContent = 'عطلة';
                dayElement.appendChild(offDayElement);
            } else if (date >= now || (date.getMonth() > now.getMonth() || date.getFullYear() > now.getFullYear())) {
                const timesElement = document.createElement('div');
                timesElement.classList.add('times');
                for (let hour = 10; hour <= 16; hour += 0.5) {
                    const timeButton = document.createElement('button');
                    timeButton.classList.add('time');
                    let hourText;
                    if (hour === 12) {
                        hourText = '12:00 م';
                    } else if (hour === 12.5) {
                        hourText = '12:30 م';
                    } else if (hour >= 12) {
                        hourText = `${Math.floor(hour - 12)}:${(hour % 1 === 0.5 ? '30' : '00')} م`;
                    } else {
                        hourText = `${Math.floor(hour)}:${(hour % 1 === 0.5 ? '30' : '00')} ص`;
                    }
                    timeButton.textContent = hourText;
                    const currentHour = now.getHours() + (now.getMinutes() / 60);
                    if (date.toDateString() === now.toDateString() && (hour < currentHour || hour <= currentHour + 2)) {
                        timeButton.classList.add('disabled');
                        timeButton.disabled = true;
                    }
                    timeButton.addEventListener('click', () => {
                        selectedTimeInput.value = `${date.toLocaleDateString('ar-EG')} ${hourText}`;
                        modal.style.display = 'block';
                        reservationForm.setAttribute('data-selected-button-id', timeButton.id);
                    });
                    timeButton.id = `${date.toISOString().slice(0, 10)}-${hourText.replace(':', '').replace(' ', '')}`;
                    timesElement.appendChild(timeButton);
                }
                dayElement.appendChild(timesElement);
            }

            calendar.appendChild(dayElement);
        }
    }

    function changeWeek(direction) {
        currentDate.setDate(currentDate.getDate() + direction * 7);
        loadWeek(currentDate);
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        confirmationDetails.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            confirmationDetails.style.display = 'none';
        }
    });

    reservationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(reservationForm);
        const formDataObject = {};
        formData.forEach((value, key) => formDataObject[key] = value);

        confirmationText.innerHTML = `
            <strong>الاسم الأول:</strong> ${formDataObject.firstName}<br>
            <strong>اسم العائلة:</strong> ${formDataObject.familyName}<br>
            <strong>العمر:</strong> ${formDataObject.age}<br>
            <strong>رقم الهاتف:</strong> ${formDataObject.phone}<br>
            <strong>البريد الإلكتروني:</strong> ${formDataObject.email}<br>
            <strong>موعد الحجز:</strong> ${formDataObject.selectedTime}<br>
        `;
        
        confirmationDetails.style.display = 'block';

        const selectedButtonId = reservationForm.getAttribute('data-selected-button-id');
        const selectedButton = document.getElementById(selectedButtonId);
        if (selectedButton) {
            selectedButton.classList.add('disabled');
            selectedButton.disabled = true;
        }

        // Clear the form fields
        reservationForm.reset();
    });

    function captureImage(callback) {
        const buttons = document.querySelectorAll('#save-reservation, #share-reservation');
        buttons.forEach(button => button.classList.add('hidden-for-image'));
        html2canvas(document.getElementById('confirmation-details')).then(canvas => {
            buttons.forEach(button => button.classList.remove('hidden-for-image'));
            callback(canvas.toDataURL('image/png'));
        });
    }

    saveReservation.addEventListener('click', () => {
        captureImage(dataUrl => {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'reservation.png';
            link.click();
        });
    });

    shareReservation.addEventListener('click', () => {
        captureImage(dataUrl => {
            fetch(dataUrl)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'reservation.png', { type: 'image/png' });
                    const shareData = {
                        title: 'تفاصيل الحجز',
                        files: [file]
                    };
                    navigator.share(shareData).catch(console.error);
                });
        });
    });

    prevWeekButton.addEventListener('click', () => changeWeek(-1));
    nextWeekButton.addEventListener('click', () => changeWeek(1));

    loadWeek(currentDate);

    // Initialize intl-tel-input
    const phoneInput = document.querySelector("#phone");
    window.intlTelInput(phoneInput, {
        initialCountry: "jo", // Set the default country to Jordan
        geoIpLookup: function(callback) {
            fetch('https://ipinfo.io?token=YOUR_TOKEN_HERE')
                .then(response => response.json())
                .then(data => callback(data.country))
                .catch(() => callback('jo')); // Fallback to Jordan if geo IP lookup fails
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
});
