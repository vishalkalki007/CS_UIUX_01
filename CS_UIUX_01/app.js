// Toggle password character reading safely
function togglePassVisibility() {
    const passInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle');
    if (passInput.type === "password") {
        passInput.type = "text";
        toggleIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passInput.type = "password";
        toggleIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

// Error-free real-time form checks
function validateStep1() {
    const nameEl = document.getElementById('fullName');
    const emailEl = document.getElementById('email');
    const passEl = document.getElementById('password');
    
    let isValid = true;

    // Name Verification
    if (nameEl.value.trim() === "") {
        document.getElementById('nameGroup').classList.add('input-error');
        isValid = false;
    } else {
        document.getElementById('nameGroup').classList.remove('input-error');
    }

    // Simple Email Regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailEl.value.trim())) {
        document.getElementById('emailGroup').classList.add('input-error');
        isValid = false;
    } else {
        document.getElementById('emailGroup').classList.remove('input-error');
    }

    // Secure password length confirmation
    if (passEl.value.length < 8) {
        document.getElementById('passGroup').classList.add('input-error');
        isValid = false;
    } else {
        document.getElementById('passGroup').classList.remove('input-error');
    }

    if (isValid) {
        // Personalize Step 2 heading text dynamically using entered data
        document.getElementById('welcomeGreeting').innerText = `Hi, ${nameEl.value.trim()}! 👋`;
        switchStep('stepAccount', 'stepPersonalize');
    }
}

// Selection handling for personalization chips
function toggleChip(chipElement) {
    chipElement.classList.toggle('selected');
}

// Final UI Assembly
function completeSignup() {
    const selectedChips = document.querySelectorAll('.chip.selected');
    const selectedInterests = Array.from(selectedChips).map(c => c.innerText);
    const email = document.getElementById('email').value;
    
    // Populate Personalized Dashboard content text contextually
    document.getElementById('dashMeta').innerHTML = `Account Verified via:<br><strong>${email}</strong>`;
    switchStep('stepPersonalize', 'stepDashboard');
}

// Screen switching driver
function switchStep(oldStepId, newStepId) {
    document.getElementById(oldStepId).classList.add('hidden');
    document.getElementById(newStepId).classList.remove('hidden');
}

// Reset App State cleanly on logout
function resetFlow() {
    document.getElementById('accountForm').reset();
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    switchStep('stepDashboard', 'stepAccount');
}