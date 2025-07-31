export interface Technology {
  name: string;
  color: string;
  highlighted: boolean;
  months: string[]; // Format: "YYYY-MM"
  icon: string; // Icon name from lucide-react
}

export interface Job {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  description: string[];
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export const jobs: Job[] = [
  {
    id: "avify",
    company: "Avify",
    position: "Backend Engineer",
    startDate: "2024-01",
    endDate: "2025-07",
    technologies: ["JavaScript", "TypeScript", "Bun", "Prisma", "React", "Tailwind", "Apollo", "Axios", "GraphQL", "REST", "AWS", "Docker", "PostgreSQL", "Datadog", "Grafana", "GitHub", "GitHub Actions"],
    description: [
      "Generated reports from platform DBs to help customers understand data and money flow",
      "Implemented sales campaign metrics tools",
      "Maintained infrastructure with AWS services and 3rd party platforms",
      "Developed payment and shipping integrations for Magento",
      "Performed bugfixing tasks to solve problems ASAP",
      "Brought support for customers with Authentication problems and missing data problems",
      "Monitored service with observability tools (Datadog, Grafana and AWS CloudWatch)",
      "Integrated CRM tools like Bitrix, HubSpot, and Active Campaign",
      "Created internal tools for developers to automate repetitive support tasks",
      "Developed backend REST and GraphQL endpoints for AI service improvements",
      "Developed backend OAuth flows",
      "Developed Cronjob tasks to program routines",
      "Performed releases and hotfixes to solve problems ASAP"
    ]
  },
  {
    id: "valtre",
    company: "Valtre",
    position: "FullStack JS Developer",
    startDate: "2021-09",
    endDate: "2024-01",
    technologies: ["JavaScript", "TypeScript", "React", "Flutter", "NodeJS", "REST", "NextJS", "NestJS", "Tailwind", "RabbitMQ", "PostgreSQL", "Azure"],
    description: [
      "Encouraged frontend best practices for mobile and web with ReactJS",
      "Implemented design system for mobile apps and web applications",
      "Developed Microservices for delivery production line with NodeJS and RabbitMQ",
      "Worked with multidisciplinary team to build Backoffice frontend and backend",
      "Developed several frontend internal tools for Orders Support Management",
      "Proposed and implemented existing monitoring tools (Bugsnag)"
    ]
  },
  {
    id: "jaxitank",
    company: "JaxiTank",
    position: "Team Lead FullStack JS Developer",
    startDate: "2019-09",
    endDate: "2021-09",
    technologies: ["JavaScript", "React", "NodeJS", "GraphQL", "REST", "AWS", "PostgreSQL", "Docker", "Digital Ocean", "Bugsnag", "Jest", "React Native", "Expo", "Prisma", "TypeORM", "Ant Design", "SASS", "Astro",  "Figma", "GiHub", "GitHub Actions", "Apollo"],
    description: [
      "Led React/NodeJS teams following good practices and DDD principles",
      "Encouraged SOLID and Hexagonal Architecture for long-term maintenance",
      "Researched and implemented 3rd party services like AWS Rekognition, Algolia Search",
      "Worked with product owner, designer, and stakeholders to design core features",
      "Experimented with new technologies to promote innovative ideas",
      "Developed friendly UIs for final users in an Entrepreneurship Platform",
      "Unified programming patterns to solve common tasks by creating reusable components",
      "Elaborated Proof of Concept projects to validate ideas and new tools",
      "Decoupled problematic dependencies on third party solutions",
      "Encouraged design strategies for GraphQL and Rest APIs"
    ]
  },
  {
    id: "baltico",
    company: "Grupo Báltico",
    position: "Tech Leader",
    startDate: "2017-01",
    endDate: "2019-09",
    technologies: ["JavaScript", "React", "React Native", "NodeJS", "WebSockets", "NFC", "PostgreSQL", "MySQL", "Java", "PHP", "JQuery", "GitLab", "REST"],
    description: [
      "Led and developed delivery tracking system with sockets support",
      "Built backend, frontend BackOffice and Hybrid Mobile App",
      "Developed RFID/NFC module for customer virtual credits",
      "Integrated customer virtual credits to existing Business Model"
    ]
  }
];

export const technologies: Technology[] = [
  { name: "JavaScript", color: "#F7DF1E", highlighted: true, months: [], icon: "FileCode" },
  { name: "TypeScript", color: "#3178C6", highlighted: true, months: [], icon: "FileType" },
  { name: "React", color: "#61DAFB", highlighted: true, months: [], icon: "Atom" },
  { name: "NodeJS", color: "#339933", highlighted: true, months: [], icon: "Server" },
  { name: "NextJS", color: "#000000", highlighted: true, months: [], icon: "Triangle" },
  { name: "React Native", color: "#61DAFB", highlighted: true, months: [], icon: "Smartphone" },
  { name: "Tailwind", color: "#06B6D4", highlighted: true, months: [], icon: "Wind" },
  { name: "PostgreSQL", color: "#336791", highlighted: true, months: [], icon: "Database" },
  { name: "GraphQL", color: "#E10098", highlighted: true, months: [], icon: "Share2" },
  { name: "REST", color: "#FF6B35", highlighted: true, months: [], icon: "Globe" },
  { name: "AWS", color: "#FF9900", highlighted: true, months: [], icon: "Cloud" },
  { name: "Docker", color: "#2496ED", highlighted: true, months: [], icon: "Container" },
  { name: "Prisma", color: "#2D3748", highlighted: false, months: [], icon: "Layers" },
  { name: "Bun", color: "#FBF0DF", highlighted: false, months: [], icon: "Zap" },
  { name: "Apollo", color: "#311C87", highlighted: false, months: [], icon: "Rocket" },
  { name: "Axios", color: "#5A29E4", highlighted: false, months: [], icon: "ArrowRightLeft" },
  { name: "RabbitMQ", color: "#FF6600", highlighted: false, months: [], icon: "MessageSquare" },
  { name: "Figma", color: "#F24E1E", highlighted: false, months: [], icon: "Figma" },
  { name: "Bugsnag", color: "#4949E7", highlighted: false, months: [], icon: "Bug" },
  { name: "WebSockets", color: "#010101", highlighted: false, months: [], icon: "Wifi" },
  { name: "NFC", color: "#002868", highlighted: false, months: [], icon: "Radio" },
  { name: "Datadog", color: "#632CA6", highlighted: false, months: [], icon: "BarChart3" },
  { name: "Grafana", color: "#F46800", highlighted: false, months: [], icon: "LineChart" },
  { name: "MySQL", color: "#4479A1", highlighted: false, months: [], icon: "Database" },
  { name: "Java", color: "#007396", highlighted: false, months: [], icon: "Code" },
  { name: "PHP", color: "#777BB4", highlighted: false, months: [], icon: "Code" },
  { name: "JQuery", color: "#0769AD", highlighted: false, months: [], icon: "Code" },
  { name: "Digital Ocean", color: "#0080FF", highlighted: false, months: [], icon: "Cloud" },
  { name: "Jest", color: "#C21325", highlighted: false, months: [], icon: "Test" },
  { name: "React Native", color: "#61DAFB", highlighted: false, months: [], icon: "Smartphone" },
  { name: "Expo", color: "#000020", highlighted: false, months: [], icon: "Code" },
  { name: "Prisma", color: "#2D3748", highlighted: false, months: [], icon: "Layers" },
  { name: "TypeORM", color: "#2D3748", highlighted: false, months: [], icon: "Layers" },
  { name: "Ant Design", color: "#000000", highlighted: false, months: [], icon: "Code" },
  { name: "SASS", color: "#CC6699", highlighted: false, months: [], icon: "Code" },
  { name: "Astro", color: "#000000", highlighted: false, months: [], icon: "Code" },
  { name: "GiHub", color: "#000000", highlighted: false, months: [], icon: "Code" },
  { name: "GitHub Actions", color: "#000000", highlighted: false, months: [], icon: "Code" },
  { name: "NestJS", color: "#000000", highlighted: false, months: [], icon: "Code" },
  { name: "Flutter", color: "#000000", highlighted: false, months: [], icon: "Code" },
  { name: "NestJS", color: "#000000", highlighted: false, months: [], icon: "Code" },
  { name: "Azure", color: "#0078D4", highlighted: false, months: [], icon: "Code" },
  { name: "GitLab", color: "#000000", highlighted: false, months: [], icon: "Code" },
  { name: "Apollo", color: "#311C87", highlighted: false, months: [], icon: "Rocket" },
];

// Generate months for each technology based on job periods
const generateMonthsForTechnology = (techName: string): string[] => {
  const months: string[] = [];
  
  jobs.forEach(job => {
    if (job.technologies.includes(techName)) {
      const startDate = new Date(job.startDate + "-01");
      const endDate = job.endDate === "2025-07" ? new Date() : new Date(job.endDate + "-01");
      
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const monthStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
        if (!months.includes(monthStr)) {
          months.push(monthStr);
        }
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }
  });
  
  return months.sort();
};

// Populate months for each technology
technologies.forEach(tech => {
  tech.months = generateMonthsForTechnology(tech.name);
});

export const projects: Project[] = [
  {
    name: "Advanced ToDo Dashboard",
    description: "A comprehensive task management tool with integrated Pomodoro timer for enhanced productivity tracking.",
    technologies: ["React", "TypeScript", "Tailwind", "IndexedDB"],
    url: "https://mi-taskboard.vercel.app/"
  },
  {
    name: "Devu Community Website",
    description: "Official website for the local tech community, featuring event management and member networking.",
    url: "https://devu.community",
    technologies: ["Astro", "TypeScript", "Tailwind"]
  }
];

export const education: Education[] = [
  {
    institution: "Platzi",
    degree: "AWS Foundations Course",
    period: "October 2024"
  },
  {
    institution: "Apollo GraphQL",
    degree: "Graph Developer – Associate Certification",
    period: "July 2022"
  },
  {
    institution: "CodelyTV",
    degree: "Hexagonal Architecture Course",
    period: "April 2022"
  },
  {
    institution: "Instituto Tecnológico Superior de Zongolica",
    degree: "Computer Systems Engineering",
    period: "2015 – 2019"
  }
];

export const socialLinks = {
  devto: "https://dev.to/chema",
  twitter: "https://twitter.com/ChemaCLi",
  linkedin: "https://www.linkedin.com/in/chema-cl/",
  instagram: "https://instagram.com/chema.cli",
  github: "https://github.com/ChemaCLi"
};

// Generate timeline months from 2017 to 2025
export const generateTimelineMonths = (): string[] => {
  const months: string[] = [];
  const startYear = 2017;
  const currentYear = 2025;
  const currentMonth = 7; // July
  
  for (let year = startYear; year <= currentYear; year++) {
    const endMonth = year === currentYear ? currentMonth : 12;
    for (let month = 1; month <= endMonth; month++) {
      months.push(`${year}-${String(month).padStart(2, '0')}`);
    }
  }
  
  return months;
};