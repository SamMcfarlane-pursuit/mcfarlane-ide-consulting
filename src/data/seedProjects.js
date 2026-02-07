// Project seed data from GitHub repositories
// This file populates the portfolio with real project data

import { Project } from '@/entities/Project';

export const githubProjects = [
    {
        title: 'McFarlane IDE Consulting',
        description: 'Interactive 3D portfolio website featuring a dynamic globe visualization, Three.js animations, and an amber/gold design theme. Built as a showcase of modern React development techniques.',
        technologies: ['React', 'Three.js', 'Framer Motion', 'JavaScript', 'Vite', 'TailwindCSS'],
        github_url: 'https://github.com/SamMcfarlane-pursuit/mcfarlane-ide-consulting',
        live_url: null,
        image: '/assets/projects/mcfarlane-ide.webp',
        status: 'in_progress',
        year: 2026,
        featured: true,
        category: 'web'
    },
    {
        title: 'Auction Intel',
        description: 'Advanced Tax Lien Analytics Platform featuring a US State Grid Map, intelligent tier detection, and county-level market intelligence for investment decision-making.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Data Visualization', 'Vercel'],
        github_url: 'https://github.com/SamMcfarlane-pursuit/auction-intel',
        live_url: 'https://auction-intel.vercel.app',
        image: '/assets/projects/auction-intel.webp',
        status: 'completed',
        year: 2025,
        featured: true,
        category: 'dataviz'
    },
    {
        title: 'Petal Prose',
        description: 'Customizable flower arrangement platform allowing users to design and personalize floral compositions with an intuitive interface.',
        technologies: ['TypeScript', 'React', 'Node.js', 'CSS'],
        github_url: 'https://github.com/SamMcfarlane-pursuit/Petal-Prose-',
        live_url: null,
        image: '/assets/projects/petal-prose.webp',
        status: 'completed',
        year: 2025,
        featured: false,
        category: 'web'
    },
    {
        title: 'HVAC Hub',
        description: 'Central management hub for HVAC job scheduling, tracking, and operations. Features real-time updates and comprehensive job management capabilities.',
        technologies: ['TypeScript', 'React', 'Vercel', 'Node.js'],
        github_url: 'https://github.com/SamMcfarlane-pursuit/HVAC-Hub-',
        live_url: 'https://hvac-hub-sams-projects-a99fd918.vercel.app',
        image: '/assets/projects/hvac-hub.webp',
        status: 'completed',
        year: 2026,
        featured: true,
        category: 'web'
    },
    {
        title: 'APRicut',
        description: 'Auto loan helper application designed to assist users in understanding and optimizing their vehicle financing options.',
        technologies: ['TypeScript', 'React', 'Financial APIs'],
        github_url: 'https://github.com/SamMcfarlane-pursuit/APRicut',
        live_url: null,
        image: '/assets/projects/apricut.webp',
        status: 'planning',
        year: 2025,
        featured: false,
        category: 'web'
    },
    {
        title: 'Ballistic Intelligence Platform',
        description: 'Executive Dashboard with Crunchbase Integration - Real-time cybersecurity intelligence platform for comprehensive threat analysis and business intelligence.',
        technologies: ['TypeScript', 'React', 'Crunchbase API', 'Data Analytics', 'Security'],
        github_url: 'https://github.com/SamMcfarlane-pursuit/ballistic-intelligence-platform-2',
        live_url: null,
        image: '/assets/projects/ballistic.webp',
        status: 'completed',
        year: 2025,
        featured: true,
        category: 'dataviz'
    },
    {
        title: 'Climate Intelligence Hub',
        description: 'AI-powered climate risk analysis platform for investment decision-making. Leverages machine learning to assess environmental risks and opportunities.',
        technologies: ['JavaScript', 'React', 'AI/ML', 'Climate Data APIs', 'D3.js'],
        github_url: 'https://github.com/SamMcfarlane-pursuit/climate-intelligence-hub',
        live_url: null,
        image: '/assets/projects/climate-hub.webp',
        status: 'completed',
        year: 2025,
        featured: true,
        category: 'dataviz'
    },
    {
        title: 'Portfolio KPI Copilot',
        description: 'AI-powered Portfolio KPI Analysis with Llama 3.2 integration - Local LLM for intelligent portfolio management and performance tracking.',
        technologies: ['TypeScript', 'React', 'Llama 3.2', 'Ollama', 'AI/ML', 'Python'],
        github_url: 'https://github.com/SamMcfarlane-pursuit/Portfolio-KPI-copilot',
        live_url: null,
        image: '/assets/projects/kpi-copilot.webp',
        status: 'completed',
        year: 2025,
        featured: true,
        category: 'ai'
    },
    {
        title: 'AetherCode IDE',
        description: 'An AI-powered integrated development environment designed to enhance coding productivity through intelligent code suggestions and automation.',
        technologies: ['JavaScript', 'React', 'AI/ML', 'Monaco Editor', 'Vercel'],
        github_url: 'https://github.com/SamMcfarlane-pursuit/aethercode-vercel-app',
        live_url: 'https://aethercode-vercel-app.vercel.app',
        image: '/assets/projects/aethercode.webp',
        status: 'in_progress',
        year: 2025,
        featured: true,
        category: 'ai'
    },
    {
        title: 'LLM Fine-Tuning Thesaurus',
        description: 'A specialized tool for LLM fine-tuning workflows, providing semantic vocabulary expansion and training data preparation.',
        technologies: ['HTML', 'Python', 'NLP', 'Machine Learning'],
        github_url: 'https://github.com/SamMcfarlane-pursuit/llm-fine-tuning-thesaurus',
        live_url: null,
        image: '/assets/projects/llm-thesaurus.webp',
        status: 'completed',
        year: 2025,
        featured: false,
        category: 'ai'
    },
    {
        title: 'RPG Themes',
        description: 'A collection of RPG-inspired visual themes and design assets for creative projects and game development.',
        technologies: ['TypeScript', 'CSS', 'Design System'],
        github_url: 'https://github.com/SamMcfarlane-pursuit/rpg-themes',
        live_url: null,
        image: '/assets/projects/rpg-themes.webp',
        status: 'completed',
        year: 2025,
        featured: false,
        category: 'ui'
    }
];

/**
 * Seeds the portfolio with GitHub project data
 * Call this function to populate localStorage with projects
 */
export async function seedProjects() {
    const SEED_FLAG = 'mcfarlane_projects_seeded';

    // Check if already seeded
    if (localStorage.getItem(SEED_FLAG)) {
        console.log('Projects already seeded');
        return false;
    }

    console.log('Seeding projects from GitHub data...');

    for (const projectData of githubProjects) {
        try {
            await Project.create(projectData);
            console.log(`✓ Created: ${projectData.title}`);
        } catch (error) {
            console.error(`✗ Failed to create ${projectData.title}:`, error);
        }
    }

    // Mark as seeded
    localStorage.setItem(SEED_FLAG, 'true');
    console.log('✓ Project seeding complete!');
    return true;
}

/**
 * Force re-seeds projects (clears existing and re-adds)
 */
export async function forceSeedProjects() {
    localStorage.removeItem('mcfarlane_projects_seeded');
    localStorage.removeItem('mcfarlane_projects');
    return seedProjects();
}

export default { githubProjects, seedProjects, forceSeedProjects };
