import type { CareerHealthCheck } from "../types/careerHealth";

export const careerHealthChecks: CareerHealthCheck[] = [
  {
    id: "resume-keywords",
    title: "Optimize resume keywords",
    completed: true,
    points: 25,
  },
  {
    id: "portfolio-projects",
    title: "Publish portfolio projects",
    completed: true,
    points: 20,
  },
  {
    id: "linkedin-profile",
    title: "Update LinkedIn profile",
    completed: false,
    points: 20,
  },
  {
    id: "networking",
    title: "Reach out to recruiters",
    completed: false,
    points: 15,
  },
  {
    id: "skills-certifications",
    title: "Add recent certifications",
    completed: true,
    points: 20,
  },
];
