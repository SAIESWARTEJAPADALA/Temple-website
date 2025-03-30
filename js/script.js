// 🟣 Change background color on click
document.body.addEventListener("click", function() {
    document.body.style.backgroundColor = "#f8f8f8";
});

// 🟠 Smooth scroll effect for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.startsWith("#")) {
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            window.location.href = targetId;
        }
    });
});

// 🔰 Highlight active page in navigation
document.querySelectorAll("nav ul li a").forEach(link => {
    if (link.href === window.location.href) {
        link.style.color = "yellow";
    }
});

//📩 booking page: Validate booking form
document.getElementById("poojaType").addEventListener("change", function() {
    let oneTimeSection = document.getElementById("oneTimePoojaSection");
    let monthlySection = document.getElementById("monthlyPoojaSection");

    if (this.value === "one-time") {
        oneTimeSection.style.display = "block";
        monthlySection.style.display = "none";
    } else if (this.value === "monthly") {
        oneTimeSection.style.display = "none";
        monthlySection.style.display = "block";
    } else {
        oneTimeSection.style.display = "none";
        monthlySection.style.display = "none";
    }
});

document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let poojaType = document.getElementById("poojaType").value;
    let detailsMessage = `Name: ${name}\nPhone: ${phone}\nPooja Type: ${poojaType === 'monthly' ? 'Monthly Pooja' : 'One-Time Pooja'}`;

    if (poojaType === "one-time") {
        let date = document.getElementById("date").value;
        let time = document.getElementById("time").value;
        detailsMessage += `\nDate: ${date}\nTime Slot: ${time}`;
    } else if (poojaType === "monthly") {
        let startMonth = document.getElementById("startMonth").value;
        let endMonth = document.getElementById("endMonth").value;
        detailsMessage += `\nStarting Month: ${startMonth}\nEnding Month: ${endMonth}`;
    }

    alert(`✅ Booking Confirmed:\n\n${detailsMessage}\n\n📞 For confirmation of your ticket, please contact: +91 92XXXXXXX.`);

    let confirmationBox = document.getElementById("confirmationMessage");
    confirmationBox.innerHTML = `<strong>✅ Booking Details:</strong><br>${detailsMessage.replace(/\n/g, "<br>")}<br><br>
    📞 <strong>For confirmation of your ticket, please contact: <span style="color: red;">+91 92XXXXXXX</span></strong>`;
    confirmationBox.style.display = "block";

    setTimeout(() => {
        confirmationBox.style.display = "none";
    }, 10000);

    // Reset the form after submission
    document.getElementById("bookingForm").reset();

    // Hide pooja sections after reset
    document.getElementById("oneTimePoojaSection").style.display = "none";
    document.getElementById("monthlyPoojaSection").style.display = "none";
});


// 📩 Contact Page: Validate contact form
if (window.location.pathname.includes("contact.html")) {
    let contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            let email = document.getElementById("email").value;
            if (!email.includes("@")) {
                alert("దయచేసి చెల్లుబాటు అయ్యే ఇమెయిల్ ఇవ్వండి.");
                event.preventDefault();
            }
        });
    }
}
