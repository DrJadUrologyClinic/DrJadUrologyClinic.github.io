const loginForm = document.getElementById('loginForm');
const adminPage = document.getElementById('adminPage');
const errorMessage = document.getElementById('error-message');

const admins = [
    { username: 'Dr.Jad', password: 'Jad@1981' },
    { username: 'admin2', password: 'password2' },
    { username: 'admin3', password: 'password3' }
];

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const validAdmin = admins.some(admin => admin.username === username && admin.password === password);

    if (validAdmin) {
        adminPage.classList.remove('hidden');
        loginForm.classList.add('hidden');
        errorMessage.classList.add('hidden');
    } else {
        errorMessage.classList.remove('hidden');
    }
});

const addOffDayButton = document.getElementById('add-off-day');
const offDaysList = document.getElementById('off-days-list');
let offDays = JSON.parse(localStorage.getItem('offDays')) || [];

function renderOffDays() {
    offDaysList.innerHTML = '';
    offDays.forEach(offDay => {
        const listItem = document.createElement('li');
        listItem.textContent = offDay;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'حذف';
        removeButton.addEventListener('click', () => {
            offDays = offDays.filter(day => day !== offDay);
            localStorage.setItem('offDays', JSON.stringify(offDays));
            renderOffDays();
        });
        listItem.appendChild(removeButton);
        offDaysList.appendChild(listItem);
    });
}

addOffDayButton.addEventListener('click', function() {
    const offDayInput = document.getElementById('off-day');
    const offDayValue = offDayInput.value;

    if (offDayValue && !offDays.includes(offDayValue)) {
        offDays.push(offDayValue);
        localStorage.setItem('offDays', JSON.stringify(offDays));
        renderOffDays();
        offDayInput.value = ''; // Clear the input after adding
    } else {
        alert('يرجى اختيار يوم عطلة أو يوم عطلة موجود بالفعل.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    renderOffDays();
});
