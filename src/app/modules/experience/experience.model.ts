import { model, Schema } from "mongoose";
import { TExperience } from "./experience.interface";

const ResponsibilitySchema = new Schema(
  {
    category: {
      type: String,
      enum: ["leadership", "database", "architecture", "frontend", "backend", "devops", "other"],
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { _id: false }  // sub-document এ আলাদা _id দরকার নেই
);

const ExperienceSchema = new Schema<TExperience>(
  {
    jobTitle: { type: String, required: true },       // "Senior MERN Architect"
    company:  { type: String, required: true },       // "Nexus Core Solutions"

    startDate: { type: Date, required: true },
    endDate:   { type: Date, required: false },       // Present হলে undefined
    isPresent: { type: Boolean, default: false },

    responsibilities: {
      type: [ResponsibilitySchema],
      required: true,
    },

    technologies: {
      type: [String],                                 // ["MongoDB", "Express", ...]
      required: true,
    },

    order: { type: Number, default: 0 },              // display order
  },
  {
    timestamps: true,
  }
);

export const ExperienceModel = model<TExperience>("Experience", ExperienceSchema);