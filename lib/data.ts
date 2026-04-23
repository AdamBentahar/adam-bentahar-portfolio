export const personalInfo = {
  name: "Adam Bentahar",
  role: "Industrial Engineering Student",
  tagline: "Business & Data Management",
  location: "Casablanca, Morocco",
  email: "bentaharadam2004@gmail.com",
  phone: "+212 689-760460",
  github: "https://github.com/adam-bentahar",
  linkedin: "https://linkedin.com/in/adam-bentahar",
  positioningStatement:
    "A data-driven Industrial Engineering student leveraging AI, automation, and business intelligence to optimize processes and drive smarter decision-making.",
  about: `I'm Adam Bentahar, an Industrial Engineering student at ESITH Casablanca, specializing in Business & Data Management. I'm passionate about using data, AI, and automation to cut through complexity and drive decisions that actually move businesses forward. From building interactive dashboards to automating data workflows, I apply Lean thinking and modern tools to real operational problems — because I believe the best solutions sit at the intersection of technical rigor and business intuition. I'm not waiting to graduate to make an impact — I'm actively building, experimenting, and seeking collaborations that challenge me. If you're looking for a driven, data-curious engineer who blends technical skill with business sense, let's connect.`,
};

export const stats = [
  { value: 4, label: "Languages", suffix: "" },
  { value: 10, label: "Certifications", suffix: "+" },
  { value: 4, label: "Projects Built", suffix: "" },
  { value: 1, label: "Internship", suffix: "" },
];

export const skills = {
  "Data & Tech": [
    { name: "Python", icon: "🐍" },
    { name: "Pandas", icon: "🐼" },
    { name: "Plotly", icon: "📊" },
    { name: "SQL", icon: "🗄️" },
    { name: "Excel", icon: "📋" },
    { name: "Power BI", icon: "⚡" },
    { name: "Data Cleaning", icon: "🧹" },
    { name: "Business Intelligence", icon: "🧠" },
  ],
  "Business & Operations": [
    { name: "Project Management", icon: "🗂️" },
    { name: "Lean Thinking", icon: "🔧" },
    { name: "Marketing", icon: "📢" },
    { name: "Teamwork", icon: "🤝" },
    { name: "Process Optimization", icon: "⚙️" },
    { name: "SAP", icon: "🏢" },
  ],
};

export const projects = [
  {
    id: 1,
    title: "Business Intelligence Dashboard",
    emoji: "📊",
    color: "#6366F1",
    problem:
      "Management lacked real-time visibility into KPIs, relying on weekly manual spreadsheets that caused slow, reactive decision-making.",
    solution:
      "Built a multi-page interactive BI dashboard with drill-down capability, trend analysis, and automated data refresh cycles.",
    tools: ["Power BI", "Excel", "DAX", "Data Modeling"],
    impact: "Reporting time cut from 3 days → 4 hours",
    impactMetric: "87%",
    impactLabel: "Faster Reporting",
  },
  {
    id: 2,
    title: "Automated Data Pipeline",
    emoji: "⚙️",
    color: "#10B981",
    problem:
      "Raw datasets required 5+ hours of manual cleaning per week, with frequent human errors causing inconsistencies in final reports.",
    solution:
      "Engineered a modular Python pipeline with automated validation, deduplication, type coercion, and structured export to clean CSVs.",
    tools: ["Python", "Pandas", "NumPy", "Automation"],
    impact: "Manual processing reduced by 85%",
    impactMetric: "85%",
    impactLabel: "Time Saved",
  },
  {
    id: 3,
    title: "Mini ERP for Small Business",
    emoji: "🏪",
    color: "#F59E0B",
    problem:
      "Small cafés and restaurants managing operations on paper had zero analytics, causing overstocking, waste, and invisible profit leaks.",
    solution:
      "Designed a desktop ERP system with sales tracking, inventory management, daily P&L, and low-stock alerts — optimized for non-technical users.",
    tools: ["Python", "SQLite", "Tkinter", "Pandas"],
    impact: "Real-time stock control + daily P&L",
    impactMetric: "100%",
    impactLabel: "Operational Visibility",
  },
  {
    id: 4,
    title: "AI Marketing Automation",
    emoji: "🤖",
    color: "#EC4899",
    problem:
      "Content creation was a bottleneck — manually writing social media posts consumed hours weekly with inconsistent brand voice and frequency.",
    solution:
      "Built an AI-powered content pipeline using GPT API to generate, schedule, and format 20+ brand-aligned posts per week automatically.",
    tools: ["Python", "OpenAI API", "Automation", "NLP"],
    impact: "3x content output, 70% less effort",
    impactMetric: "3×",
    impactLabel: "Content Output",
  },
];

export const experience = [
  {
    company: "Rakops Solutions",
    role: "Data Engineering Intern",
    period: "July 2025 · 1 month",
    location: "Casablanca, Morocco",
    type: "Internship",
    color: "#6366F1",
    highlights: [
      "Engineered and tested automated data processing scripts, reducing manual data handling time by ~60%",
      "Mapped end-to-end data pipelines to improve traceability and audit-readiness across reporting flows",
      "Delivered a structured analysis of how data infrastructure supports executive decision-making",
      "Contributed to a pipeline documentation brief adopted by the team",
    ],
  },
  {
    company: "ESSOR Junior Entreprise",
    role: "Consultant",
    period: "November 2024 – Present · 1 year",
    location: "ESITH, Casablanca",
    type: "Consulting",
    color: "#10B981",
    highlights: [
      "Delivered consulting engagements for external clients as part of a student-run junior enterprise",
      "Collaborated cross-functionally on project scoping, delivery, and client communication",
      "Applied project management frameworks to ensure on-time deliverable completion",
    ],
  },
];

export const certifications = [
  {
    category: "Data & Analytics",
    icon: "📊",
    color: "#6366F1",
    items: [
      "Python for Data Analysis (Pandas)",
      "Data Visualization with Plotly",
      "Preparing Data for Analysis with Excel",
      "Business Intelligence Fundamentals",
    ],
  },
  {
    category: "Business & Project",
    icon: "🗂️",
    color: "#10B981",
    items: [
      "Project Initiation: Starting a Successful Project",
      "SAP Professional Fundamentals",
      "From Likes to Leads: Customer Engagement",
    ],
  },
  {
    category: "AI & Digital Skills",
    icon: "🤖",
    color: "#EC4899",
    items: ["Understanding Prompt Engineering"],
  },
];

export const languages = [
  { name: "Arabic", level: "Native", percent: 100 },
  { name: "French", level: "Advanced", percent: 90 },
  { name: "English", level: "Advanced", percent: 88 },
  { name: "Spanish", level: "Basic", percent: 35 },
];
