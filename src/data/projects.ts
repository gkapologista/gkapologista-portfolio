export interface Project {
    id: number;
    slug: string;
    title: string;
    description: string;
    overview: string;
    technologies: string[];
    features: string[];
    challenges: string[];
    images: string[];
    tags: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        slug: 'personaweb',
        title: 'PersonaWeb',
        description: 'An e-commerce website featuring a Decision Tree Algorithm for Personalized Recommendations, providing tailored shopping experiences for users.',
        overview: 'PersonaWeb is an advanced e-commerce platform that leverages a Decision Tree Algorithm to deliver personalized product recommendations. The project aims to enhance user engagement and increase sales by tailoring the shopping experience to individual preferences.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MySQL'],
        features: [
            'Personalized product recommendations',
            'User authentication and profiles',
            'Shopping cart and checkout system',
            'Admin dashboard for product management',
        ],
        challenges: [
            'Implementing a scalable recommendation engine',
            'Ensuring secure user authentication',
            'Optimizing database queries for performance',
        ],
        images: [
            'src/assets/images/project1.png',
            'src/assets/images/project1.png',
            'src/assets/images/project1.png',
        ],
        tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MySQL'],
    },
    {
        id: 2,
        slug: 'website-portfolio',
        title: 'Website Portfolio',
        description: 'A modern portfolio website built with Vue.js and Quasar Framework, showcasing my work and skills.',
        overview: 'A personal portfolio website to showcase my projects, skills, and experience. Built with Vue.js and Quasar for a modern, responsive design.',
        technologies: ['Vue.js', 'Quasar'],
        features: [
            'Responsive design',
            'Project showcase',
            'Contact form',
        ],
        challenges: [
            'Ensuring cross-device compatibility',
            'Optimizing for performance and SEO',
        ],
        images: [
            'src/assets/images/project1.png',
            'src/assets/images/project1.png',
        ],
        tags: ['Vue.js', 'Quasar'],
    },
    {
        id: 3,
        slug: 'health-record-management-system',
        title: 'Health Record Management System',
        description: 'A comprehensive system for managing health records, built with Laravel framework.',
        overview: 'A web application for managing patient health records, appointments, and medical histories. Built with Laravel for robust backend support.',
        technologies: ['HTML', 'CSS', 'Laravel'],
        features: [
            'Patient record management',
            'Appointment scheduling',
            'Role-based access control',
        ],
        challenges: [
            'Data privacy and security',
            'Complex relational data modeling',
        ],
        images: [
            'src/assets/images/project1.png',
        ],
        tags: ['HTML', 'CSS', 'Laravel'],
    },
    {
        id: 4,
        slug: 'certification-platform',
        title: 'Certification Platform',
        description: 'A platform developed during my internship that connects students with programming experts for certification, facilitating learning and professional development.',
        overview: 'A web platform connecting students with programming experts for certification and learning opportunities.',
        technologies: ['Vue.js', 'Strapi', 'PostgreSQL'],
        features: [
            'Expert-student matching',
            'Certification management',
            'Learning resources',
        ],
        challenges: [
            'Integrating third-party APIs',
            'Managing user roles and permissions',
        ],
        images: [
            'src/assets/images/project1.png',
        ],
        tags: ['Vue.js', 'Strapi', 'PostgreSQL'],
    },
    {
        id: 5,
        slug: 'sausage-party',
        title: 'Sausage Party',
        description: 'A 3D obstacle-type game created during college, featuring immersive gameplay and challenging levels.',
        overview: 'A 3D obstacle game developed in Unity, featuring custom models and challenging levels.',
        technologies: ['Unity', 'Blender', 'C++'],
        features: [
            '3D graphics and animation',
            'Multiple levels',
            'Physics-based obstacles',
        ],
        challenges: [
            '3D modeling and animation',
            'Game physics and mechanics',
        ],
        images: [
            'src/assets/images/project1.png',
        ],
        tags: ['Unity', 'Blender', 'C++'],
    },
    {
        id: 6,
        slug: 'student-management-system',
        title: 'Student Management System',
        description: 'A CRUD application for managing student information, developed as a college project.',
        overview: 'A simple CRUD application to manage student records, built as a college project.',
        technologies: ['Java'],
        features: [
            'Add, edit, delete student records',
            'Search and filter functionality',
        ],
        challenges: [
            'Designing a user-friendly interface',
            'Implementing efficient data storage',
        ],
        images: [
            'src/assets/images/project1.png',
        ],
        tags: ['Java'],
    },
    {
        id: 7,
        slug: 'defense-quest',
        title: 'Defense Quest',
        description: 'A 2D side-scrolling game created during college, featuring engaging gameplay and dynamic challenges.',
        overview: 'A 2D side-scrolling game with dynamic levels and engaging gameplay.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        features: [
            'Side-scrolling gameplay',
            'Multiple enemy types',
            'Score tracking',
        ],
        challenges: [
            'Game balancing',
            'Responsive controls',
        ],
        images: [
            'src/assets/images/project1.png',
        ],
        tags: ['HTML', 'CSS', 'JavaScript'],
    },
]; 