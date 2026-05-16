// experience.interface.ts

export type TResponsibility = {
  icon?: string;          // ⚡ 🗄️ ⚙️ — প্রতিটা bullet-এর icon
  details: string;        // "Lead developer for a high-traffic fintech..."
};

export type TExperience = {
  jobTitle: string;       // "Senior MERN Architect"
  company: string;        // "Nexus Core Solutions"
  startDate: Date;        // Jan 2023
  endDate?: Date;         // ✅ optional → "Present" হলে null/undefined
  isPresent: boolean;     // true হলে "Present" দেখাবে

  responsibilities: TResponsibility[];  // bullet point list

  technologies: string[]; // ["MongoDB", "Express", "React", "Node.js", "Docker"]

  order?: number;         // display order নিয়ন্ত্রণের জন্য
};