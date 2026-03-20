import type {
  PersonalInfo,
  Experience,
  Project,
  Skill,
  Certification,
  Education,
  SocialLink,
} from "@/types";

// ============================================================================
// PERSONAL INFORMATION
// ============================================================================

export const personalInfo: PersonalInfo = {
  name: "Oswaldo Rosales",
  title: "Software Engineer",
  headline: "Building scalable systems with Java Ecosystem, Javascript Frameworks, and cloud-native architecture",
  bio: "Self-taught and proactive software engineer with 9+ years of professional experience, including deep expertise in backend development and 5+ years in frontend technologies. Started my career at SICAR and progressed through IBM, UST, EPAM, to my current role at Avenue Code. Specialized in building microservices architectures, enterprise applications, and high-performance web platforms. Passionate about clean code, system design, and continuous learning.",
  location: "Guadalajara, Jalisco, Mexico",
  email: "contact@oswaldorosalesdev.com",
  avatar: "/images/profile.webp",
  resume: "/resume.pdf",
};

// ============================================================================
// SOCIAL LINKS
// ============================================================================

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/oswaldorosales",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/oswaldo-rosales/",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/OswaldoRosalesA",
    icon: "twitter",
  },
];

// ============================================================================
// WORK EXPERIENCE (STAR Format)
// ============================================================================

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Avenue Code",
    role: "Senior Software Engineer (Independent Contractor)",
    location: "Guadalajara, Mexico (Remote)",
    period: "Apr 2022 - Present",
    startDate: "2022-04-01",
    endDate: null,
    description:
      "Independent contractor leading development of enterprise-scale applications and microservices architectures for global clients.",
    achievements: [
      "Architected and implemented microservices-based solutions reducing system latency by 40%",
      "Led cross-functional team of 5 engineers in delivering mission-critical features on time",
      "Mentored junior developers on best practices for Spring Boot and React development",
      "Implemented CI/CD pipelines reducing deployment time from hours to minutes",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "AWS",
    ],
    impact: "Delivered high-quality solutions that improved system performance and team velocity",
  },
  {
    id: "exp-2",
    company: "EPAM Systems",
    role: "Senior Software Developer",
    location: "Guadalajara, Mexico (Remote)",
    period: "Nov 2021 - Sep 2022",
    startDate: "2021-11-01",
    endDate: "2022-09-01",
    description:
      "Developed and maintained enterprise applications for Fortune 500 clients in the financial sector.",
    achievements: [
      "Built RESTful APIs serving 100K+ daily requests with 99.9% uptime",
      "Optimized database queries reducing response time by 60%",
      "Implemented comprehensive unit and integration test coverage (90%+)",
      "Collaborated with distributed teams across 3 time zones",
    ],
    technologies: [
      "Java",
      "Spring Framework",
      "Angular",
      "Oracle DB",
      "Redis",
      "Jenkins",
      "Git",
    ],
    impact: "Enhanced application reliability and performance for banking clients",
  },
  {
    id: "exp-3",
    company: "UST",
    role: "Technical Lead",
    location: "Guadalajara, Mexico (Remote)",
    period: "Mar 2021 - Nov 2021",
    startDate: "2021-03-01",
    endDate: "2021-11-01",
    description:
      "Led technical initiatives and mentored teams in building scalable microservices solutions for enterprise clients.",
    achievements: [
      "Led architecture design and implementation of microservices-based systems",
      "Mentored QA team to implement automation testing using Selenium and Chromium",
      "Designed event-driven architectures using RabbitMQ for asynchronous communication",
      "Improved team code quality through technical leadership and code review practices",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Microservices",
      "RabbitMQ",
      "Selenium",
      "Docker",
      "REST APIs",
      "PostgreSQL",
    ],
    impact: "Elevated team capabilities and delivered robust microservices architecture for production systems",
  },
  {
    id: "exp-4",
    company: "IBM (Client Innovation Center)",
    role: "Full Stack Engineer & Team Co-Lead",
    location: "Guadalajara, Mexico",
    period: "Jun 2019 - Mar 2021",
    startDate: "2019-06-01",
    endDate: "2021-03-01",
    description:
      "Modernized core banking services for USAA (Deposits Area), resolving critical scalability bottlenecks through event-driven architecture.",
    achievements: [
      "Rescued a high-traffic banking flow by migrating from a legacy stack to an **event-driven architecture (Kafka/Spring Boot)**, eliminating system exceptions and improving throughput.",
      "Elevated to **Co-Lead of a 5-person team**, taking ownership of code reviews and sprint planning to ensure delivery of high-priority financial features.",
      "Engineered robust microservices deployed on **OpenShift**, collaborating with infrastructure teams to maintain high availability in a regulated banking environment.",
      "Streamlined development workflows by implementing automated **GitLab CI/CD** pipelines, reducing manual deployment errors.",
    ],
    technologies: [
      "Spring Boot",
      "Kafka",
      "React",
      "OpenShift",
      "GitLab CI/CD",
      "Java",
      "Microservices",
    ],
    impact:
      "Restored system stability for the Deposits division and successfully transitioned into a leadership role, managing technical debt and team velocity.",
  },
  {
    id: "exp-5",
    company: "SICAR Solutions",
    role: "Software Engineer",
    location: "Autlan de Navarro, Mexico",
    period: "Jan 2017 - Jun 2019",
    startDate: "2017-01-01",
    endDate: "2019-06-01",
    description: "Scaled a POS & ERP suite by transforming internal tools into commercial modules and migrating services to the cloud.",
    achievements: [
      "Optimized desktop performance using **Java OSGi**, implementing lazy-loading to reduce startup times and improve modularity.",
      "Led E2E development of **Gym Management** and **Online Invoicing (CFDI)** modules for thousands of retail customers.",
      "Migrated legacy logic to **Java EE/GCP** and established the company's first API testing standards using Postman.",
      "Promoted to FTE after designing an internal 'Time & Attendance' system that became a core product feature."
    ],
    technologies: ["Java", "Java EE", "OSGi", "GCP", "Wildfly", "Postman", "MySQL"],
    impact: "Transitioned the company toward cloud-ready services and a quality-first engineering culture."
  },
];

