// ============================================================
// Portfolio Data — Single Source of Truth
// All components consume data from this file.
// Update this file to change any personal/professional content.
// ============================================================

// --- Personal Information ---
export const personalInfo = {
  firstName: "Vikash",
  lastName: "Kumar Prasad",
  fullName: "Vikash Kumar Prasad",
  title: "Full-Stack Developer",
  status: "OPEN TO SOFTWARE ENGINEERING OPPORTUNITIES",
  tagline:
    "Building end-to-end web applications, AI-powered solutions, and scalable backend systems.",
  email: "vikashkumarprasad964@gmail.com",
  phone: "9647701789",
  github: "https://github.com/Vikash-kumar-prasad",
  linkedin: "https://www.linkedin.com/in/vikash-kumar-prasad-914aba2a6",
  initials: "VKP",
  location: "India",
};

// --- About Section ---
export const aboutContent = {
  label: "ABOUT ME",
  heading: "Building scalable systems & intelligent web applications.",
  paragraphs: [
    "I'm a B.Tech Computer Science student at Sikkim Manipal Institute of Technology, graduating in 2027. I build full-stack web applications from the ground up — from designing RESTful APIs and implementing secure authentication on the backend to creating responsive interfaces with React.",
    "My core stack is MERN (MongoDB, Express.js, React, Node.js), with hands-on experience integrating AI/LLM APIs, Docker, and cloud deployment workflows. I'm particularly interested in backend engineering, AI-powered applications, and building clean, scalable software.",
  ],
  profileCard: {
    title: "ENGINEERING PROFILE",
    degree: "Bachelor of Technology in Computer Science",
    institution: "Sikkim Manipal Institute of Technology, Sikkim",
    timeline: "July 2023 — 2027",
    primaryStack: "MERN",
    aiAndCloud: "Groq API   ·   Docker   ·   AWS",
  },
};

// --- Skills ---
export interface Skill {
  name: string;
  icon?: string; // react-icons identifier
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "C", icon: "SiC" },
      { name: "C++", icon: "SiCplusplus" },
      { name: "SQL", icon: "SiMysql" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React.js", icon: "SiReact" },
      { name: "HTML5", icon: "SiHtml5" },
      { name: "CSS3", icon: "SiCss3" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Express.js", icon: "SiExpress" },
      { name: "REST APIs", icon: "SiPostman" },
      { name: "JWT Auth", icon: "SiJsonwebtokens" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "MySQL", icon: "SiMysql" },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "Git", icon: "SiGit" },
      { name: "GitHub", icon: "SiGithub" },
      { name: "Linux", icon: "SiLinux" },
      { name: "Docker", icon: "SiDocker" },
      { name: "AWS", icon: "SiAmazonwebservices" },
    ],
  },
  {
    category: "Developer Tools",
    skills: [
      { name: "VS Code", icon: "SiVisualstudiocode" },
      { name: "Postman", icon: "SiPostman" },
      { name: "Vercel", icon: "SiVercel" },
      { name: "Render", icon: "SiRender" },
    ],
  },
  {
    category: "Core CS",
    skills: [
      { name: "DBMS" },
      { name: "Operating Systems" },
      { name: "Computer Networks" },
      { name: "OOP" },
      { name: "DSA" },
    ],
  },
];

// --- Projects ---
export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  features: string[];
  github?: string;
  liveDemo?: string;
  backend?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Document Extraction Engine",
    description:
      "An AI-powered document extraction platform combining OCR and the Groq LLM to convert unstructured invoices into structured JSON automatically.",
    tech: ["Node.js", "Express.js", "React.js", "OCR", "MongoDB", "Groq API"],
    features: [
      "AI-powered document extraction pipeline",
      "RESTful APIs for document upload, OCR processing, and validation",
      "End-to-end extraction pipeline with prompt engineering",
      "Schema validation and structured JSON output",
      "Robust backend error handling",
    ],
    github:
      "https://github.com/Vikash-kumar-prasad/document-extraction-engine",
    liveDemo: "https://document-extraction-engine.vercel.app",
  },
  {
    id: 2,
    title: "AI Quiz Builder",
    description:
      "An AI-powered quiz generation platform that dynamically creates multiple-choice quizzes from user-provided topics using the Groq LLM API.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Groq API",
      "Tailwind CSS",
    ],
    features: [
      "Dynamic AI-powered quiz generation",
      "Interactive quiz-taking interface",
      "Automatic answer evaluation and score calculation",
      "Result visualization",
      "Prompt engineering with structured response parsing",
      "Responsive UI",
    ],
    liveDemo: "https://ai-quiz-builder-six.vercel.app",
    backend: "https://ai-quiz-builder-8gpv.onrender.com",
  },
  {
    id: 3,
    title: "StockLedger — Inventory Management System",
    description:
      "A full-stack inventory management system built using React.js, Node.js, Express.js, and MySQL with JWT-based authentication.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MySQL",
      "Tailwind CSS",
      "JWT",
    ],
    features: [
      "Product and supplier management with CRUD operations",
      "Stock movements and transaction history tracking",
      "Responsive dashboard with inventory analytics",
      "Low-stock alerts and advanced search/filtering",
      "Image uploads and role-based access control",
      "JWT authentication",
    ],
    liveDemo: "https://stockledger-inventory-app.vercel.app/",
  },
];

// --- Education ---
export const education = {
  degree: "Bachelor of Technology in Computer Science",
  institution: "Sikkim Manipal Institute of Technology, Sikkim",
  duration: "July 2023 — 2027",
};

// --- Certifications ---
export interface Certification {
  title: string;
  issuer: string;
}

export const certifications: Certification[] = [
  { title: "Complete Web Development Course", issuer: "Udemy" },
  { title: "Introduction to Internet of Things", issuer: "NPTEL" },
  { title: "Embedded Systems", issuer: "NPTEL" },
];

// --- Leadership / Extracurricular ---
export const leadership = {
  role: "Event Management Lead",
  organization: "Encoders",
  organizationType: "Student-led Technical Club",
  description:
    "Led and coordinated technical and non-technical events, managing event planning, team coordination, participant engagement, and peer-learning sessions.",
};

// --- Navigation ---
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
];
