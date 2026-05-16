export type TProject = {
    title: string;
    image?: string;
    description: string;
    githubLinkFrontend: string;
    githubLinkBackend: string;
    liveLink: string;
    technologies: string[];
    category?: 'fullstack' | 'frontend' | 'backend';
    order: number;
};