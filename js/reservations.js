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

    // Format date function
    function formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        };
        return new Intl.DateTimeFormat('ar-EG', options).format(date)
            .replace('،', '')
            .replace('ص', 'ص')
            .replace('م', 'م');
    }

    // Calendar rendering functions
    function loadWeek(startDate) {
        calendar.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const dayElement = createDayElement(date);
            calendar.appendChild(dayElement);
        }
    }

    function createDayElement(date) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        
        const dateElement = document.createElement('div');
        dateElement.classList.add('date');
        dateElement.innerHTML = `${date.toLocaleDateString('ar-EG')}<br>${date.toLocaleDateString('ar-EG', { weekday: 'long' })}`;
        dayElement.appendChild(dateElement);

        const dateString = date.toISOString().slice(0, 10);
        const isOffDay = offDays.includes(dateString);

        if (!isOffDay && date >= now) {
            const timesElement = createTimesElement(date);
            dayElement.appendChild(timesElement);
        } else if (isOffDay) {
            dayElement.appendChild(createOffDayElement());
        }

        return dayElement;
    }

    function createTimesElement(date) {
        const timesElement = document.createElement('div');
        timesElement.classList.add('times');
        
        for (let hour = 10; hour <= 16; hour += 0.5) {
            const timeButton = createTimeButton(date, hour);
            timesElement.appendChild(timeButton);
        }
        
        return timesElement;
    }

    function createTimeButton(date, hour) {
        const timeButton = document.createElement('button');
        timeButton.classList.add('time');
        timeButton.textContent = formatHour(hour);
        timeButton.id = `${date.toISOString().slice(0, 10)}-${hour.toString().replace('.', '-')}`;

        if (isTimePassed(date, hour)) {
            timeButton.classList.add('disabled');
            timeButton.disabled = true;
        }

        timeButton.addEventListener('click', () => {
            selectedTimeInput.value = `${date.toLocaleDateString('ar-EG')} ${formatHour(hour)}`;
            modal.style.display = 'block';
            reservationForm.dataset.selectedButtonId = timeButton.id;
        });

        return timeButton;
    }

    // Helper functions
    function formatHour(hour) {
        const isPM = hour >= 12;
        const displayHour = hour % 12 || 12;
        const minutes = hour % 1 === 0.5 ? '30' : '00';
        return `${displayHour}:${minutes} ${isPM ? 'م' : 'ص'}`;
    }

    function isTimePassed(date, hour) {
        if (date.toDateString() !== now.toDateString()) return false;
        const currentTotalHours = now.getHours() + (now.getMinutes()/60);
        return hour < currentTotalHours;
    }

    function createOffDayElement() {
        const offDayElement = document.createElement('div');
        offDayElement.classList.add('off-day');
        offDayElement.textContent = 'عطلة';
        return offDayElement;
    }

    // Form submission handler
    reservationForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const submitButton = event.target.querySelector('button[type="submit"]');
        const statusDiv = document.createElement('div');
        statusDiv.id = 'form-status';
        event.target.parentNode.insertBefore(statusDiv, event.target.nextSibling);
        
        try {
            submitButton.disabled = true;
            statusDiv.textContent = "جاري إرسال الحجز...";
            
            // Capture submission time
            const submissionTime = new Date();
            document.getElementById('submission-time').value = formatDate(submissionTime);
            
            // Prepare and send form data
            const formData = new FormData(reservationForm);
            const response = await fetch(reservationForm.action, { method: 'POST', body: formData });
            
            if (!response.ok) throw new Error('فشل الإرسال');
            
            const result = await response.json();
            
            if (result.status === "success") {
                updateConfirmationDetails(formData);
                disableSelectedTimeSlot();
                window.open(result.whatsappUrl, '_blank');
                statusDiv.textContent = "تم الحجز بنجاح! يتم فتح واتساب...";
                statusDiv.style.color = "green";
            } else {
                throw new Error(result.message || 'خطأ غير معروف');
            }
        } catch (error) {
            console.error("Error:", error);
            statusDiv.textContent = `خطأ: ${error.message}`;
            statusDiv.style.color = "red";
        } finally {
            submitButton.disabled = false;
            setTimeout(() => statusDiv.remove(), 5000);
        }
    });

    function updateConfirmationDetails(formData) {
        confirmationText.innerHTML = `
            <strong>الإسم الكامل:</strong> ${formData.get('name')}<br>
            <strong>العمر:</strong> ${formData.get('age')}<br>
            <strong>رقم الهاتف:</strong> ${formData.get('phone')}<br>
            <strong>البريد الإلكتروني:</strong> ${formData.get('email')}<br>
            <strong>موعد الحجز:</strong> ${formData.get('selectedTime')}<br>
            <strong>تاريخ ووقت الإرسال:</strong> ${formData.get('submissionTime')}
        `;
        confirmationDetails.style.display = 'block';
        modal.style.display = 'block';
    }

    function disableSelectedTimeSlot() {
        const selectedButton = document.getElementById(reservationForm.dataset.selectedButtonId);
        if (selectedButton) {
            selectedButton.classList.add('disabled');
            selectedButton.disabled = true;
        }
    }

    // Other event listeners and initializations
    prevWeekButton.addEventListener('click', () => changeWeek(-1));
    nextWeekButton.addEventListener('click', () => changeWeek(1));
    closeModal.addEventListener('click', () => (modal.style.display = 'none'));
    window.addEventListener('click', (e) => e.target === modal && (modal.style.display = 'none'));

    // Initialize calendar and phone input
    loadWeek(currentDate);
    initializePhoneInput();

    function changeWeek(direction) {
        currentDate.setDate(currentDate.getDate() + direction * 7);
        loadWeek(currentDate);
    }

    function initializePhoneInput() {
        const phoneInput = document.querySelector("#phone");
        window.intlTelInput(phoneInput, {
            initialCountry: "jo",
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });
    }

    // Image capture functions (keep existing)
    // ... [保留现有的 captureImage 和事件监听器代码] ...
});