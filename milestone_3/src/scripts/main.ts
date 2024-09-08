// Resume Builder with Interactive Form
console.log("Interactive Resume Builder is Live! 🚀");

interface Education {
    degree: string;
    university: string;
    graduationYear: number;
}

interface WorkExperience {
    jobTitle: string;
    company: string;
    duration: string;
}

interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: Education[];
    workExperience: WorkExperience[];
    skills: string[];
}

// Step Navigation
const steps = document.querySelectorAll('.form-step') as NodeListOf<HTMLElement>;
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
const form = document.getElementById('resume-form') as HTMLFormElement;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateForm()) {
        const formData = new FormData(form);

        const resumeData: ResumeData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            education: extractEducation(),
            workExperience: extractWorkExperience(),
            skills: (formData.get('skills') as string).split(',').map(skill => skill.trim())
        };

        generateResume(resumeData);
    }
});

// Get error elements with type assertions
const nameError = document.querySelector('#name + .error-message') as HTMLParagraphElement | null;
const emailError = document.querySelector('#email + .error-message') as HTMLParagraphElement | null;
const phoneError = document.querySelector('#phone + .error-message') as HTMLParagraphElement | null;

// Validation function
function validateForm(): boolean {
    let isValid = true;
    
    // Clear previous errors
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (phoneError) phoneError.textContent = '';

    // Get input values
    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();

    // Validation checks
    if (!name) {
        if (nameError) nameError.textContent = 'Name is required.';
        isValid = false;
    }

    if (!validateEmail(email)) {
        if (emailError) emailError.textContent = 'Invalid email format.';
        isValid = false;
    }

    if (!validatePhone(phone)) {
        if (phoneError) phoneError.textContent = 'Invalid phone number.';
        isValid = false;
    }

    return isValid;
}

// Validate email format
function validateEmail(email: string): boolean {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number format
function validatePhone(phone: string): boolean {
    // Simple phone validation regex (adjust as needed)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
}

// Extract Education
function extractEducation(): Education[] {
    return [{
        degree: (document.getElementById('degree') as HTMLInputElement).value,
        university: (document.getElementById('university') as HTMLInputElement).value,
        graduationYear: parseInt((document.getElementById('graduation-year') as HTMLInputElement).value)
    }];
}

// Extract Work Experience
function extractWorkExperience(): WorkExperience[] {
    return [{
        jobTitle: (document.getElementById('job-title') as HTMLInputElement).value,
        company: (document.getElementById('company') as HTMLInputElement).value,
        duration: (document.getElementById('job-duration') as HTMLInputElement).value
    }];
}

// Generate Resume (Redirect to new page or dynamic update)
function generateResume(data: ResumeData) {
    window.localStorage.setItem('resumeData', JSON.stringify(data));
    window.location.href = 'resume.html';  // Redirect to resume page
}