// ============================================================================
// FEATURED PROJECTS
// ============================================================================

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Social Microservices Platform",
    description:
      "Complete microservices architecture with gamification, multiplication service, and React UI",
    longDescription:
      "A comprehensive microservices learning project implementing Spring Boot best practices. Features include service discovery, API gateway, inter-service communication, and a React-based frontend. Based on 'Learn Microservices with Spring Boot' by Moises Macero.",
    technologies: ["Java", "Spring Boot", "React", "Docker", "RabbitMQ", "Eureka"],
    repository: "https://github.com/oswaldorosales/social-multiplication",
    featured: true,
    language: "Java",
  },
  {
    id: "proj-2",
    name: "Facebook API Java Integration",
    description: "Java library for consuming Facebook Graph API with clean architecture",
    longDescription:
      "Production-ready Java integration with Facebook Graph API, featuring OAuth authentication, rate limiting, and comprehensive error handling. Demonstrates enterprise integration patterns and API consumption best practices.",
    technologies: ["Java", "REST API", "OAuth 2.0", "Maven"],
    repository: "https://github.com/oswaldorosales/FacebookAPIJava",
    featured: true,
    language: "Java",
  },
  {
    id: "proj-3",
    name: "JBoss Enterprise Starter",
    description: "Production-ready template for Java web applications on Wildfly/JBoss",
    longDescription:
      "Enterprise application boilerplate configured with best practices for Wildfly server deployment. Includes security configurations, database connection pooling, and monitoring setup.",
    technologies: ["Java", "JBoss/Wildfly", "JPA", "JSF", "Maven"],
    repository: "https://github.com/oswaldorosales/JbossWebApp",
    featured: true,
    language: "Java",
  },
  {
    id: "proj-4",
    name: "oswaldorosalesdev.com",
    description: "Personal portfolio built with Next.js 15, TypeScript, and Docker",
    longDescription:
      "Production-grade portfolio website with multi-stage Docker builds, SEO optimization, and self-hosted on Hetzner VPS. Demonstrates modern web development practices and infrastructure expertise.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Docker", "Coolify"],
    repository: "https://github.com/oswaldorosales/oswaldorosalesdev.com",
    demo: "https://oswaldorosalesdev.com",
    featured: true,
    language: "TypeScript",
  },
];

