"use strict";
// Fetch and display the generated resume data
console.log("Displaying Generated Resume");
const resumeContainer = document.getElementById('resume-container');
const resumeDataString = window.localStorage.getItem('resumeData');
const resumeData = resumeDataString ? JSON.parse(resumeDataString) : null;
if (resumeData) {
    resumeContainer.innerHTML = `
        <header class="header">
            <h1>${resumeData.name}</h1>
            <p>${resumeData.email} | ${resumeData.phone}</p>
        </header>
        <div class="personal-info">
            <img src="./assets/sample-profile-pic.png" alt="Profile Picture" class="profile-pic">
            <div class="contact-details">
                <p><strong>Email:</strong> ${resumeData.email}</p>
                <p><strong>Phone:</strong> ${resumeData.phone}</p>
                <p><strong>LinkedIn:</strong> ${resumeData.linkedin || 'N/A'}</p>
            </div>
        </div>
        <section class="education">
            <h2>Education</h2>
            <div class="education-list">
                ${resumeData.education.map((edu) => `
                    <div class="education-item">
                        <h3>${edu.degree}</h3>
                        <p><strong>${edu.university}</strong></p>
                        <p>${edu.graduationYear}</p>
                    </div>
                `).join('')}
            </div>
        </section>
        <section class="work-experience">
            <h2>Work Experience</h2>
            <div class="work-experience-list">
                ${resumeData.workExperience.map((exp) => `
                    <div class="work-experience-item">
                        <h3>${exp.jobTitle}</h3>
                        <p><strong>${exp.company}</strong> (${exp.duration})</p>
                    </div>
                `).join('')}
            </div>
        </section>
        <section class="skills">
            <h2>Skills</h2>
            <ul class="skills-list">
                ${resumeData.skills.map(skill => `
                    <li class="skill-item">${skill}</li>
                `).join('')}
            </ul>
        </section>
    `;
}
else {
    resumeContainer.innerHTML = `<p>No resume data found. Please go back and fill out the form.</p>`;
}
//# sourceMappingURL=resume.js.map