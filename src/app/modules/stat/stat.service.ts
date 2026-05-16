import { ProjectModel } from '../projects/project.model';
import { TStat } from './stat.interface';
import { StatModel } from './stat.model';

const createStatInDB = async (payload: TStat) => {
  // If a stat document already exists, replace it (singleton pattern)
  const existing = await StatModel.findOne();
  if (existing) {
    existing.codeQuality = payload.codeQuality;
    existing.commitsPerYear = payload.commitsPerYear;
    existing.uptime = payload.uptime;
    await existing.save();
    return existing;
  }

  const result = await StatModel.create(payload);
  return result;
};





const updateStatInDB = async (payload: Partial<TStat>) => {
  const existing = await StatModel.findOne();
  if (!existing) {
    // create if not exists
    const created = await StatModel.create(payload as TStat);
    return created;
  }
  if (payload.codeQuality !== undefined) existing.codeQuality = payload.codeQuality;
  if (payload.commitsPerYear !== undefined) existing.commitsPerYear = payload.commitsPerYear;
  if (payload.uptime !== undefined) existing.uptime = payload.uptime;
  await existing.save();
  return existing;
};
// stat.service.ts
const getGithubCommitsPerYear = async (): Promise<string> => {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_CLIENT_SECRET; // optional, but higher rate limit

  const since = new Date();
  since.setFullYear(since.getFullYear() - 1);

  const res = await fetch(
    `https://api.github.com/search/commits?q=author:${username}&since=${since.toISOString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  const data = await res.json();
  const count: number = data.total_count ?? 0;

  // 2400 → "2.4k", 800 → "800"
  return count >= 1000
    ? `${(count / 1000).toFixed(1)}k`
    : String(count);
};

// stat.service.ts — getStatFromDB update
const getStatFromDB = async () => {
  const stat = await StatModel.findOne();
  const projectsCount = await ProjectModel.countDocuments();
  const commitsPerYear = await getGithubCommitsPerYear();

  return {
    // আগের fields
    codeQuality:     stat?.codeQuality ?? 'A+',
    commitsPerYear,
    uptime:          stat?.uptime ?? '99.9%',

    // নতুন fields
    projectsDone:    `${projectsCount}+`,   // auto ✓
    countriesServed: stat?.countriesServed  ?? 1,
    experience:      `${stat?.experienceYears ?? 6}${stat?.experienceSuffix ?? 'm+'}`,
  };
};

export const StatServices = {
  createStatInDB,
  getStatFromDB,
  updateStatInDB
};
