document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const calendar = document.getElementById('calendar');
    const prevWeekButton = document.getElementById('prev-week');
    const nextWeekButton = document.getElementById('next-week');
    const modal = document.getElementById('reservation-modal');
    const closeModal = document.querySelector('.modal .close');
    const reservationForm = document.getElementById('reservation-form');
    const selectedTimeInput = document.getElementById('selected-time');
    const confirmationDetails = document.getElementById('confirmation-details');
    const confirmationText = document.getElementById('confirmation-text');
    
    // State Management
    const offDays = JSON.parse(localStorage.getItem('offDays')) || [];
    const now = new Date();
    let currentDate = new Date(now);

    // **********************
    // Core Functionality
    // **********************

    // Initialize Calendar
    function loadWeek(startDate) {
        calendar.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
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
            ${date.toLocaleDateString('ar-EG')}<br>
            ${date.toLocaleDateString('ar-EG', { weekday: 'long' })}
        `;
        dayElement.appendChild(dateHeader);

        // Time Slots
        const dateString = date.toISOString().slice(0, 10);
        if (offDays.includes(dateString)) {
            dayElement.appendChild(createOffDayElement());
        } else if (date >= now) {
            dayElement.appendChild(createTimeSlots(date));
        }

        return dayElement;
    }

    function createTimeSlots(date) {
        const timesElement = document.createElement('div');
        timesElement.className = 'times';
        
        for (let hour = 10; hour <= 16; hour += 0.5) {
            const timeButton = document.createElement('button');
            timeButton.className = 'time';
            timeButton.textContent = formatHour(hour);
            timeButton.disabled = isTimePassed(date, hour);
            
            if (timeButton.disabled) {
                timeButton.classList.add('disabled');
            }

            timeButton.addEventListener('click', () => {
                selectedTimeInput.value = `${date.toLocaleDateString('ar-EG')} ${formatHour(hour)}`;
                modal.style.display = 'block';
                reservationForm.dataset.selectedTime = timeButton.id;
            });

            timesElement.appendChild(timeButton);
        }
        return timesElement;
    }

    // **********************
    // Helper Functions
    // **********************
    function formatDate(date) {
        return new Intl.DateTimeFormat('ar-EG', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(date).replace('،', '');
    }

    function formatHour(hour) {
        const isPM = hour >= 12;
        const displayHour = hour % 12 || 12;
        const minutes = hour % 1 === 0.5 ? '30' : '00';
        return `${displayHour}:${minutes} ${isPM ? 'م' : 'ص'}`;
    }

    function isTimePassed(date, hour) {
        if (date.toDateString() !== now.toDateString()) return false;
        const currentHour = now.getHours() + (now.getMinutes()/60);
        return hour < currentHour;
    }

    function createOffDayElement() {
        const element = document.createElement('div');
        element.className = 'off-day';
        element.textContent = 'عطلة';
        return element;
    }

    // **********************
    // Form Handling
    // **********************
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = e.target.querySelector('button[type="submit"]');
        const statusDiv = document.createElement('div');
        statusDiv.id = 'form-status';
        e.target.parentNode.insertBefore(statusDiv, e.target.nextSibling);

        try {
            // Disable UI during submission
            submitButton.disabled = true;
            statusDiv.textContent = "جاري إرسال الحجز...";

            // Prepare form data
            const submissionTime = new Date();
            document.getElementById('submission-time').value = formatDate(submissionTime);
            const formData = new FormData(reservationForm);

            // Submit to Google Sheets
            const response = await fetch(reservationForm.action, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('فشل الإرسال');
            const result = await response.json();

            if (result.status !== "success") {
                throw new Error(result.message || 'خطأ غير معروف');
            }

            // Update UI
            updateConfirmationDetails(formData);
            disableBookedTimeSlot();
            window.open(result.whatsappUrl, '_blank');
            statusDiv.textContent = "تم الحجز بنجاح! يتم فتح واتساب...";
            statusDiv.style.color = "green";

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
            <strong>تاريخ الإرسال:</strong> ${formData.get('submissionTime')}
        `;
        confirmationDetails.style.display = 'block';
        modal.style.display = 'block';
        initializeSaveShare(); // Rebind buttons
    }

    function disableBookedTimeSlot() {
        const timeSlot = document.getElementById(reservationForm.dataset.selectedTime);
        if (timeSlot) {
            timeSlot.disabled = true;
            timeSlot.classList.add('disabled');
        }
    }

    // **********************
    // Save/Share Functionality
    // **********************
    function initializeSaveShare() {
        document.getElementById('save-reservation')?.addEventListener('click', saveReservation);
        document.getElementById('share-reservation')?.addEventListener('click', shareReservation);
    }

    function saveReservation() {
        captureImage(dataUrl => {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `jad-clinic-${Date.now()}.png`;
            link.click();
        });
    }

    function shareReservation() {
        captureImage(dataUrl => {
            fetch(dataUrl)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'reservation.png', { type: 'image/png' });
                    navigator.share({
                        title: 'حجز عيادة الدكتور جاد الصمادي',
                        files: [file]
                    }).catch(console.error);
                });
        });
    }

    function captureImage(callback) {
        const elementsToHide = document.querySelectorAll('#save-reservation, #share-reservation');
        elementsToHide.forEach(el => el.classList.add('hidden-for-image'));

        html2canvas(confirmationDetails, {
            backgroundColor: '#FFFFFF',
            scale: window.devicePixelRatio * 1.5,
            useCORS: true
        }).then(canvas => {
            elementsToHide.forEach(el => el.classList.remove('hidden-for-image'));
            callback(canvas.toDataURL('image/png'));
        });
    }

    // **********************
    // Initialization
    // **********************
    function initializePhoneInput() {
        const phoneInput = document.querySelector("#phone");
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

    // Initial Setup
    loadWeek(currentDate);
    initializePhoneInput();
    initializeSaveShare();
});