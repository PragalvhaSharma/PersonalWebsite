export type SocialLink = {
  name: string;
  url: string;
  label: string;
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  title: string;
  description: string;
  eyebrow: string;
  imageUrl: string;
  imageFit?: "contain" | "cover";
  links: ProjectLink[];
};

export const socialLinks: SocialLink[] = [
  { name: "X", url: "https://x.com/pragalvha", label: "X icon button" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/pragalvha-sharma-389499204/",
    label: "LinkedIn icon button",
  },
  { name: "GitHub", url: "https://github.com/PragalvhaSharma", label: "GitHub icon button" },
];

export const navItems = [
  { name: "About", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Writing", href: "/writing" },
  { name: "Prag API", href: "/prag-api" },
] as const;

export const highlightProjects: Project[] = [
  {
    title: "NASA/NSS Space Settlement Contest",
    description:
      "First-place global finish, beating 26,725 students across 19 countries with a future habitat submission.",
    eyebrow: "Highlight / Research",
    imageUrl: "/NASA.png",
    links: [
      { label: "Project", url: "https://github.com/Mehtab-Cheema26/Space-Settlement" },
      {
        label: "INsauga",
        url: "https://www.insauga.com/brampton-students-win-international-competition-hosted-by-nasa-and-national-space-society/",
      },
      { label: "NASA/NSS", url: "https://nss.org/settlement/nasa/Contest/Results/2023/" },
    ],
  },
  {
    title: "GrokHunt",
    description:
      "Won the xAI Hackathon (retweeted by Elon :)). A Grok-powered talent hunter that finds high-signal people on X and sends personalized outreach through an AI interviewer flow.",
    eyebrow: "Highlight / xAI",
    imageUrl: "/Grok.jpeg",
    imageFit: "contain",
    links: [
      { label: "Result", url: "https://twitter.com/xai/status/1997875261669621787" },
      { label: "GitHub", url: "https://github.com/PragalvhaSharma/XaiHackthon" },
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Self Evolving MCP Server",
    description:
      "A demo of an agentic system that inspects, extends, and evolves its own capabilities over time.",
    eyebrow: "Agents",
    imageUrl: "/MCP Server.avif",
    imageFit: "cover",
    links: [
      {
        label: "Demo",
        url: "https://www.loom.com/share/edccf270519d4a47bb0b23e0ff23f0c6?sid=254bb5a9-ca00-453d-8011-50342875b783#Activity",
      },
    ],
  },
  {
    title: "Brand Campaign Agent",
    description:
      "Turns a brand into a full ad campaign: scripts the spots, casts avatars, and composes the final cuts.",
    eyebrow: "Video",
    imageUrl: "/brandAgent.svg",
    imageFit: "contain",
    links: [
      { label: "Full run", url: "https://x.com/Pragalvha/status/2055341592307757329" },
      {
        label: "Samples",
        url: "https://drive.google.com/drive/folders/1d5vtDn8Hf-ziLir2-fkXrRDPJ-UJHmCB?usp=sharing",
      },
    ],
  },
  {
    title: "Catholic School Finder",
    description:
      "A location-based search tool for finding Catholic universities nearby without digging through scattered lists.",
    eyebrow: "Utility",
    imageUrl: "/catholic.png",
    links: [
      { label: "Live site", url: "https://catholic-web-app-bbop.vercel.app" },
      { label: "Demo", url: "https://www.loom.com/share/ffddd4e868404112a989c07b8050dcdd" },
    ],
  },
  {
    title: "Blanc AI ERP Generator",
    description:
      "An agentic framework for generating custom enterprise software from a prompt.",
    eyebrow: "Enterprise",
    imageUrl: "/erpPrev.png",
    links: [
      {
        label: "Demo",
        url: "https://drive.google.com/file/d/1jgjvSjjuLevfB16wOxpOCwFEepZ5Xg3C/view",
      },
    ],
  },
  {
    title: "Blanc AI Quoting Tool",
    description:
      "A contractor SaaS flow that sourced materials and generated quotes across more than 5,000 runs.",
    eyebrow: "Startup",
    imageUrl: "/quoting.png",
    links: [
      { label: "Demo", url: "https://www.youtube.com/watch?v=d_4CJmvCbWo" },
      { label: "Live", url: "https://www.blancai.ca" },
    ],
  },
  {
    title: "Step Count Changer",
    description:
      "A native iOS app that writes custom step counts into Apple HealthKit. Built for an Ivey step competition.",
    eyebrow: "iOS",
    imageUrl: "/stepcount.svg",
    imageFit: "contain",
    links: [{ label: "GitHub", url: "https://github.com/PragalvhaSharma/StepCountChanger" }],
  },
];