// ============================================================================
// TECHNICAL SKILLS
// ============================================================================

export const skills: Skill[] = [
  // Languages
  { name: "Java", category: "Languages", level: "Expert" },
  { name: "TypeScript", category: "Languages", level: "Advanced" },
  { name: "JavaScript", category: "Languages", level: "Advanced" },
  { name: "SQL", category: "Languages", level: "Advanced" },

  // Frontend
  { name: "React", category: "Frontend", level: "Advanced" },
  { name: "Next.js", category: "Frontend", level: "Advanced" },
  { name: "Angular", category: "Frontend", level: "Advanced" },
  { name: "Redux", category: "Frontend", level: "Advanced" },
  { name: "Tailwind CSS", category: "Frontend", level: "Advanced" },

  // Backend
  { name: "Spring Boot", category: "Backend", level: "Expert" },
  { name: "Node.js", category: "Backend", level: "Advanced" },
  { name: "Microservices", category: "Backend", level: "Expert" },
  { name: "REST APIs", category: "Backend", level: "Expert" },
  { name: "GraphQL", category: "Backend", level: "Intermediate" },

  // Database
  { name: "PostgreSQL", category: "Database", level: "Advanced" },
  { name: "MySQL", category: "Database", level: "Advanced" },
  { name: "MongoDB", category: "Database", level: "Advanced" },
  { name: "Redis", category: "Database", level: "Intermediate" },
  { name: "Oracle DB", category: "Database", level: "Intermediate" },

  // Infrastructure
  { name: "Docker", category: "Infrastructure", level: "Advanced" },
  { name: "Kubernetes", category: "Infrastructure", level: "Intermediate" },
  { name: "AWS", category: "Infrastructure", level: "Intermediate" },
  { name: "IBM Cloud", category: "Infrastructure", level: "Intermediate" },
  { name: "CI/CD", category: "Infrastructure", level: "Advanced" },

  // Tools
  { name: "Git", category: "Tools", level: "Advanced" },
  { name: "Jenkins", category: "Tools", level: "Advanced" },
  { name: "Maven", category: "Tools", level: "Advanced" },
  { name: "Wildfly/JBoss", category: "Tools", level: "Advanced" },
  { name: "RabbitMQ", category: "Tools", level: "Intermediate" },
];

// ============================================================================
// CERTIFICATIONS
// ============================================================================

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "Architectural Thinking",
    issuer: "IBM",
    issueDate: "2020-11",
    url: "#",
  },
  {
    id: "cert-2",
    name: "IBM Automation Essentials",
    issuer: "IBM",
    issueDate: "2020-06",
    url: "#",
  },
  {
    id: "cert-3",
    name: "Banking Industry Jumpstart",
    issuer: "IBM",
    issueDate: "2019-12",
    url: "#",
  },
];

// ============================================================================
// EDUCATION
// ============================================================================

export const education: Education[] = [
  {
    id: "edu-1",
    institution: "Universidad de Guadalajara",
    degree: "Bachelor's Degree",
    field: "Engineering",
    location: "Guadalajara, Mexico",
    period: "2015 - 2019",
    startYear: 2015,
    endYear: 2019,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getSkillsByCategory = (category: Skill["category"]) => {
  return skills.filter((skill) => skill.category === category);
};

export const getFeaturedProjects = () => {
  return projects.filter((project) => project.featured);
};

export const getCurrentExperience = () => {
  return experiences.find((exp) => exp.endDate === null);
};

export const getTotalYearsOfExperience = () => {
  const firstJob = experiences[experiences.length - 1];
  const startYear = new Date(firstJob.startDate).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};
