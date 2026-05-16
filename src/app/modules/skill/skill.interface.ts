// skill.interface.ts
export type TSkillLevel = "BEGINNER" | "MID-LEVEL" | "PROFICIENT" | "EXPERT";
export type TSkillCategory = "language" | "framework" | "persistence" | "devops";

export type TSkill = {
  category: TSkillCategory;
  name: string;
  icon?: string;

  // Language & Persistence
  subtitle?: string;
  proficiency?: number;       // 0–100

  // Persistence only
  level?: TSkillLevel;

  // Framework only
  dotCount?: number;
};