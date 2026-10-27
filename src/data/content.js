// All site copy lives here so the layout components stay presentational.
// Edit this file to update the site — no component changes needed.

export const profile = {
  name: 'Peter Bui',
  title: 'CS & Business Administration student at Northeastern University',
  tagline:
    'I build web products at the intersection of software and business — shipping interfaces that are clean to use, and built to move the numbers that matter.',
  // Drop your photo in /public and point this at it, e.g. '/peter.jpg'.
  portrait: '/portrait.jpeg',
  email: 'ph.bui07@gmail.com',
  linkedin: 'https://www.linkedin.com/in/phucbui7482/',
  github: 'https://github.com/phbui07',
}

// Scrolling ticker under the hero.
export const marquee = [
  'Web Design',
  'Front-End Development',
  'E-Commerce',
  'UI / UX',
  'Business Strategy',
]

// Large, detailed cards at the top of Selected Works.
export const projects = [
  {
    title: 'Lief',
    summary:
      'A Chrome extension that teaches phishing recognition at the moment it matters: detectors flag a lookalike domain or a password field on an unknown origin, then link the warning back to the lesson explaining the trick. Built with a four-person team.',
    impact: 'Privacy-first by design — no browsing history leaves the device',
    tags: ['Development', 'Security', 'Product'],
    stack: 'Chrome MV3 · React · TypeScript',
    href: 'https://github.com/jaken31/lief',
    repo: 'https://github.com/jaken31/lief',
    image: '/work/lief.jpg',
  },
  {
    title: 'Nến Thương Charity Website',
    summary:
      'Designed and built an e-commerce site for a student-led charity, handling the storefront, product pages and checkout flow end to end.',
    impact: "Generated 10% of the charity's total revenue",
    tags: ['Design', 'Development', 'E-commerce'],
    stack: 'Next.js · TypeScript',
    href: 'https://nen-thuong-nine.vercel.app',
    repo: 'https://github.com/phbui07/Nen-Thuong',
    image: '/work/nen-thuong.jpg',
  },
  {
    title: 'BH Plastic Company Website',
    summary:
      'Designed and launched the company website, integrating a full product catalog and a contact form so prospects could reach the team directly from any page.',
    impact: 'Boosted inbound customer inquiries',
    tags: ['Design', 'Development', 'Catalog'],
    stack: 'Web',
    href: 'https://nhuabhplastic.com',
    repo: null,
    image: '/work/bh-plastic.jpg',
  },
]

// Compact list below the featured work. Pulled from public GitHub repos —
// edit the descriptions and years, or promote any of these into `projects` above.
export const archive = [
  {
    name: 'StockingApp',
    note: 'Cross-platform mobile app built with React Native',
    stack: 'React Native · TypeScript',
    year: '2025',
    href: 'https://github.com/phbui07/StockingApp',
  },
  {
    name: 'Spotify Interface Build',
    note: 'Music-player interface built from scratch, no frameworks',
    stack: 'HTML · CSS · JavaScript',
    year: '2024',
    href: 'https://github.com/phbui07/Spotify',
  },
]

export const stats = [
  { value: 5, suffix: '', label: 'Certifications earned' },
  // Derived so it can never drift from the Selected Works list. Hardcode a
  // number instead if you've delivered work that isn't shown on the site.
  { value: projects.length + archive.length, suffix: '', label: 'Projects delivered' },
  { value: 4, suffix: '', label: 'Years coding' },
]

export const about = [
  'I’m a Computer Science and Business Administration student at Northeastern University. The combined degree is the whole point: I like being the person who can write the code and read the P&L.',
  'Most of my work so far has been building websites that have to earn something — revenue for a charity, inquiries for a manufacturer. I care about the craft of the interface, but I judge the result by what it actually did.',
]

export const certifications = [
  {
    name: 'Google IT Support Professional Certificate',
    issuer: 'Google',
    href: null,
  },
  {
    name: 'Cloud Digital Leader Training Professional Certificate',
    issuer: 'Google Cloud · Coursera',
    href: 'https://www.coursera.org/account/accomplishments/verify/WQVPPJYGVNML',
  },
  {
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    href: 'https://www.freecodecamp.org/certification/fcc03ee9dab-0369-4849-9382-97665369f4c2/responsive-web-design',
  },
  {
    name: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    href: 'https://www.freecodecamp.org/certification/fcc03ee9dab-0369-4849-9382-97665369f4c2/javascript-algorithms-and-data-structures-v8',
  },
  {
    name: 'Java Development Certification',
    issuer: null,
    href: null,
  },
]

export const award = {
  name: 'National Diamond Award',
  detail: 'Southeast Asia Computer Science Olympiad',
  year: '2025',
}

export const leadership = [
  {
    role: 'Founder & President',
    org: 'Nến Thương Project',
    summary:
      'Founded and lead a student-run social enterprise with an 80+ member international team across Vietnam, the United States and Australia.',
    metrics: [
      { value: '$4,000', label: 'Revenue generated' },
      { value: '$1,500', label: 'Donated to charity & UNICEF' },
      { value: '80+', label: 'Team members, 3 countries' },
    ],
  },
  {
    role: 'Creator',
    org: '“Emphasize to Love” storytelling series',
    summary:
      'Grew a storytelling series that reached more than 2,000 people, using personal narrative to build support for the project’s cause.',
    metrics: [{ value: '2,000+', label: 'People reached' }],
  },
]

export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
]
