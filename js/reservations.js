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
            
            if (date.getDay() === 5) continue; // Skip Fridays
            
            calendar.appendChild(createDayElement(date));
        }
    }

    function createDayElement(date) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        
        const dateHeader = document.createElement('div');
        dateHeader.className = 'date';
        dateHeader.innerHTML = `
            ${date.toLocaleDateString('ar-JO')}<br>
            ${date.toLocaleDateString('ar-JO', { weekday: 'long' })}
        `;
        dayElement.appendChild(dateHeader);

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
            
            if (timeButton.disabled) timeButton.classList.add('disabled');

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
        return hour < (now.getHours() + (now.getMinutes()/60));
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
            // Validation
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

            // Generate confirmation image
            confirmationDetails.style.display = 'block';
            const canvas = await html2canvas(confirmationDetails);
            const imageData = canvas.toDataURL('image/png');

            // Prepare WhatsApp sharing
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            // Convert data URL to blob
            const blob = await (await fetch(imageData)).blob();
            const file = new File([blob], 'reservation.png', { type: 'image/png' });

            if (navigator.share) {
                // Mobile share
                await navigator.share({
                    title: 'حجز عيادة الدكتور جاد',
                    files: [file]
                });
            } else {
                // Desktop fallback
                const link = document.createElement('a');
                link.href = imageData;
                link.download = 'حجز-عيادة-جاد.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                window.open(
                    `https://web.whatsapp.com/send?phone=962778089234&text=${encodeURIComponent('يرجى إرفاق صورة الحجز التي تم تنزيلها')}`,
                    '_blank'
                );
            }

            // Update confirmation display
            confirmationText.innerHTML = `
                <strong>الاسم:</strong> ${formData.get('name')}<br>
                <strong>العمر:</strong> ${formData.get('age')}<br>
                <strong>الهاتف:</strong> ${formData.get('phone')}<br>
                <strong>الوقت:</strong> ${formData.get('selectedTime')}
            `;

            statusDiv.textContent = "تم الحجز بنجاح!";
            statusDiv.style.color = "green";

        } catch (error) {
            statusDiv.textContent = `خطأ: ${error.message}`;
            statusDiv.style.color = "red";
        } finally {
            submitButton.disabled = false;
            setTimeout(() => statusDiv.remove(), 5000);
            confirmationDetails.style.display = 'none';
        }
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