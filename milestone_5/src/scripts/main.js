"use strict";
// Resume Builder with Interactive Form
console.log("Interactive Resume Builder is Live! 🚀");
// Step Navigation
const steps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.next-button');
const prevButtons = document.querySelectorAll('.prev-button');
const progressSteps = document.querySelectorAll('.progress-bar .step');
let currentStep = 0;
nextButtons.forEach((button) => button.addEventListener('click', nextStep));
prevButtons.forEach((button) => button.addEventListener('click', prevStep));
function nextStep() {
    if (validateForm()) {
        if (currentStep < steps.length - 1) {
            steps[currentStep].classList.remove('active');
            progressSteps[currentStep].classList.remove('active');
            currentStep++;
            steps[currentStep].classList.add('active');
            progressSteps[currentStep].classList.add('active');
        }
    }
}
function prevStep() {
    if (currentStep > 0) {
        steps[currentStep].classList.remove('active');
        progressSteps[currentStep].classList.remove('active');
        currentStep--;
        steps[currentStep].classList.add('active');
        progressSteps[currentStep].classList.add('active');
    }
}
// Form Submission
const form = document.getElementById('resume-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateForm()) {
        const formData = new FormData(form);
        const resumeData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            education: extractEducation(),
            workExperience: extractWorkExperience(),
            skills: formData.get('skills').split(',').map(skill => skill.trim())
        };
        generateResume(resumeData);
    }
});
// Get error elements with type assertions
const nameError = document.querySelector('#name + .error-message');
const emailError = document.querySelector('#email + .error-message');
const phoneError = document.querySelector('#phone + .error-message');
// Validation function
function validateForm() {
    let isValid = true;
    // Clear previous errors
    if (nameError)
        nameError.textContent = '';
    if (emailError)
        emailError.textContent = '';
    if (phoneError)
        phoneError.textContent = '';
    // Get input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    // Validation checks
    if (!name) {
        if (nameError)
            nameError.textContent = 'Name is required.';
        isValid = false;
    }
    if (!validateEmail(email)) {
        if (emailError)
            emailError.textContent = 'Invalid email format.';
        isValid = false;
    }
    if (!validatePhone(phone)) {
        if (phoneError)
            phoneError.textContent = 'Invalid phone number.';
        isValid = false;
    }
    return isValid;
}
// Validate email format
function validateEmail(email) {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Validate phone number format
function validatePhone(phone) {
    // Simple phone validation regex (adjust as needed)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
}
// Extract Education
function extractEducation() {
    return [{
            degree: document.getElementById('degree').value,
            university: document.getElementById('university').value,
            graduationYear: parseInt(document.getElementById('graduation-year').value)
        }];
}
// Extract Work Experience
function extractWorkExperience() {
    return [{
            jobTitle: document.getElementById('job-title').value,
            company: document.getElementById('company').value,
            duration: document.getElementById('job-duration').value
        }];
}
// Generate Resume (Redirect to new page or dynamic update)
function generateResume(data) {
    window.localStorage.setItem('resumeData', JSON.stringify(data));
    window.location.href = 'resume.html'; // Redirect to resume page
}
//# sourceMappingURL=main.js.map