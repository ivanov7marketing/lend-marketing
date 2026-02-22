document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('config-form');
    const saveBtn = document.getElementById('save-btn');
    const statusMsg = document.getElementById('save-status');
    const navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');

    let currentConfig = { theme: {}, content: {} };

    // Fetch config
    try {
        const res = await fetch('/api/config');
        if (res.ok) {
            currentConfig = await res.json();
            populateForm(currentConfig);
        } else if (res.status === 401) {
            // Should be handled by browser basic auth, but just in case
            window.location.reload();
        }
    } catch (err) {
        console.error("Failed to load config", err);
        showStatus("Ошибка загрузки", "error");
    }

    // Connect color pickers to text inputs
    document.querySelectorAll('input[type="color"]').forEach(colorInput => {
        const textInput = colorInput.nextElementSibling;
        colorInput.addEventListener('input', (e) => {
            textInput.value = e.target.value;
        });
    });

    // Populate form fields
    function populateForm(config) {
        // Theme
        for (const [key, value] of Object.entries(config.theme || {})) {
            const input = document.getElementById(`theme.${key}`);
            if (input) {
                input.value = value;
                if (input.type === 'color') {
                    const textInput = input.nextElementSibling;
                    if (textInput && textInput.classList.contains('color-text')) {
                        textInput.value = value;
                    }
                }
            }
        }
        // Content
        for (const [key, value] of Object.entries(config.content || {})) {
            const input = document.getElementById(`content.${key}`);
            if (input) {
                input.value = value;
            }
        }
    }

    // Save config
    saveBtn.addEventListener('click', async () => {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Сохранение...';

        const newConfig = {
            theme: { ...currentConfig.theme },
            content: { ...currentConfig.content }
        };

        const formData = new FormData(form);
        for (const [name, value] of formData.entries()) {
            if (name.endsWith('-text')) continue; // Skip helper inputs

            if (name.startsWith('theme.')) {
                newConfig.theme[name.replace('theme.', '')] = value;
            } else if (name.startsWith('content.')) {
                newConfig.content[name.replace('content.', '')] = value;
            }
        }

        try {
            const res = await fetch('/api/config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newConfig)
            });

            if (res.ok) {
                currentConfig = newConfig;
                showStatus("Успешно сохранено!", "success");
            } else {
                showStatus("Ошибка при сохранении", "error");
            }
        } catch (err) {
            console.error("Failed to save", err);
            showStatus("Ошибка сети", "error");
        } finally {
            saveBtn.disabled = false;
            saveBtn.textContent = 'Сохранить изменения';
        }
    });

    function showStatus(msg, type) {
        statusMsg.textContent = msg;
        statusMsg.className = `status-msg show status-${type}`;
        setTimeout(() => {
            statusMsg.classList.remove('show');
        }, 3000);
    }

    // Simple scrollspy for sidebar
    const sections = document.querySelectorAll('.config-section');
    const mainContent = document.querySelector('.main-content');

    // Instead of intercepting scroll of the window, since layout flex 1 is used, check if window scrolls
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });
});
