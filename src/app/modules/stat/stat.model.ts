import { Schema, model } from 'mongoose';
import { TStat } from './stat.interface';

const StatSchema = new Schema<TStat>(
  {
    codeQuality: { type: String, required: true },
    commitsPerYear: { type: String, required: true },
    uptime: { type: String, required: true },
     countriesServed:  { type: Number, default: 1 },
  experienceYears:  { type: Number, default: 6 },
  experienceSuffix: { type: String, default: 'm+' },
  },
  { timestamps: true },
);

export const StatModel = model<TStat>('Stat', StatSchema);
