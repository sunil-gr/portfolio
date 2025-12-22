/**
 * Default values for models
 * These are used when creating default documents in the database
 */

export const DEFAULT_HERO = {
  greeting: 'Hi I am',
  name: 'Manoj V',
  designation: 'Full Stack Developer & UI/UX Designer',
  description: 'With a passion for crafting clean, intuitive, and high-performing digital experiences, I develop both web and mobile applications that merge design and functionality seamlessly. From concept to deployment, I focus on creating interactive solutions that captivate users and make a lasting impression.',
  linkedinUrl: 'https://www.linkedin.com/in/manojv03/',
  githubUrl: 'https://github.com/ManojGowda15',
  image: '',
  phone: '+91-7204540632',
  email: 'manojv13579@gmail.com',
  address: 'Bangalore, Karnataka, India',
};

export const DEFAULT_ABOUT = {
  description: 'Passionate Full Stack Developer and UI/UX Designer with a Creative Approach to Crafting Intuitive and Engaging User Experiences. I specialize in building modern web and mobile applications using cutting-edge technologies.',
  skills: [
    { name: 'React.js', progress: 90, color: 'bg-blue-600' },
    { name: 'Node.js', progress: 85, color: 'bg-green-600' },
    { name: 'MongoDB', progress: 80, color: 'bg-green-500' },
    { name: 'JavaScript', progress: 88, color: 'bg-yellow-500' },
    { name: 'UI/UX Design', progress: 85, color: 'bg-purple-600' },
    { name: 'Mobile Development', progress: 75, color: 'bg-indigo-600' },
  ],
  highlights: [
    { value: '5+', label: 'Years of Experience', detail: 'Building digital products' },
    { value: '50+', label: 'Projects Delivered', detail: 'Web & mobile solutions' },
    { value: '20+', label: 'Technologies', detail: 'Across the stack' },
    { value: '100%', label: 'Client Satisfaction', detail: 'Happy customers' },
  ],
  mission: 'Crafting meaningful products that balance stunning visuals with dependable performance. I believe in creating digital experiences that not only look great but also solve real problems and deliver measurable results.',
};

export const DEFAULT_SERVICES = {
  sectionTitle: 'My Design Services',
  sectionDescription: 'Crafting visually engaging interfaces that are both intuitive and user-centered, ensuring a seamless experience.',
  services: [
    {
      slug: 'app-design',
      title: 'App Design',
      icon: 'Smartphone',
      shortDescription: 'Designing mobile applications that are both beautiful and functional. I create app interfaces that users love to interact with on iOS and Android platforms.',
      fullDescription: `I design mobile applications that users love to interact with. Whether it's iOS, Android, or cross-platform apps, I create intuitive interfaces that make complex tasks feel simple and enjoyable.

My app design process focuses on creating seamless user flows, engaging micro-interactions, and pixel-perfect interfaces that align with platform guidelines while maintaining your unique brand identity. I ensure every screen is optimized for touch interactions and provides clear feedback to users.`,
      features: [
        'iOS & Android Design',
        'Native & Cross-Platform',
        'User Flow Optimization',
        'Micro-Interactions & Animations',
        'App Store Optimization',
        'Prototyping & Testing',
      ],
      process: [
        { step: '01', title: 'Research & Analysis', description: 'Studying user behavior, competitor apps, and market trends.' },
        { step: '02', title: 'User Flow Design', description: 'Mapping out user journeys and creating intuitive navigation structures.' },
        { step: '03', title: 'UI Design & Prototyping', description: 'Designing screens and creating interactive prototypes for testing.' },
        { step: '04', title: 'Usability Testing', description: 'Testing with real users to identify and fix usability issues.' },
        { step: '05', title: 'Handoff & Collaboration', description: 'Providing detailed design specs and assets for development.' },
      ],
      color: 'blue',
      order: 0,
    },
    {
      slug: 'web-design',
      title: 'Web Design',
      icon: 'Monitor',
      shortDescription: 'Creating responsive and modern websites that provide excellent user experiences across all devices. From concept to deployment, I handle every aspect of web design.',
      fullDescription: `I create stunning, responsive websites that work flawlessly across all devices and screen sizes. From landing pages to complex web applications, I design digital experiences that captivate users and drive conversions.

My web design approach combines modern aesthetics with performance optimization, ensuring your website not only looks great but also loads quickly and ranks well in search engines. I focus on creating intuitive navigation, compelling visuals, and seamless interactions that keep visitors engaged.`,
      features: [
        'Responsive & Mobile-First Design',
        'Modern UI/UX Principles',
        'Performance Optimization',
        'SEO-Friendly Structure',
        'Cross-Browser Compatibility',
        'Content Management Integration',
      ],
      process: [
        { step: '01', title: 'Planning & Strategy', description: 'Defining project scope, goals, and technical requirements.' },
        { step: '02', title: 'Design & Mockups', description: 'Creating visual designs and interactive prototypes for approval.' },
        { step: '03', title: 'Development Preparation', description: 'Preparing design assets and specifications for development.' },
        { step: '04', title: 'Quality Assurance', description: 'Testing across devices and browsers to ensure perfect functionality.' },
        { step: '05', title: 'Launch & Support', description: 'Deploying the website and providing ongoing maintenance support.' },
      ],
      color: 'blue',
      order: 1,
    },
  ],
};

