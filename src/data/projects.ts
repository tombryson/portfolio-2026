export interface Project {
  slug: string;
  index: string;
  name: string;
  tagline?: string;
  description: string;
  implementation: string;
  tags: string[];
  links: { label: string; href: string }[];
  image?: string;
  liveUrl?: string;
  screenshots?: { src: string; caption: string; width: number; height: number }[];
}

export const projects: Project[] = [
  {
    slug: "alpha-edge",
    index: "01",
    name: "Alpha Edge",
    liveUrl: "https://alpha-edge-demo-frontend.fly.dev/",
    description:
      "An investment analysis application that brings qualitative research and quantitative signals together. Compare company quality and valuations, track market trends, and use that analysis to inform portfolio allocation.",
    implementation:
      "Next.js and TypeScript frontend, Go backend and SQLite. Integrates multi-model AI research and company-announcement analysis through Alpha Edge Intelligence, alongside TradingView webhooks for market and position signals.",
    tags: ["Next.js", "TypeScript", "Go", "SQLite", "TradingView webhooks", "Docker", "Fly.io"],
    links: [{ label: "GitHub", href: "https://github.com/tombryson/alpha-edge" }],
    // Terminal captures use synthetic holdings and sample alerts; Marketview shows public TradingView
    // charts. Intelligence captures show saved company research in an isolated workspace.
    screenshots: [
      { src: "/projects/alpha-edge/positions-dashboard.png", width: 2000, height: 1125, caption: "Home — positions and stock details (demo)" },
      { src: "/projects/alpha-edge/intelligence-council.png", width: 1600, height: 900, caption: "Intelligence — stock council analysis" },
      { src: "/projects/alpha-edge/intelligence-announcement-router.png", width: 1600, height: 900, caption: "Intelligence — Announcement Router" },
      { src: "/projects/alpha-edge/marketview.png", width: 1256, height: 692, caption: "Marketview — four charts (demo)" },
      { src: "/projects/alpha-edge/capital-map.png", width: 1280, height: 720, caption: "Capital map — demo holdings" },
      { src: "/projects/alpha-edge/portfolio.png", width: 1280, height: 720, caption: "Portfolio allocation — demo" },
      { src: "/projects/alpha-edge/history.png", width: 1280, height: 720, caption: "Allocation history — demo" },
    ],
  },
  {
    slug: "russian-arcade",
    index: "02",
    name: "Russian Arcade",
    liveUrl: "https://russian-arcade.fly.dev/post/",
    description:
      "Learn Russian through flashcards, reading, writing, AI conversations and games. Turn tutor notes into guided exercises, with Barsik the cat leading introductory lessons for younger learners.",
    implementation:
      "A shared vocabulary model connects Russian word forms to learning history. FSRS schedules reviews, OCR turns lesson selections into flashcards, and WebRTC supports live speaking practice with audio feedback.",
    tags: ["Python", "Flask", "Preact", "TypeScript", "SQLite", "FSRS", "OpenAI", "ElevenLabs", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/tombryson/russian-arcade" }],
    screenshots: [
      { src: "/projects/russian-arcade/home.png", width: 2862, height: 1572, caption: "Meet Barsik — the learning journey" },
      { src: "/projects/russian-arcade/scene-practice.png", width: 1440, height: 791, caption: "Describe the scene — grammar in context" },
      { src: "/projects/russian-arcade/flashcards.png", width: 1440, height: 791, caption: "Flashcard library — public demo" },
    ],
  },
  {
    slug: "burning-airlines",
    index: "03",
    name: "Burning Airlines",
    liveUrl: "https://burning-airlines-client.fly.dev/",
    description:
      "A proof-of-concept flight booking application, using real-world OAG flight data and user sessions to search and book seats on flights.",
    implementation:
      "React frontend, Rails backend, PostgreSQL database, a hand-rolled custom pricing API, password hashing, user sessions and entirely handwritten CSS, designed and wire-framed.",
    tags: ["React", "Ruby on Rails", "PostgreSQL", "REST API"],
    links: [
      { label: "GitHub", href: "https://github.com/tombryson/final-project-client" },
    ],
    screenshots: [
      { src: "/projects/burning-airlines/home-sunset.png", width: 2858, height: 1580, caption: "Homepage — sunset" },
      { src: "/projects/burning-airlines/flight-search.png", width: 2862, height: 1572, caption: "Flight search and results" },
      { src: "/projects/burning-airlines/home.png", width: 2858, height: 1580, caption: "Homepage" },
      { src: "/projects/burning-airlines/flight-specials.png", width: 2858, height: 1580, caption: "Flight specials" },
      { src: "/projects/burning-airlines/home-transition.png", width: 2862, height: 1572, caption: "Homepage — image transition" },
    ],
  },
];
