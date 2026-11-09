const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-btn');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

const reqs = {
    length: { regex: /.{8,}/, el: document.getElementById('req-length') },
    upper: { regex: /[A-Z]/, el: document.getElementById('req-upper') },
    lower: { regex: /[a-z]/, el: document.getElementById('req-lower') },
    number: { regex: /[0-9]/, el: document.getElementById('req-number') },
    special: { regex: /[@$!%*?&]/, el: document.getElementById('req-special') }
};

// Toggle password visibility
toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
    }
});

// Check password strength dynamically
passwordInput.addEventListener('input', () => {
    const value = passwordInput.value;
    let passedRules = 0;

    // Validate individual rules
    for (const key in reqs) {
        if (reqs[key].regex.test(value)) {
            reqs[key].el.className = 'valid';
            passedRules++;
        } else {
            reqs[key].el.className = 'invalid';
        }
    }

    // Handle empty state
    if (value.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Strength: Empty';
        strengthText.style.color = '#888888';
        return;
    }

    // Update visuals based on passing criteria
    switch (passedRules) {
        case 0:
case 1:
        case 2:
            strengthBar.style.width = '25%';
            strengthBar.style.backgroundColor = 'var(--danger)';
            strengthText.textContent = 'Strength: Weak';
            strengthText.style.color = 'var(--danger)';
            break;
        case 3:
        case 4:
            strengthBar.style.width = '60%';
            strengthBar.style.backgroundColor = 'var(--warning)';
            strengthText.textContent = 'Strength: Medium';
            strengthText.style.color = 'var(--warning)';
            break;
        case 5:
            strengthBar.style.width = '100%';
            strengthBar.style.backgroundColor = 'var(--success)';
            strengthText.textContent = 'Strength: Strong';
            strengthText.style.color = 'var(--success)';
            break;
    }
});
