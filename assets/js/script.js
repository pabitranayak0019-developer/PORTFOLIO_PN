document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-cubic'
    });

    // 2. Typed.js Typing Animation
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Full-Stack Developer',
                'Computer Science Student',
                'UI/UX Enthusiast',
                'Web Application Engineer'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true
        });
    }

    // 3. VanillaTilt Effect for Glassmorphism Cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.js-tilt'), {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.2
        });
    }

    // 4. Particles.js Background Initialization
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: '#00f2fe' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4facfe',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } }
                }
            },
            retina_detect: true
        });
    }

    // 5. Scroll Progress Bar & Back to Top Button
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressHeight = (window.scrollY / totalHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = `${progressHeight}%`;
        }

        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    // 6. Interactive Cursor Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // 7. Contact Form Submission (Web3Forms API + SweetAlert2 Popup)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Update button visual state to "Sending..."
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin ms-2"></i>';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Thank you! Your message has been submitted successfully and sent directly to Pabitra.',
                        icon: 'success',
                        background: 'rgba(20, 20, 35, 0.95)',
                        color: '#ffffff',
                        confirmButtonColor: '#00d2ff',
                        confirmButtonText: 'Great!',
                        customClass: {
                            popup: 'glass-card border border-secondary'
                        }
                    });
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong while sending your message. Please try again later.',
                    icon: 'error',
                    background: 'rgba(20, 20, 35, 0.95)',
                    color: '#ffffff',
                    confirmButtonColor: '#ff4d4d',
                    customClass: {
                        popup: 'glass-card border border-secondary'
                    }
                });
            } finally {
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

});