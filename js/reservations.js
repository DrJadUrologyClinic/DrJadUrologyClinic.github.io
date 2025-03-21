document.addEventListener('DOMContentLoaded', () => {
    // ========== DOM Elements ==========
    const calendar = document.getElementById('calendar');
    const prevWeekButton = document.getElementById('prev-week');
    const nextWeekButton = document.getElementById('next-week');
    const modal = document.getElementById('reservation-modal');
    const closeModal = document.querySelector('.modal .close');
    const reservationForm = document.getElementById('reservation-form');
    const selectedTimeInput = document.getElementById('selected-time');
    const confirmationDetails = document.getElementById('confirmation-details');
    const confirmationText = document.getElementById('confirmation-text');

    // ========== Configuration ==========
    const WORKING_HOURS = {
        0: { start: 10, end: 18 }, // Sunday
        1: { start: 10, end: 18 }, // Monday
        2: { start: 10, end: 18 }, // Tuesday
        3: { start: 14, end: 18 }, // Wednesday
        4: { start: 10, end: 14 }, // Thursday
        6: { start: 10, end: 18 }, // Saturday
        // Friday (5) is excluded
    };

    // ========== State Management ==========
    let currentDate = new Date();
    const offDays = JSON.parse(localStorage.getItem('offDays')) || [];

    // ========== Calendar Functions ==========
    function loadWeek(startDate) {
        calendar.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            // Skip Fridays
            if (date.getDay() === 5) continue;
            
            calendar.appendChild(createDayElement(date));
        }
    }

    function createDayElement(date) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        
        // Date Header
        const dateHeader = document.createElement('div');
        dateHeader.className = 'date';
        dateHeader.innerHTML = `
            ${date.toLocaleDateString('ar-JO')}<br>
            ${date.toLocaleDateString('ar-JO', { weekday: 'long' })}
        `;
        dayElement.appendChild(dateHeader);

        // Time Slots
        const dateString = date.toISOString().slice(0, 10);
        if (offDays.includes(dateString)) {
            dayElement.appendChild(createOffDayElement());
        } else if (date >= new Date()) {
            dayElement.appendChild(createTimeSlots(date));
        }

        return dayElement;
    }

    function createTimeSlots(date) {
        const timesElement = document.createElement('div');
        timesElement.className = 'times';
        
        const dayOfWeek = date.getDay();
        const hours = WORKING_HOURS[dayOfWeek];
        
        if (!hours) return createOffDayElement();

        for (let hour = hours.start; hour < hours.end; hour += 0.5) {
            const timeButton = document.createElement('button');
            timeButton.className = 'time';
            timeButton.textContent = formatHour(hour);
            timeButton.disabled = isTimePassed(date, hour);
            
            if (timeButton.disabled) {
                timeButton.classList.add('disabled');
            }

            timeButton.addEventListener('click', () => {
                selectedTimeInput.value = `${date.toLocaleDateString('ar-JO')} ${formatHour(hour)}`;
                modal.style.display = 'block';
            });

            timesElement.appendChild(timeButton);
        }
        return timesElement;
    }

    // ========== Helper Functions ==========
    function formatHour(hour) {
        const isPM = hour >= 12;
        const displayHour = Math.floor(hour % 12 || 12);
        const minutes = hour % 1 === 0.5 ? '30' : '00';
        return `${displayHour}:${minutes} ${isPM ? 'م' : 'ص'}`;
    }

    function isTimePassed(date, hour) {
        const now = new Date();
        if (date.toDateString() !== now.toDateString()) return false;
        const currentHour = now.getHours() + (now.getMinutes()/60);
        return hour < currentHour;
    }

    function createOffDayElement() {
        const element = document.createElement('div');
        element.className = 'off-day';
        element.textContent = 'مغلق';
        return element;
    }

    // ========== Form Handling ==========
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = e.target.querySelector('button[type="submit"]');
        const statusDiv = document.getElementById('form-status') || document.createElement('div');
        statusDiv.id = 'form-status';
        e.target.parentNode.insertBefore(statusDiv, e.target.nextSibling);

        try {
            // Basic validation
            if (!document.getElementById('name').value || 
                !document.getElementById('phone').value || 
                !selectedTimeInput.value) {
                throw new Error('الرجاء ملء جميع الحقول المطلوبة');
            }

            submitButton.disabled = true;
            statusDiv.textContent = "جاري إرسال الحجز...";
            statusDiv.style.color = "inherit";

            // Prepare form data
            const formData = new FormData(reservationForm);
            formData.append('submissionTime', new Date().toISOString());

            // Submit to Google Sheets
            const response = await fetch(reservationForm.action, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('فشل الإرسال');
            
            reservationForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitButton = e.target.querySelector('button[type="submit"]');
                const statusDiv = document.getElementById('form-status') || document.createElement('div');
                statusDiv.id = 'form-status';
                e.target.parentNode.insertBefore(statusDiv, e.target.nextSibling);
            
                try {
                    // ... existing validation code ...
            
                    // Open WhatsApp with formatted message
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    const whatsappUrl = isMobile ? 
                        'https://wa.me/962778089234' : 
                        'https://web.whatsapp.com/send?phone=962778089234';
            
                    const message = `✅ حجز جديد - عيادة الدكتور جاد الصمادي\n\n
                    🧑⚕️ اسم المريض: ${formData.get('name')}
                    📅 العمر: ${formData.get('age') || 'غير محدد'}
                    📞 الهاتف: ${formData.get('phone')}
                    📧 الإيميل: ${formData.get('email') || 'غير محدد'}
                    🕒 موعد الحجز: ${formData.get('selectedTime')}
                    📆 تاريخ الإرسال: ${new Date().toLocaleDateString('ar-EG', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                    
                    📍 العنوان: شارع مي زيادة - مستشفى فرح الشامل، عمان
                    📞 للاستفسار: +962 7 7808 9234`;
            
                    window.location.href = `${whatsappUrl}?text=${encodeURIComponent(message)}`;
            
                    
    // ========== Save/Share Functionality ==========
    document.getElementById('save-reservation').addEventListener('click', () => {
        html2canvas(confirmationDetails).then(canvas => {
            const link = document.createElement('a');
            link.download = 'حجز-عيادة-جاد.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    document.getElementById('share-reservation').addEventListener('click', () => {
        html2canvas(confirmationDetails).then(canvas => {
            canvas.toBlob(blob => {
                const file = new File([blob], 'reservation.png', { type: 'image/png' });
                navigator.share({
                    title: 'حجز عيادة الدكتور جاد',
                    files: [file]
                });
            });
        });
    });

    // ========== Initial Setup ==========
    function initializePhoneInput() {
        const phoneInput = document.getElementById('phone');
        window.intlTelInput(phoneInput, {
            initialCountry: "jo",
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });
    }

    // Event Listeners
    prevWeekButton.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 7);
        loadWeek(currentDate);
    });

    nextWeekButton.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 7);
        loadWeek(currentDate);
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        confirmationDetails.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            confirmationDetails.style.display = 'none';
        }
    });

    // Start the application
    loadWeek(currentDate);
    initializePhoneInput();
});