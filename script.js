/* =========================================================
   AI PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");
        }
    });


    /* Close menu after clicking a link */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");
        });

    });
}


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const icon = themeBtn.querySelector("i");

        if (document.body.classList.contains("light-mode")) {

            icon.classList.remove("fa-moon");

            icon.classList.add("fa-sun");

            localStorage.setItem("theme", "light");

        } else {

            icon.classList.remove("fa-sun");

            icon.classList.add("fa-moon");

            localStorage.setItem("theme", "dark");
        }

    });


    /* Load saved theme */

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        const icon = themeBtn.querySelector("i");

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");
    }
}


/* =========================================================
   SCROLL TOP
========================================================= */

const scrollTop = document.getElementById("scrollTop");

if (scrollTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            scrollTop.classList.add("show");

        } else {

            scrollTop.classList.remove("show");
        }
    });


    scrollTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"
        });

    });
}


/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");
        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {

            link.classList.add("active");
        }

    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .why-card, .about-content, .about-image, .skills-column"
);

if (revealElements.length > 0) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);
    });

}


/* =========================================================
   PROJECT IMAGE GALLERIES
========================================================= */

document.querySelectorAll(".project-image-gallery").forEach(gallery => {

    const slider = gallery.querySelector(".project-slider");
    const previousButton = gallery.querySelector(".project-gallery-arrow-prev");
    const nextButton = gallery.querySelector(".project-gallery-arrow-next");

    if (!slider || !previousButton || !nextButton) {
        return;
    }

    const slides = Array.from(slider.children);

    if (slides.length === 0) {
        return;
    }

    const getCurrentIndex = () => {
        const sliderLeft = slider.getBoundingClientRect().left;

        return slides.reduce((closestIndex, slide, index) => {
            const closestSlide = slides[closestIndex];
            const distance = Math.abs(slide.getBoundingClientRect().left - sliderLeft);
            const closestDistance = Math.abs(closestSlide.getBoundingClientRect().left - sliderLeft);

            return distance < closestDistance ? index : closestIndex;
        }, 0);
    };

    const updateButtons = () => {
        const currentIndex = getCurrentIndex();

        previousButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === slides.length - 1;
    };

    const showSlide = index => {
        const targetIndex = Math.max(0, Math.min(index, slides.length - 1));
        const targetLeft = slides[targetIndex].getBoundingClientRect().left
            - slider.getBoundingClientRect().left
            + slider.scrollLeft;

        slider.scrollTo({ left: targetLeft, behavior: "smooth" });
    };

    previousButton.addEventListener("click", () => {
        showSlide(getCurrentIndex() - 1);
    });

    nextButton.addEventListener("click", () => {
        showSlide(getCurrentIndex() + 1);
    });

    slider.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    slider.querySelectorAll("img").forEach(image => {
        image.addEventListener("load", updateButtons, { once: true });
    });
    updateButtons();
});


/* =========================================================
   EMAIL BUTTON
========================================================= */

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {

    link.addEventListener("click", () => {

        console.log("Opening email client...");

    });

});