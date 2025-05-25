document.addEventListener('DOMContentLoaded', () => {
    const whatsappButtons = document.querySelectorAll('.whatsapp-button');
    const themeToggle = document.getElementById('theme-toggle');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const body = document.body;
    const backToTopButton = document.getElementById('back-to-top');

    // --- WhatsApp Button Functionality ---
    whatsappButtons.forEach(button => {
        button.addEventListener('click', () => {
            const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp kamu
            const productName = button.dataset.product;
            const message = `Halo, saya tertarik dengan produk ${productName} yang ada di website Anda. Bisakah Anda memberikan informasi lebih lanjut?`;
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    });

    // --- Theme Toggle Functionality ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            // Remove rain effect if active when switching to dark
            document.querySelector('.rain')?.classList.remove('active');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            // Optional: add rain effect if switching to light (original snow)
            // if (body.classList.contains('snow')) {
            //     document.querySelector('.rain').classList.add('active');
            // }
        }
    });

    // --- Music Player Functionality ---
    let isMusicPlaying = false; // Track music state
    const savedMusicState = localStorage.getItem('musicState');
    if (savedMusicState === 'playing') {
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }).catch(error => {
            console.log('Autoplay was prevented. User needs to interact.', error);
            isMusicPlaying = false; // Reset if autoplay fails
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        });
    } else {
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }

    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            isMusicPlaying = false;
            localStorage.setItem('musicState', 'paused');
        } else {
            backgroundMusic.play().then(() => {
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                isMusicPlaying = true;
                localStorage.setItem('musicState', 'playing');
            }).catch(error => {
                console.log('Failed to play music:', error);
                alert('Browser mencegah musik diputar otomatis. Mohon izinkan pemutaran media.');
            });
        }
    });

    // --- Back to Top Button Functionality ---
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Mini Calculator Functionality ---
    const calcDisplay = document.getElementById('calc-display');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;
    let waitingForSecondOperand = false;

    window.appendToDisplay = (value) => {
        if (waitingForSecondOperand) {
            currentInput = value;
            waitingForSecondOperand = false;
        } else {
            currentInput += value;
        }
        calcDisplay.value = currentInput;
    };

    window.clearDisplay = () => {
        currentInput = '';
        operator = '';
        firstOperand = null;
        waitingForSecondOperand = false;
        calcDisplay.value = '';
    };

    window.calculateResult = () => {
        if (operator && currentInput !== '') {
            const secondOperand = parseFloat(currentInput);
            let result;
            switch (operator) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    result = firstOperand / secondOperand;
                    break;
                default:
                    return;
            }
            calcDisplay.value = result;
            currentInput = result.toString();
            firstOperand = result;
            operator = '';
            waitingForSecondOperand = true;
        }
    };

    // --- Weather/Theme Effect (Rain/Snow -> Rain) ---
    // Instead of 'snow' which is complex, let's implement 'rain' for simplicity and effect
    // We'll add a 'rain' class to the body when the weather theme is 'rain'.
    // For "cuaca terang", it means no rain.
    // The request was "tema salju ganti hujan dan cuaca terang".
    // I'll assume "cuaca terang" is the default state (no rain/snow).
    // And "hujan" can be triggered. This needs a dedicated button or auto-trigger.
    // For now, I'll make it tied to the theme toggle, but you can make a separate button.

    // Let's create a 'rain' element dynamically
    const rainElement = document.createElement('div');
    rainElement.classList.add('rain');
    body.appendChild(rainElement);

    // To simplify, let's assume "tema salju ganti hujan" means when we switch to a specific mode, it rains.
    // I will tie it to a new "weather" button (you'll need to add it to HTML if desired).
    // For now, I'll demonstrate how you *could* toggle it.

    // Example of how to toggle rain (you'd integrate this with a button or a theme switch)
    // For the prompt's request: "tema salju ganti hujan dan cuaca terang"
    // I'll make the rain effect *active* when the 'dark-theme' is *not* active (i.e., light theme).
    // This makes 'light theme' effectively 'rainy' (replacing snow).
    // And 'dark theme' would be 'cuaca terang' (with stars).

    // This is a stylistic choice based on interpreting "ganti hujan" with "salju"
    // If the intent is a separate weather toggle, you'd need another button.
    // For now, when light theme is active, rain effect will be there.
    if (!body.classList.contains('dark-theme')) {
         rainElement.classList.add('active');
    }

    // Modify theme toggle to handle rain
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            // Switched to dark theme - remove rain
            rainElement.classList.remove('active');
        } else {
            // Switched to light theme - add rain
            rainElement.classList.add('active');
        }
    });

    // Initial check on load
    if (!body.classList.contains('dark-theme')) {
        rainElement.classList.add('active');
    }
});
