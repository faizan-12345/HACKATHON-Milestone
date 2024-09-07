"use strict";
console.log("TypeScript is working incredibly well! 🚀");
var VisibilityState;
(function (VisibilityState) {
    VisibilityState["Visible"] = "visible";
    VisibilityState["Hidden"] = "hidden";
})(VisibilityState || (VisibilityState = {}));
// Function to determine the initial visibility state based on the element's classes
const getInitialVisibilityState = (element) => {
    return element.classList.contains('hidden') ? VisibilityState.Hidden : VisibilityState.Visible;
};
// Function to handle visibility toggle with smooth animation
const toggleVisibility = (element) => {
    const { targetSection, state } = element;
    if (state === VisibilityState.Visible) {
        targetSection.classList.add('hidden');
        element.state = VisibilityState.Hidden;
    }
    else {
        targetSection.classList.remove('hidden');
        element.state = VisibilityState.Visible;
    }
    // Provide some visual feedback on button click
    element.toggleButton.classList.add('active');
    setTimeout(() => element.toggleButton.classList.remove('active'), 150);
};
// Main initialization function
const initToggleSkillsFeature = () => {
    const skillsSection = document.getElementById('skills');
    const toggleButton = document.getElementById('toggle-skills');
    if (!toggleButton || !skillsSection) {
        console.error("Required elements are missing!");
        return;
    }
    // Initialize with the correct state based on the current visibility of the skills section
    const toggleableElement = {
        toggleButton,
        targetSection: skillsSection,
        state: getInitialVisibilityState(skillsSection),
    };
    // Event listener to toggle visibility
    toggleButton.addEventListener('click', () => toggleVisibility(toggleableElement));
};
// Ensure the DOM is fully loaded before initializing
document.addEventListener('DOMContentLoaded', initToggleSkillsFeature);
//# sourceMappingURL=main.js.map