// Google Apps Script Web App URLs for form submission
const MONTHLY_URL = 'https://script.google.com/macros/s/AKfycbwkysclh2TQJMleVI82ibZt0be_iTL_OXaTbqlEYfprvE_hz9hKT7UZiKhAtimegnqizg/exec';
const ONETIME_URL = 'https://script.google.com/macros/s/AKfycbxQo6Do2hR1zgVkf9zICw-kJMkX2qqsrN6iGpEx4y7wF3TDlTiAtLEtm08btTaYAGG6yw/exec';

/**
 * Handles form submission and sends data to Google Apps Script Web App.
 * @param {Event} event - Form submission event
 * @param {HTMLFormElement} form - The form element
 * @param {string} url - The API endpoint for submission
 * @param {string} type - Booking type ('monthly' or 'oneTime')
 */
async function submitForm(event, form, url, type) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    formData.append('type', type); // Append booking type to request

    try {
        const response = await fetch(url, { method: 'POST', body: formData });
        const data = await response.json();

        if (data.result === 'success') {
            // Extract user details
            const fullName = form.querySelector("input[name='Full Name']").value;
            const phoneNumber = form.querySelector("input[name='Phone Number']").value;
            let bookingDetails = '';

            // Determine booking details based on type
            if (type === 'monthly') {
                const startMonth = form.querySelector("input[name='Start Month']").value;
                const endMonth = form.querySelector("input[name='End Month']").value;
                bookingDetails = `📅 Duration: ${startMonth} to ${endMonth}`;
            } else {
                const bookingDate = form.querySelector("input[name='Booking Date']").value;
                const timeSlot = form.querySelector("select[name='Time Slot']").value;
                bookingDetails = `📅 Date: ${bookingDate}\n⏰ Time: ${timeSlot}`;
            }

            // Show confirmation alert
            alert(`✅ Booking Confirmed!\n\n👤 Name: ${fullName}\n📞 Contact: ${phoneNumber}\n${bookingDetails}\n🏛 Temple Contact: 98765 43210`);

            form.reset(); // Clear form after submission
        } else {
            alert('❌ Booking Failed: ' + data.message);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert('❌ Error: Could not complete the booking.');
    }
}

// Attach event listeners to forms
document.getElementById('monthlyForm').addEventListener('submit', (e) => submitForm(e, monthlyForm, MONTHLY_URL, 'monthly'));
document.getElementById('oneTimeForm').addEventListener('submit', (e) => submitForm(e, oneTimeForm, ONETIME_URL, 'oneTime'));
