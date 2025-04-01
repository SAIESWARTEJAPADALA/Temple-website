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



