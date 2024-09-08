
// Define types for resume data
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
  linkedin?: string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: string[];
}

// Fetch and display the generated resume data
console.log("Displaying Generated Resume");

const resumeContainer = document.getElementById('resume-container') as HTMLDivElement;
const successMessage = document.getElementById('success-message') as HTMLDivElement;
const resumeDataString = window.localStorage.getItem('resumeData');
let resumeData: ResumeData | null = resumeDataString ? JSON.parse(resumeDataString) : null;

const showSuccessMessage = () => {
  successMessage.textContent = 'Changes saved successfully!';
  successMessage.classList.add('show');
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 2000);
};

const saveChanges = (updatedData: ResumeData) => {
  window.localStorage.setItem('resumeData', JSON.stringify(updatedData));
  showSuccessMessage();
};

if (resumeData) {
  const renderResume = () => {
    resumeContainer.innerHTML = `
            <header class="header" contenteditable="true" data-key="name">${resumeData?.name}</header>
            <div class="personal-info" contenteditable="true" data-key="contact">
                <p><strong>Email:</strong> <span contenteditable="true" data-key="email" style="margin-left: 10px;">${resumeData?.email}</span></p>
                <p><strong>Phone:</strong> <span contenteditable="true" data-key="phone" style="margin-left: 10px;">${resumeData?.phone}</span></p>
                <p><strong>LinkedIn:</strong> <span contenteditable="true" data-key="linkedin" style="margin-left: 10px;">${resumeData?.linkedin || 'N/A'}</span></p>
            </div>
            <section class="education" contenteditable="true" data-key="education">
                <h2>Education</h2>
                <div class="education-list">
                    ${resumeData?.education.map((edu, idx) => `
                        <div class="education-item" data-idx="${idx}">
                            <h3 contenteditable="true" data-key="degree">${edu.degree}</h3>
                            <p><strong contenteditable="true" data-key="university">${edu.university}</strong></p>
                            <p contenteditable="true" data-key="graduationYear">${edu.graduationYear}</p>
                        </div>
                    `).join('')}
                </div>
            </section>
            <section class="work-experience" contenteditable="true" data-key="workExperience">
                <h2>Work Experience</h2>
                <div class="work-experience-list">
                    ${resumeData?.workExperience.map((exp, idx) => `
                        <div class="work-experience-item" data-idx="${idx}">
                            <h3 contenteditable="true" data-key="jobTitle">${exp.jobTitle}</h3>
                            <p><strong contenteditable="true" data-key="company">${exp.company}</strong> (${exp.duration})</p>
                        </div>
                    `).join('')}
                </div>
            </section>
            <section class="skills" contenteditable="true" data-key="skills">
                <h2>Skills</h2>
                <ul class="skills-list">
                    ${resumeData?.skills.map(skill => `
                        <li class="skill-item" contenteditable="true">${skill}</li>
                    `).join('')}
                </ul>
            </section>
            <div class="share-buttons">
                <button id="share-button">Share Resume</button>
                <button id="download-button">Download Resume (PDF)</button>
            </div>
        `;

    // Share button logic
    const shareButton = document.getElementById('share-button') as HTMLButtonElement;
    shareButton.onclick = () => {
      const username = resumeData?.name.replace(/\s+/g, '').toLowerCase();
      const resumeUrl = `${username}.vercel.app/resume`;
      navigator.clipboard.writeText(resumeUrl);
      alert('Resume URL copied to clipboard!');
    };

    // Download button logic
    const downloadButton = document.getElementById('download-button') as HTMLButtonElement;
    downloadButton.onclick = () => {
      const pdfContent = `
        <h1>${resumeData?.name}</h1>
        <p>Email: ${resumeData?.email}</p>
        <p>Phone: ${resumeData?.phone}</p>
        <p>LinkedIn: ${resumeData?.linkedin || 'N/A'}</p>
        <!-- ... (rest of the PDF content remains the same) -->
    `;
      const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'resume.pdf';
      a.click();
      URL.revokeObjectURL(pdfUrl);
    };

    document.querySelectorAll('[contenteditable="true"]').forEach(element => {
      element.addEventListener('blur', (event) => {
        const target = event.target as HTMLElement;
        const key = target.getAttribute('data-key');
        const parent = target.closest('[data-key]');
        const sectionKey = parent?.getAttribute('data-key') || key;

        if (sectionKey && resumeData) {
          switch (sectionKey) {
            case 'education':
              const educationIdx = target.closest('.education-item')?.getAttribute('data-idx');
              if (educationIdx !== null && educationIdx !== undefined) {
                const educationIndex = +educationIdx;
                const educationField = key as keyof Education;
                if (educationField && ['degree', 'university', 'graduationYear'].includes(educationField)) {
                  resumeData.education[educationIndex] = {
                    ...resumeData.education[educationIndex],
                    [educationField]: target.textContent || '',
                  };
                }
              }
              break;
            case 'workExperience':
              const workExperienceIdx = target.closest('.work-experience-item')?.getAttribute('data-idx');
              if (workExperienceIdx !== null && workExperienceIdx !== undefined) {
                const workExperienceIndex = +workExperienceIdx;
                const workExperienceField = key as keyof WorkExperience;
                if (workExperienceField) {
                  resumeData.workExperience[workExperienceIndex] = {
                    ...resumeData.workExperience[workExperienceIndex],
                    [workExperienceField]: target.textContent || '',
                  };
                }
              }
              break;
            case 'skills':
              const skillsIdx = Array.from((target as HTMLElement).parentElement?.children || []).indexOf(target as HTMLElement);
              if (skillsIdx !== -1) {
                resumeData.skills[skillsIdx] = target.textContent || '';
              }
              break;
            case 'contact':
              const email = (resumeContainer.querySelector('[data-key="email"]') as HTMLElement).textContent || '';
              const phone = (resumeContainer.querySelector('[data-key="phone"]') as HTMLElement).textContent || '';
              const linkedin = (resumeContainer.querySelector('[data-key="linkedin"]') as HTMLElement).textContent || '';
              resumeData = {
                ...resumeData,
                email,
                phone,
                linkedin,
              };
              break;
            default:
              if (sectionKey === 'name') {
                resumeData.name = target.textContent || '';
              }
              break;
          }

          saveChanges(resumeData);
        }
      });
    });
  };

  renderResume();
} else {
  resumeContainer.innerHTML = `<p>No resume data found. Please go back and fill out the form.</p>`;
}
