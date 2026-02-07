// LocalStorage-based Project entity (Base44-free)
const STORAGE_KEY = 'mcfarlane_projects';

const getProjects = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const saveProjects = (projects) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const Project = {
    /**
     * List all projects with optional sorting
     * @param {string} sortField - Field to sort by (prefix with '-' for descending)
     * @param {number} limit - Max projects to return
     */
    async list(sortField = '-year', limit = 1000) {
        let projects = getProjects();

        // Handle sorting
        if (sortField) {
            const desc = sortField.startsWith('-');
            const field = desc ? sortField.slice(1) : sortField;

            projects.sort((a, b) => {
                const aVal = a[field] || '';
                const bVal = b[field] || '';
                const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                return desc ? -comparison : comparison;
            });
        }

        return projects.slice(0, limit);
    },

    /**
     * Create a new project
     * @param {Object} data - Project data
     */
    async create(data) {
        const projects = getProjects();
        const newProject = {
            ...data,
            id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            created_at: new Date().toISOString()
        };
        projects.push(newProject);
        saveProjects(projects);
        return newProject;
    },

    /**
     * Update an existing project
     * @param {string} id - Project ID
     * @param {Object} data - Updated project data
     */
    async update(id, data) {
        const projects = getProjects();
        const index = projects.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Project not found');
        }
        projects[index] = { ...projects[index], ...data, updated_at: new Date().toISOString() };
        saveProjects(projects);
        return projects[index];
    },

    /**
     * Delete a project
     * @param {string} id - Project ID
     */
    async delete(id) {
        const projects = getProjects();
        const filtered = projects.filter(p => p.id !== id);
        saveProjects(filtered);
        return { success: true };
    }
};
