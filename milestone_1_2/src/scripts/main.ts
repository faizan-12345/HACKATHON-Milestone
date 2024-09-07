console.log("typescript is working incredible");

document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.getElementById('skills');
    const toggleButton = document.getElementById('toggle-skills');

    if (toggleButton && skillsSection) {
        toggleButton.addEventListener('click', () => {
            skillsSection.classList.toggle('hidden');
        });
    }
});
