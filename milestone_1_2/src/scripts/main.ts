console.log("TypeScript is working incredibly well! 🚀");

enum VisibilityState {
    Visible = 'visible',
    Hidden = 'hidden',
}

// Interface to define structure and type of DOM elements
interface ToggleableElement {
    toggleButton: HTMLButtonElement;
    targetSection: HTMLElement;
    state: VisibilityState;
}

// Function to determine the initial visibility state based on the element's classes
const getInitialVisibilityState = (element: HTMLElement): VisibilityState => {
    return element.classList.contains('hidden') ? VisibilityState.Hidden : VisibilityState.Visible;
};

// Function to handle visibility toggle with smooth animation
const toggleVisibility = (element: ToggleableElement): void => {
    const { targetSection, state } = element;

    if (state === VisibilityState.Visible) {
        targetSection.classList.add('hidden');
        element.state = VisibilityState.Hidden;
    } else {
        targetSection.classList.remove('hidden');
        element.state = VisibilityState.Visible;
    }

    // Provide some visual feedback on button click
    element.toggleButton.classList.add('active');
    setTimeout(() => element.toggleButton.classList.remove('active'), 150);
};

// Main initialization function
const initToggleSkillsFeature = (): void => {
    const skillsSection = document.getElementById('skills') as HTMLElement;
    const toggleButton = document.getElementById('toggle-skills') as HTMLButtonElement;

    if (!toggleButton || !skillsSection) {
        console.error("Required elements are missing!");
        return;
    }

    // Initialize with the correct state based on the current visibility of the skills section
    const toggleableElement: ToggleableElement = {
        toggleButton,
        targetSection: skillsSection,
        state: getInitialVisibilityState(skillsSection),
    };

    // Event listener to toggle visibility
    toggleButton.addEventListener('click', () => toggleVisibility(toggleableElement));
};

// Ensure the DOM is fully loaded before initializing
document.addEventListener('DOMContentLoaded', initToggleSkillsFeature);
