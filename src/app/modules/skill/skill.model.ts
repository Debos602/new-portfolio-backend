// skill.model.ts
import { Schema, model } from 'mongoose';
import { TSkill } from './skill.interface';

const skillSchema = new Schema<TSkill>(
  {
    category: {
      type: String,
      enum: ["language", "framework", "persistence", "devops"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },

    // Language + Persistence
    subtitle: {
      type: String,
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
    },

    // Persistence only
    level: {
      type: String,
      enum: ["BEGINNER", "MID-LEVEL", "PROFICIENT", "EXPERT"],
    },

    // Framework only
    dotCount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export const SkillModel = model<TSkill>('Skill', skillSchema);