export const DEFAULT_EDUCATION = {
  sectionTitle: 'Education',
  sectionDescription: 'All my life I have been driven by my strong belief that education is important. I try to learn something new every single day.',
  educationItems: [
    {
      degree: 'Bachelor of Engineering (B.E.)',
      collegeName: 'Visvesvaraya Technological University',
      institution: 'Computer Science & Engineering',
      year: '2018 - 2022',
      percentage: '8.5 CGPA',
      description: 'Specialized in software development, database management, and computer networks. Completed various projects in web and mobile development.',
      order: 0,
    },
    {
      degree: 'Higher Secondary Education',
      collegeName: 'State Board',
      institution: 'Science Stream',
      year: '2016 - 2018',
      percentage: '85%',
      description: 'Completed with focus on Mathematics, Physics, and Chemistry.',
      order: 1,
    },
  ],
};

export const DEFAULT_PROJECTS = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration. Built with React, Node.js, and MongoDB.',
    category: 'Website Design',
    image: 'https://via.placeholder.com/800x600?text=E-Commerce+Platform',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
    liveUrl: 'https://example.com/ecommerce',
    githubUrl: 'https://github.com/example/ecommerce',
    featured: true,
  },
  {
    title: 'Task Management App',
    description: 'A modern task management application with real-time collaboration features. Users can create projects, assign tasks, set deadlines, and track progress.',
    category: 'App Design',
    image: 'https://via.placeholder.com/800x600?text=Task+Management+App',
    technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
    liveUrl: 'https://example.com/taskapp',
    githubUrl: 'https://github.com/example/taskapp',
    featured: true,
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive portfolio website showcasing projects, skills, and experience. Features smooth animations, modern design, and optimized performance.',
    category: 'Website Design',
    image: 'https://via.placeholder.com/800x600?text=Portfolio+Website',
    technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    liveUrl: 'https://example.com/portfolio',
    githubUrl: 'https://github.com/example/portfolio',
    featured: false,
  },
  {
    title: 'Social Media Dashboard',
    description: 'A comprehensive dashboard for managing social media accounts, scheduling posts, and analyzing engagement metrics across multiple platforms.',
    category: 'Website Design',
    image: 'https://via.placeholder.com/800x600?text=Social+Media+Dashboard',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Chart.js'],
    liveUrl: 'https://example.com/social-dashboard',
    githubUrl: 'https://github.com/example/social-dashboard',
    featured: false,
  },
  {
    title: 'Fitness Tracking App',
    description: 'A mobile application for tracking workouts, monitoring progress, and setting fitness goals. Includes features for exercise logging and progress visualization.',
    category: 'App Design',
    image: 'https://via.placeholder.com/800x600?text=Fitness+Tracking+App',
    technologies: ['Flutter', 'Firebase', 'Health API', 'Dart'],
    liveUrl: 'https://example.com/fitness-app',
    githubUrl: 'https://github.com/example/fitness-app',
    featured: true,
  },
  {
    title: 'Restaurant Booking System',
    description: 'An online reservation system for restaurants allowing customers to book tables, view menus, and make orders. Includes admin panel for restaurant management.',
    category: 'Website Design',
    image: 'https://via.placeholder.com/800x600?text=Restaurant+Booking+System',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://example.com/restaurant',
    githubUrl: 'https://github.com/example/restaurant',
    featured: false,
  },
];

