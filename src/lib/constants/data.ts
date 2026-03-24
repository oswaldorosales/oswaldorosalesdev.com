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
  headline: "Software Engineer building scalable, reliable systems and modernizing legacy platforms through microservices and event-driven architecture",
  bio: "Software Engineer with 9+ years of experience building systems that solve real-world problems. I’ve worked on platforms across different industries, focusing on scalability, reliability, and clean architecture. Over time, I’ve grown from writing code to taking ownership of systems, helping teams improve how they build, and mentoring others along the way. I enjoy working on backend systems, designing solutions, and continuously learning new ways to build better software. Always learning, improving, and looking to build meaningful products.",
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
    role: "Software Engineer (Independent Contractor)",
    location: "Guadalajara, Mexico (Remote)",
    period: "Apr 2022 - Present",
    startDate: "2022-04-01",
    endDate: null,
    description:
      "Software engineer contributing to large-scale SEO and AEO platforms, building and evolving systems responsible for dynamic sitemap generation, indexing workflows, and metadata management across high-traffic web properties.",
    achievements: [
      "Designed and implemented **event-driven indexing workflows**, migrating from batch processing to near real-time systems to improve responsiveness and scalability.",
      "Led the **migration of critical databases** containing SEO rules and URL generation logic, ensuring data integrity and system continuity across multiple services.",
      "Modernized backend systems by migrating from **Spring Framework to Spring Boot** and upgrading from **Java 8 to Java 17+**, improving maintainability and performance.",
      "Contributed to the development of internal platforms responsible for generating **sitemaps, robots.txt, canonical URLs, and metadata rules** at scale.",
      "Collaborated on integrations with external indexing services (e.g., search engine APIs), enabling automated and efficient content discovery.",
      "Acted as a senior technical contributor across **20+ repositories**, ensuring consistency, code quality, and alignment with engineering standards.",
      "Participated in architecture design through technical proposals, one-pagers, and design documents, aligning solutions with enterprise standards.",
      "Mentored interns and junior engineers, supporting their onboarding and growth within a complex distributed system.",
      "Improved system reliability by leveraging a strong testing mindset, identifying cross-service impacts and reducing production issues."
    ],
    technologies: [
      "Java 17+",
      "Spring Boot",
      "REST APIs",
      "React",
      "Containers",
      "CI/CD",
      "Jenkins",
      "Private Cloud"
    ],
    impact:
      "Improved scalability, reliability, and responsiveness of SEO-critical systems by enabling real-time indexing, modernizing legacy services, and strengthening engineering standards across a distributed platform.",
    learnings: [
      "Deepened expertise in large-scale distributed systems and high-traffic platforms.",
      "Strengthened architectural thinking through participation in design proposals and system-wide decisions.",
      "Improved ability to manage complexity across multiple services and repositories.",
      "Developed strong ownership and autonomy in an enterprise environment.",
      "Enhanced mentoring skills by supporting the growth of interns and junior engineers."
    ]
  },
  {
    id: "exp-2",
    company: "EPAM Systems",
    role: "Technical Lead",
    location: "Guadalajara, Mexico (Remote)",
    period: "Nov 2021 - Sep 2022",
    startDate: "2021-11-01",
    endDate: "2022-09-01",
    description:
      "Led the modernization of a car rental listing platform within a large-scale travel ecosystem, improving system quality and enabling faster feature delivery through migration from legacy systems to a microservices-based architecture.",
    achievements: [
      "Led a **5-engineer team** while remaining highly hands-on, contributing directly to backend and frontend development.",
      "Migrated a critical legacy flow from **Spring Framework (monolith)** to **Spring Boot + Kotlin microservices**, improving code maintainability and system scalability.",
      "Developed and integrated services using **gRPC and GraphQL**, enabling efficient communication across distributed systems.",
      "Collaborated closely with cross-functional teams (e.g., checkout) to align dependencies, reduce integration risks, and ensure smooth feature delivery.",
      "Worked directly with client stakeholders, gaining deep understanding of the business domain and translating requirements into technical solutions.",
      "Mentored engineers in modern backend practices and helped the team ramp up on Kotlin and microservices architecture.",
      "Contributed to a high-quality engineering culture with strong testing practices already in place."
    ],
    technologies: [
      "Spring Boot",
      "Microservices",
      "Kotlin",
      "gRPC",
      "GraphQL",
      "React",
      "AWS",
      "JUnit",
      "Karate"
    ],
    impact:
      "Improved system quality and team delivery speed by successfully migrating legacy functionality to a modern microservices architecture, while strengthening cross-team collaboration and domain understanding.",
    learnings: [
      "Deepened understanding of large-scale distributed systems and microservices architecture.",
      "Gained hands-on experience with Kotlin in production environments.",
      "Improved ability to navigate and modernize complex legacy systems.",
      "Strengthened collaboration across teams to manage dependencies and reduce delivery risks.",
      "Developed stronger business acumen by working closely with product stakeholders."
    ]
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
      "Led the development of a healthcare system focused on detecting Fraud, Waste & Abuse (FWA) in US insurance operations, used by hospitals and pharmacies to identify suspicious claims and reduce financial risk.",
    achievements: [
      "Led a **5-engineer team** as Technical Lead, driving architecture decisions, sprint execution, and direct collaboration with US-based stakeholders.",
      "Designed and implemented an **event-driven architecture using RabbitMQ**, defining message contracts, validation rules, and integration patterns for asynchronous communication.",
      "Established engineering standards for event-driven development, improving consistency and scalability across services.",
      "Transformed QA practices by leading the transition from **manual spreadsheet-based testing** to **automated testing with Selenium**, building the initial framework and test cases adopted by the QA team.",
      "Mentored both QA and backend engineers, elevating team capabilities in testing, clean code, and best practices.",
      "Conducted formal code reviews using **Bitbucket**, improving code quality and maintainability across the codebase.",
      "Collaborated daily with client stakeholders, translating complex healthcare requirements into scalable technical solutions."
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Microservices",
      "RabbitMQ",
      "Selenium",
      "JUnit",
      "REST APIs",
      "Bitbucket"
    ],
    impact:
      "Enabled scalable and reliable fraud detection workflows through event-driven design, while significantly improving team quality standards and accelerating testing capabilities through automation.",
    learnings: [
      "Strengthened leadership skills by driving technical direction and mentoring engineers across multiple roles.",
      "Gained hands-on experience designing event-driven systems for real-world healthcare use cases.",
      "Developed the ability to define and enforce engineering standards in a distributed team environment.",
      "Learned how to transform team processes, moving from manual workflows to scalable automation solutions.",
      "Enhanced communication skills by working directly with international stakeholders in a regulated domain."
    ]
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
      "Contributed to the modernization of core banking features, including a savings automation system and loan application flows, improving system reliability and scalability under growing customer demand.",
    achievements: [
      "Stabilized a high-traffic **savings automation flow** by implementing an **event-driven architecture (Kafka + Spring Boot)**, eliminating recurring production errors and improving system performance under increased load.",
      "Supported the migration of a **loan application UI**, working across backend and frontend layers to ensure consistent state management and user experience.",
      "Acted as **Co-Lead of a 5-person team**, driving sprint planning, dependency management, and backlog refinement under **SAFe (PI Planning)**.",
      "Collaborated directly with business (client) stakeholders on a daily basis, translating business requirements into actionable technical tasks and ensuring alignment across teams.",
      "Mentored junior engineers, accelerating their onboarding and promoting best practices such as clean code, Git workflows, and collaborative development.",
      "Developed and maintained microservices deployed on **OpenShift**, ensuring reliability in a production banking environment.",
      "Implemented and maintained **GitLab CI/CD pipelines**, improving deployment consistency and reducing manual intervention.",
      "Monitored system behavior using **Splunk and Grafana**, supporting production stability and faster issue detection."
    ],
    technologies: [
      "Spring Boot",
      "Microservices",
      "Kafka",
      "React",
      "Redux",
      "OpenShift",
      "GitLab",
      "GitLab CI/CD",
      "Splunk",
      "Grafana",
      "JUnit",
      "Cucumber"
    ],
    impact:
      "Restored stability of a critical savings flow used by US customers, enabling continued feature adoption while improving team delivery through leadership, mentoring, and structured Agile practices.",
    learnings: [
      "Strengthened expertise in microservices, event-driven systems, and container orchestration.",
      "Gained experience working in a global, enterprise-level organization with distributed teams.",
      "Developed leadership skills through mentoring and coordination of team efforts under SAFe.",
      "Improved ability to translate complex business requirements into scalable technical solutions.",
      "Learned to operate effectively in production environments with real user impact."
    ]
  },
  {
    id: "exp-5",
    company: "SICAR Solutions",
    role: "Software Developer",
    location: "Autlan de Navarro, Mexico",
    period: "Jan 2017 - Jun 2019",
    startDate: "2017-01-01",
    endDate: "2019-06-01",
    description: "Contributed to a nationwide POS platform used by small and medium-sized businesses (retail stores, pharmacies, gyms, and hardware shops), helping them manage inventory, sales, and daily operations through a desktop-based solution.",
    achievements: [
      "Collaborated closely with business stakeholders to define and deliver product features aligned with real operational needs.",
      "Designed and implemented a **Time & Attendance system**, integrating hardware components to automate employee access control.",
      "Led the development of a **Gym Management module**, expanding the product into a new business vertical.",
      "Maintained and improved legacy functionality, ensuring system stability for a large customer base across Mexico.",
      "Introduced **Docker** for the first time in the company, containerizing the self-invoicing web module and improving deployment consistency.",
      "Proposed and helped introduce **Scrum practices**, improving team organization, planning, and delivery visibility.",
      "Built a custom **Jira-based dashboard** using its API to track in-progress, completed, and pending work, increasing transparency for both technical and business stakeholders.",
      "Mentored the QA team in adopting automated testing practices, promoting a culture of quality and reliability."
    ],
    technologies: ["Java 8", "JAX-RS", "Git", "Docker", "MySQL"],
    impact: "Expanded the platform’s capabilities into new business domains while improving engineering processes, delivery visibility, and team collaboration through the introduction of Agile practices and internal tooling.",
    learnings: [
      "Built strong foundations in backend development and collaborative workflows using Git.",
      "Developed communication skills by working directly with business stakeholders and cross-functional teams.",
      "Gained experience working in a startup-like environment, taking ownership of both technical and process improvements.",
      "Learned to combine software development with hardware integration in real-world business scenarios.",
      "Understood the importance of Agile methodologies and metrics to drive team efficiency and alignment."
    ]
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
  { name: "Kotlin", category: "Languages", level: "Intermediate" },
  { name: "Python", category: "Languages", level: "Intermediate" },
  { name: "SQL", category: "Languages", level: "Advanced" },
  { name: "JavaScript", category: "Languages", level: "Intermediate" },

  // Frontend
  { name: "React", category: "Frontend", level: "Intermediate" },
  { name: "Redux", category: "Frontend", level: "Intermediate" },
  { name: "Next.js", category: "Frontend", level: "Intermediate" },
  { name: "Bootstrap", category: "Frontend", level: "Intermediate" },

  // Backend
  { name: "Spring Boot", category: "Backend", level: "Expert" },
  { name: "Microservices", category: "Backend", level: "Expert" },
  { name: "REST APIs", category: "Backend", level: "Expert" },
  { name: "gRPC", category: "Backend", level: "Intermediate" },
  { name: "GraphQL", category: "Backend", level: "Intermediate" },

  // Database
  { name: "MySQL", category: "Database", level: "Advanced" },
  { name: "MongoDB", category: "Database", level: "Intermediate" },
  { name: "Redis", category: "Database", level: "Intermediate" },
  { name: "Oracle DB", category: "Database", level: "Intermediate" },

  // Infrastructure
  { name: "CI/CD", category: "Infrastructure", level: "Advanced" },
  { name: "Docker", category: "Infrastructure", level: "Intermediate" },
  { name: "Kubernetes", category: "Infrastructure", level: "Intermediate" },
  { name: "AWS", category: "Infrastructure", level: "Intermediate" },
  { name: "OpenShift", category: "Infrastructure", level: "Intermediate" },

  // Tools
  { name: "Git", category: "Tools", level: "Advanced" },
  { name: "Jenkins", category: "Tools", level: "Advanced" },
  { name: "Maven", category: "Tools", level: "Advanced" },
  { name: "Gradle", category: "Tools", level: "Advanced" },
  { name: "GitLab CI/CD", category: "Tools", level: "Intermediate" },
  { name: "RabbitMQ", category: "Tools", level: "Intermediate" },
  { name: "Kafka", category: "Tools", level: "Intermediate" },
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
    field: "Software Engineering",
    location: "Autlan de Navarro, Mexico",
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
