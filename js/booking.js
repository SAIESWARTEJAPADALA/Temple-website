const monthlyForm = document.getElementById('monthlyForm');
const oneTimeForm = document.getElementById('oneTimeForm');

const MONTHLY_URL = 'https://script.google.com/macros/s/AKfycbxjNawxwF06XO9No6fJ4Jk8bakLV8NSyJmhNzPqHAapJ7Hw14y2uc37OjK-P8cFYMERkw/exec';
const ONETIME_URL = 'https://script.google.com/macros/s/AKfycbyJoWti4xFu85CVqV3ERyOulpyoYXue_HCK5YvqxPzsCU75MOTmsHRALejTqyZ1OP7xJg/exec';

async function submitForm(event, form, url, type) {
    event.preventDefault();
    
    const formData = new FormData(form);
    formData.append('type', type);

    try {
        const response = await fetch(url, { method: 'POST', body: formData });
        const data = await response.json();

        if (data.result === 'success') {
            alert(`✅ Booking Confirmed!`);
            form.reset();
        } else {
            alert('❌ Booking Failed: ' + data.message);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert('❌ Error: Could not complete the booking.');
    }
}

monthlyForm.addEventListener('submit', (e) => submitForm(e, monthlyForm, MONTHLY_URL, 'monthly'));
oneTimeForm.addEventListener('submit', (e) => submitForm(e, oneTimeForm, ONETIME_URL, 'oneTime'));
