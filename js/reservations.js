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
    function isTimePassed(date, hour) {
        const now = new Date();
        const currentHour = now.getHours() + (now.getMinutes()/60);
        const twoHoursLater = currentHour + 2;
        
        // Same day check + within next 2 hours
        return date.toDateString() === now.toDateString() && hour < twoHoursLater;
    }

    const disabledSlots = [
        { 
            date: '2025-03-26',
            times: ['10:00 ص', '10:30 ص', '01:30 م'] 
        },
        
        {
            date: '2025-03-23', // Specific Wednesday
            times: ['05:30 م', '05:00 م', '04:30 م', '05:30 م']
        },
        
        {
            date: '2025-03-24',
            times: ['10:00 ص', '10:30 ص', '05:00 م', '05:30 م']
        }
    ];

    // Special off-days (format: YYYY-MM-DD)
    const FESTIVALS = [
        // Example - Eid al-Fitr 2025
        {
            type: 'عيد الفطر المبارك',
            dates: ['2025-03-29', '2025-03-30', '2025-03-31', '2025-04-01'],
        },
        // Add other holidays here 
    /*
        {
            type: 'العيد الوطني',
             dates: ['2024-05-25'] // Single day
        },
        {
            type: 'عيد الاستقلال',
            dates: ['2024-05-25', '2024-05-26', '2024-05-27'] // Date range
        } 
    */

    ];

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
    currentDate = new Date( // Create new date instance
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
    );
    
    const offDays = JSON.parse(localStorage.getItem('offDays')) || [];

    
    // ========== Timezone Helpers ==========
    function toJordanTime(date) {
        const jordanDate = new Date(date);
        jordanDate.setMinutes(jordanDate.getMinutes() + jordanDate.getTimezoneOffset() + 180);
        return jordanDate;
    }

    function formatJordanDate(date) {
        return toJordanTime(date).toISOString().split('T')[0];
    }

    // ========== Calendar Functions ==========

    function loadWeek(startDate) {
        calendar.innerHTML = '';
        const baseDate = new Date(startDate); // Clone the date
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(baseDate);
            date.setDate(baseDate.getDate() + i);
            
            // Always create day element
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            
            // Add date header
            const dateHeader = document.createElement('div');
            dateHeader.className = 'date';
            dateHeader.innerHTML = `
                ${date.toLocaleDateString('ar-JO', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                })}
                <br>
                ${date.toLocaleDateString('ar-JO', { weekday: 'long' })}
            `;
            dayElement.appendChild(dateHeader);
    
            // Add time slots or closure
            if (isWeekend(date) || isFestival(date)) {
                const closure = document.createElement('div');
                closure.className = 'closure-content';
                closure.textContent = 'عطلة';
                dayElement.appendChild(closure);
            } else {
                dayElement.appendChild(createTimeSlots(date));
            }
            
            calendar.appendChild(dayElement);
        }
    }

    function createDayElement(date) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        
        // Date Header
        const dateHeader = document.createElement('div');
        dateHeader.className = 'date';
        dateHeader.innerHTML = `
            ${date.toLocaleDateString('ar-JO', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            })}
            <br>
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

    function getDayName(date) {
        const jordanDate = new Date(date);
        jordanDate.setMinutes(jordanDate.getMinutes() + jordanDate.getTimezoneOffset() + 180);
        return jordanDate.toLocaleDateString('ar-JO', { weekday: 'long' }).toLowerCase();
    }

    // In createOffDayElement function
function createOffDayElement(date) {
    const element = document.createElement('div');
    element.className = 'day off-day'  + (isFestival(date) ? ' festival-day' : '');
    
    // Date Header (Same as regular days)
    const dateHeader = document.createElement('div');
    dateHeader.className = 'date';
    dateHeader.innerHTML = `
        ${date.toLocaleDateString('ar-JO', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        })}
        <br>
        ${date.toLocaleDateString('ar-JO', { weekday: 'long' })}
    `;
    element.appendChild(dateHeader);

    // Closure Content
    const closureContent = document.createElement('div');
    closureContent.className = 'closure-content';
    
    let closureText = 'عطلة';
    if (isWeekend(date)) closureText = 'عطلة نهاية الأسبوع';
    if (isFestival(date)) closureText = getFestivalType(date);

    closureContent.textContent = closureText;
    element.appendChild(closureContent);

    return element;
}

    // Modified createTimeSlots function
function createTimeSlots(date) {
    const timesElement = document.createElement('div');
    timesElement.className = 'time-slots';
    
    const dayOfWeek = date.getDay();
    const hours = WORKING_HOURS[date.getDay()];
    
     if (!hours) return timesElement;

        const now = new Date();
        const todayJordan = toJordanTime(now);
        const currentHour = todayJordan.getHours() + (todayJordan.getMinutes()/60);

    for (let hour = hours.start; hour < hours.end; hour += 0.5) {
        const timeButton = document.createElement('button');
        timeButton.className = 'time';
        timeButton.textContent = formatHour(hour);
        
        const formattedTime = formatHour(hour);
        const dateString = formatJordanDate(date);

        function formatJordanDate(date) {
            const jordanDate = new Date(date);
            jordanDate.setMinutes(jordanDate.getMinutes() + jordanDate.getTimezoneOffset() + 180);
            return jordanDate.toISOString().split('T')[0];
        }
        
        // Check if slot should be disabled
        const isDisabled = isTimePassed(date, hour) || 
            disabledSlots.some(slot => 
                slot.date === dateString && 
                slot.times.includes(formattedTime)
            );

        timeButton.disabled = isDisabled;
        
        if (isDisabled) {
            timeButton.classList.add('disabled');
        }

        timeButton.addEventListener('click', () => {
            selectedTimeInput.value = `${date.toLocaleDateString('ar-JO')} ${formattedTime}`;
            modal.style.display = 'block';
        });

        // Crucial: Always append the button to the DOM
        timesElement.appendChild(timeButton);
    }
    return timesElement;
}

    // ========== Helper Functions ==========
    function formatHour(hour) {
        const isPM = hour >= 12;
        const displayHour = Math.floor(hour % 12 || 12);
        const minutes = hour % 1 === 0.5 ? '30' : '00';
        return `${displayHour.toString().padStart(2, '0')}:${minutes} ${isPM ? 'م' : 'ص'}`;
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
        element.textContent = 'عطلة';
        return element;
    }

    function isWeekend(date) {
        return date.getDay() === 5; // Friday
    }

    function isFestival(date) {
        const dateString = date.toISOString().split('T')[0];
        return FESTIVALS.some(festival => 
            festival.dates.includes(dateString)
        );
    }

    function getFestivalType(date) {
        const dateString = date.toISOString().split('T')[0];
        const festival = FESTIVALS.find(f => f.dates.includes(dateString));
        return festival ? festival.type : '';
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
📆 تاريخ الإرسال: ${new Date().toLocaleDateString('ar-JO', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
})}`;

            window.location.href = `${whatsappUrl}?text=${encodeURIComponent(message)}`;

            // Show confirmation
            confirmationDetails.style.display = 'block';
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
        }
    });

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