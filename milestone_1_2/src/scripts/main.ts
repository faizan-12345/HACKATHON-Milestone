console.log("TypeScript is working incredibly well! 🚀");

enum VisibilityState {
    Visible = 'visible',
    Hidden = 'hidden',
}

interface ToggleableElement {
    toggleButton: HTMLButtonElement;
    targetSection: HTMLElement;
    state: VisibilityState;
}

const getInitialVisibilityState = (element: HTMLElement): VisibilityState => {
    return element.classList.contains('hidden') ? VisibilityState.Hidden : VisibilityState.Visible;
};

const toggleVisibility = (element: ToggleableElement): void => {
    const { targetSection, state } = element;

    if (state === VisibilityState.Visible) {
        targetSection.classList.add('hidden');
        element.state = VisibilityState.Hidden;
    } else {
        targetSection.classList.remove('hidden');
        element.state = VisibilityState.Visible;
    }

    element.toggleButton.classList.add('active');
    setTimeout(() => element.toggleButton.classList.remove('active'), 150);
};

const initToggleSkillsFeature = (): void => {
    const skillsSection = document.getElementById('skills') as HTMLElement;
    const toggleButton = document.getElementById('toggle-skills') as HTMLButtonElement;

    if (!toggleButton || !skillsSection) {
        console.error("Required elements are missing!");
        return;
    }

    const toggleableElement: ToggleableElement = {
        toggleButton,
        targetSection: skillsSection,
        state: getInitialVisibilityState(skillsSection),
    };

    toggleButton.addEventListener('click', () => toggleVisibility(toggleableElement));
};

document.addEventListener('DOMContentLoaded', initToggleSkillsFeature);
