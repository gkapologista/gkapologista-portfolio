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
    slug: 'communication-app',
    title: 'Unified Communication Hub',
    description: 'A personal project creating a unified communication platform that integrates Email (Gmail API), SMS, Internal Chat, and Voice Calling (WebRTC/Twilio) for seamless multi-channel communication.',
    overview: 'A comprehensive personal project that provides a unified dashboard for managing multiple communication channels including email via Gmail API, SMS through Twilio, real-time internal chat with Socket.io, and voice calling capabilities using WebRTC and Twilio Voice.',
    technologies: ['Vue.js 3', 'Node.js', 'PostgreSQL', 'Express.js', 'Socket.io', 'Gmail API', 'Twilio', 'WebRTC'],
    features: [
      'Unified email management with Gmail API integration',
      'SMS messaging via Twilio with inbox functionality',
      'Real-time internal chat with file attachments',
      'Voice calling with WebRTC and Twilio Voice',
      'Responsive dashboard for all communication channels',
      'OAuth2 authentication for Gmail integration',
    ],
    challenges: [
      'Integrating multiple third-party APIs (Gmail, Twilio)',
      'Implementing real-time communication with Socket.io',
      'Managing complex database relationships for multi-channel data',
      'Ensuring secure OAuth2 authentication flow',
      'Creating a unified UI for diverse communication types',
    ],
    images: [
      'src/assets/images/unifiedCommunicationApp1.png',
      'src/assets/images/unifiedCommunicationApp2.png',
      'src/assets/images/unifiedCommunicationApp3.png',
    ],
    tags: ['Vue.js 3', 'Node.js', 'PostgreSQL', 'Express.js', 'Socket.io', 'Gmail API', 'Twilio', 'WebRTC'],
  },
  {
    id: 2,
    slug: 'personaweb',
    title: 'PersonaWeb',
    description: 'An e-commerce website featuring a Decision Tree Algorithm for Personalized Recommendations, providing tailored shopping experiences for users.',
    overview: 'PersonaWeb is an advanced e-commerce platform that leverages a Decision Tree Algorithm implemented in Python to deliver personalized product recommendations. The project combines Node.js backend services with Python machine learning models and MySQL database to create a comprehensive recommendation system.',
    technologies: ['Node.js', 'Python', 'MySQL', 'Express.js', 'scikit-learn', 'pandas', 'numpy'],
    features: [
      'Decision Tree Algorithm for personalized recommendations',
      'Python ML model integration with Node.js backend',
      'User authentication and profiles',
      'Shopping cart and checkout system',
      'Admin dashboard for product management',
      'Real-time recommendation updates',
    ],
    challenges: [
      'Integrating Python ML models with Node.js backend',
      'Implementing scalable Decision Tree Algorithm',
      'Optimizing database queries for recommendation engine',
      'Ensuring secure user authentication',
      'Managing real-time data synchronization between Python and Node.js',
    ],
    images: [
      'src/assets/images/personaWeb1.JPG',
      'src/assets/images/personaWeb2.JPG',
      'src/assets/images/personaWeb3.JPG',
    ],
    tags: ['Node.js', 'Python', 'MySQL', 'Express.js', 'scikit-learn', 'Machine Learning', 'Decision Tree'],
  },
  {
    id: 3,
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
      'src/assets/images/certificationPlatform1.png',
      'src/assets/images/certificationPlatform2.png',
      'src/assets/images/certificationPlatform3.png',
    ],
    tags: ['Vue.js', 'Strapi', 'PostgreSQL'],
  },
  {
    id: 4,
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
      'src/assets/images/healthRecordManagementSystem1.png',
      'src/assets/images/healthRecordManagementSystem2.png',
      'src/assets/images/healthRecordManagementSystem3.png',
      'src/assets/images/healthRecordManagementSystem4.png',
    ],
    tags: ['HTML', 'CSS', 'Laravel'],
  },
  {
    id: 5,
    slug: 'sausage-royale',
    title: 'Sausage Royale',
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
      'src/assets/images/sausageRoyale1.png',
      'src/assets/images/sausageRoyale2.png',
      'src/assets/images/sausageRoyale3.png',
      'src/assets/images/sausageRoyale4.png',
    ],
    tags: ['Unity', 'Blender', 'C++'],
  },
  {
    id: 6,
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
      'src/assets/images/websitePortfolio1.png',
      'src/assets/images/websitePortfolio2.png',
    ],
    tags: ['Vue.js', 'Quasar'],
  },
  {
    id: 7,
    slug: 'defenders-quest',
    title: "Defender's Quest",
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
      'src/assets/images/defenseQuest1.JPG',
      'src/assets/images/defenseQuest2.JPG',
      'src/assets/images/defenseQuest3.JPG',
    ],
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 8,
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
      'src/assets/images/studentManagementSystem1.JPG',
      'src/assets/images/studentManagementSystem2.JPG',
    ],
    tags: ['Java'],
  },
];
