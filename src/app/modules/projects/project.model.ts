import mongoose, { Schema } from 'mongoose';
import { TProject } from './project.interface';

const ProjectSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: true,
        },
        githubLinkFrontend: {
            type: String,
            required: true,
            validate: {
                validator: (v: string) => /^https?:\/\/(www\.)?github\.com\/.+/.test(v),
                message: 'Invalid GitHub link format.',
            },
        },
        githubLinkBackend: {
            type: String,
            required: true,
            validate: {
                validator: (v: string) => /^https?:\/\/(www\.)?github\.com\/.+/.test(v),
                message: 'Invalid GitHub link format.',
            },
        },
        liveLink: {
            type: String,
            required: true,
            validate: {
                validator: (v: string) => /^https?:\/\/.+/.test(v),
                message: 'Invalid live link format.',
            },
        },
        technologies: {
            type: [String],
            required: true,
        },
        category: {
            type: String,
            enum: ['fullstack', 'frontend', 'backend'],
            default: 'fullstack',
        },
        order: {
            type: Number,
            default: 0, // ← নতুন field
        },
    },
    {
        timestamps: true,
    }
);

export const ProjectModel = mongoose.model<TProject>('Project', ProjectSchema);