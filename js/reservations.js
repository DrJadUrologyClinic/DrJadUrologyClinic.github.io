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
    
    // Working Hours Configuration
    const WORKING_HOURS = {
        0: { start: 10, end: 18 }, // Sunday
        1: { start: 10, end: 18 }, // Monday
        2: { start: 10, end: 18 }, // Tuesday
        3: { start: 14, end: 18 }, // Wednesday
        4: { start: 10, end: 14 }, // Thursday
        6: { start: 10, end: 18 }, // Saturday
        // Friday (5) excluded
    };

    // State Management
    const offDays = JSON.parse(localStorage.getItem('offDays')) || [];
    const now = new Date();
    let currentDate = new Date(now);

    // **********************
    // Core Functionality
    // **********************

    function loadWeek(startDate) {
        calendar.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            // Skip Fridays (day 5)
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
        const displayHour = Math.floor(hour % 12 || 12);
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
        element.textContent = 'مغلق';
        return element;
    }

    // **********************
    // Form Handling (Keep existing implementation)
    // **********************
    // ... [Keep all existing form handling code unchanged] ...

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