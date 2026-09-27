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
  heading: "Building scalable backend architectures & applied AI systems.",
  paragraphs: [
    "I'm a B.Tech Computer Science student at Sikkim Manipal Institute of Technology (graduating in 2027) focused on building scalable web applications and applied AI systems. My experience ranges from architecting RESTful APIs and secure microservices on the backend to developing computer vision pipelines and integrating LLMs.",
    "My core stack encompasses Python, Node.js, Express.js, Flask, and the MERN stack, backed by hands-on engineering with custom computer vision models (YOLOv8, OpenCV), Groq LLM API, Docker, and AWS cloud workflows. I focus on backend engineering, cybersecurity fundamentals, and shipping clean, production-ready code.",
  ],
  profileCard: {
    title: "ENGINEERING PROFILE",
    degree: "Bachelor of Technology in Computer Science",
    institution: "Sikkim Manipal Institute of Technology, Sikkim",
    timeline: "July 2023 — 2027",
    primaryStack: "Python   ·   MERN   ·   Flask",
    aiAndCloud: "YOLOv8   ·   Docker   ·   AWS",
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
      { name: "Python", icon: "SiPython" },
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
      { name: "Flask", icon: "SiFlask" },
      { name: "REST APIs", icon: "SiPostman" },
      { name: "JWT Auth", icon: "SiJsonwebtokens" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", icon: "SiMysql" },
      { name: "MongoDB", icon: "SiMongodb" },
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
      { name: "Data Structures & Algorithms" },
      { name: "DBMS" },
      { name: "Operating Systems" },
      { name: "Computer Networks" },
      { name: "OOP" },
      { name: "Cybersecurity" },
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
      "An automated document parsing pipeline combining OCR and the Groq LLM API to convert unstructured PDF invoices into validated JSON in under 2 seconds.",
    tech: ["Node.js", "Express.js", "React.js", "OCR", "MongoDB", "Groq API"],
    features: [
      "Automated document parsing pipeline extracting structured JSON from unstructured PDF invoices in <2s",
      "Modular Express.js & MongoDB RESTful APIs managing multi-file uploads and asynchronous OCR text extraction",
      "Robust JSON schema validation and prompt pipelines, reducing malformed LLM responses to <1%",
      "Fail-safe backend error handling with prompt engineering for deterministic schema output",
      "Modern responsive interface with document preview, extraction review, and verified data exports",
    ],
    github:
      "https://github.com/Vikash-kumar-prasad/document-extraction-engine",
    liveDemo: "https://document-extraction-engine.vercel.app",
  },
  {
    id: 2,
    title: "AI Quiz Builder",
    description:
      "An interactive AI-driven assessment platform that dynamically generates topic-specific quizzes with custom difficulty scaling using the Groq LLM API.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Groq API",
      "Tailwind CSS",
    ],
    features: [
      "Interactive AI-driven assessment platform using Groq LLM for dynamic quizzes with custom difficulty scaling",
      "Structured prompt schemas enforcing strict JSON output for deterministic, parsing-error-free generation",
      "Responsive React.js SPA with client-side state for timed quiz-taking, instant answer evaluation, and scoring",
      "Visual performance analytics and score computation with category-level mastery breakdowns",
      "Robust error handling and validation preventing hallucinated or incomplete quiz schemas",
    ],
    liveDemo: "https://ai-quiz-builder-six.vercel.app",
    backend: "https://ai-quiz-builder-8gpv.onrender.com",
  },
  {
    id: 3,
    title: "AI-Based Smart Crowd Safety and Threat Detection System",
    description:
      "An edge AI surveillance platform combining dual custom-trained YOLOv8 models and Farneback optical flow for crowd density estimation, lethal weapon detection, and automated hazard alerts.",
    tech: ["Python", "YOLOv8", "OpenCV", "Flask", "Computer Vision"],
    features: [
      "Dual custom-trained YOLOv8 models achieving 92.89% mAP@50 (head counting) and 87.46% precision (weapons)",
      "Real-time 4x6 grid crowd density mapping with Gaussian heatmaps and Farneback optical flow in <40 ms",
      "Velocity surge and panic anomaly detection to identify stampedes and rapid dispersals automatically",
      "Multi-threaded Flask backend sustaining 28+ FPS live MJPEG streaming with Police CAD Emergency Dispatch",
      "Real-time command center dashboard with live threat monitoring and CSV audit log exports",
    ],
    github: "https://github.com/Vikash-kumar-prasad/crowd-safety-system",
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
  { title: "Ethical Hacking Essentials (EHE)", issuer: "EC-Council (Coursera)" },
  { title: "Complete Web Development Course", issuer: "Udemy" },
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
