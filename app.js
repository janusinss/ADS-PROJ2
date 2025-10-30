document.addEventListener('DOMContentLoaded', () => {
    // Initialize all data loading
    loadProfile();
    loadSkills();
    loadProjects();
    loadHobbies();
    setupContactForm();

    // Set footer year
    document.getElementById('footer-year').textContent = new Date().getFullYear();
});

/**
 * Loads profile data from the API and renders it.
 */
async function loadProfile() {
    try {
        const response = await fetch('./api/profile_api.php');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const profile = await response.json();
        renderProfile(profile);
    } catch (error) {
        console.error('Error loading profile:', error);
        document.getElementById('profile-content').innerHTML = '<p class="text-red-400">Error loading profile data.</p>';
    }
}

/**
 * Renders the profile data into the 'about' section.
 * @param {object} profile - The profile data object.
 */
function renderProfile(profile) {
    const profileContainer = document.getElementById('profile-content');
    profileContainer.innerHTML = `
        <div class="order-2 md:order-1">
            <h1 class="text-5xl font-bold mb-4">${profile.full_name}</h1>
            <h2 class="text-3xl font-light text-cyan-400 mb-6">${profile.professional_title}</h2>
            <p class="text-lg text-gray-300 mb-8">${profile.bio}</p>
            <div class="flex flex-wrap gap-4">
                <a href="#contact" class="btn-primary">
                    Contact Me
                </a>
                <a href="${profile.facebook_url}" target="_blank" rel="noopener noreferrer" class="btn-link">
                    <i data-lucide="facebook"></i>
                    Facebook
                </a>
            </div>
            <div class="mt-8 space-y-2 text-gray-300">
                <div class="flex items-center gap-3">
                    <i data-lucide="mail" class="text-cyan-400"></i>
                    <span>${profile.email}</span>
                </div>
                <div class="flex items-center gap-3">
                    <i data-lucide="phone" class="text-cyan-400"></i>
                    <span>${profile.phone}</span>
                </div>
            </div>
        </div>
        <div class="order-1 md:order-2 flex justify-center items-center">
            <img src="${profile.profile_photo_url}" alt="${profile.full_name}" 
                 class="w-64 h-64 md:w-96 md:h-96 rounded-full object-cover border-4 border-cyan-500 shadow-lg shadow-cyan-500/20">
        </div>
    `;
    lucide.createIcons(); // Re-initialize icons
}

/**
 * Loads skills data from the API and renders it.
 */
async function loadSkills() {
    try {
        const response = await fetch('./api/skills_api.php');
        if (!response.ok) throw new Error('Network response was not ok');

        const skills = await response.json();
        renderSkills(skills);
    } catch (error) {
        console.error('Error loading skills:', error);
        document.getElementById('skills-grid').innerHTML = '<p class="text-red-400">Error loading skills data.</p>';
    }
}

/**
 * Renders skills into a grid.
 * @param {Array} skills - An array of skill objects.
 */
function renderSkills(skills) {
    const skillsGrid = document.getElementById('skills-grid');
    if (skills.length === 0) {
        skillsGrid.innerHTML = '<p>No skills listed yet.</p>';
        return;
    }

    skillsGrid.innerHTML = skills.map(skill => `
        <div class="card-glass text-center p-6">
            <h3 class="text-xl font-bold mb-2">${skill.name}</h3>
            <p class="text-sm text-cyan-400 mb-4">${skill.category_name}</p>
            <div class="w-full bg-gray-700 rounded-full h-2.5">
                <div class="bg-cyan-500 h-2.5 rounded-full" style="width: ${skill.proficiency}%"></div>
            </div>
            <span class="text-xs font-medium text-gray-300 mt-2 block">${skill.proficiency}% Proficient</span>
        </div>
    `).join('');
}

/**
 * Loads projects data from the API and renders it.
 */
async function loadProjects() {
    try {
        const response = await fetch('./api/projects_api.php');
        if (!response.ok) throw new Error('Network response was not ok');

        const projects = await response.json();
        renderProjects(projects);
    } catch (error)
        {
        console.error('Error loading projects:', error);
        document.getElementById('projects-grid').innerHTML = '<p class="text-red-400">Error loading projects data.</p>';
    }
}

/**
 * Renders projects into a grid.
 * @param {Array} projects - An array of project objects.
 */
function renderProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    if (projects.length === 0) {
        projectsGrid.innerHTML = '<p>No projects listed yet.</p>';
        return;
    }

    projectsGrid.innerHTML = projects.map(project => `
        <div class="card-glass overflow-hidden flex flex-col">
            <img src="${project.image_url}" alt="${project.title}" class="w-full h-48 object-cover">
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                <p class="text-gray-300 text-sm mb-4 flex-grow">${project.description}</p>
                <div class="flex space-x-4 mt-auto">
                    <a href="${project.project_url}" target="_blank" rel="noopener noreferrer" class="btn-link">
                        <i data-lucide="external-link" class="w-4 h-4"></i>
                        Live Demo
                    </a>
                    <a href="${project.repo_url}" target="_blank" rel="noopener noreferrer" class="btn-link">
                        <i data-lucide="github" class="w-4 h-4"></i>
                        Repo
                    </a>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons(); // Re-initialize icons
}

/**
 * Loads hobbies data from the API and renders it.
 */
async function loadHobbies() {
    try {
        const response = await fetch('./api/hobbies_api.php');
        if (!response.ok) throw new Error('Network response was not ok');

        const hobbies = await response.json();
        renderHobbies(hobbies);
    } catch (error) {
        console.error('Error loading hobbies:', error);
        document.getElementById('hobbies-list').innerHTML = '<p class="text-red-400">Error loading hobbies data.</p>';
    }
}

/**
 * Renders hobbies into a list.
 * @param {Array} hobbies - An array of hobby objects.
 */
function renderHobbies(hobbies) {
    const hobbiesList = document.getElementById('hobbies-list');
    if (hobbies.length === 0) {
        hobbiesList.innerHTML = '<p>No hobbies listed yet.</p>';
        return;
    }

    hobbiesList.innerHTML = hobbies.map(hobby => `
        <div class="card-glass p-4">
            <h3 class="text-lg font-semibold">${hobby.name}</h3>
        </div>
    `).join('');
}

/**
 * Sets up the event listener for the contact form.
 */
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('contact-submit-btn');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formMessage.classList.add('hidden');

        // Create data object from form
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('./api/contacts_api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.status === 201) {
                // Success
                formMessage.textContent = result.message;
                formMessage.className = 'p-4 rounded-lg bg-green-900 text-green-300';
                form.reset();
            } else {
                // Error
                throw new Error(result.message || 'An unknown error occurred.');
            }
        } catch (error) {
            formMessage.textContent = error.message;
            formMessage.className = 'p-4 rounded-lg bg-red-900 text-red-300';
        } finally {
            formMessage.classList.remove('hidden');
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}
