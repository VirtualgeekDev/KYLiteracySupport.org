export type ResourceCategory =
  | "All"
  | "Reading & Literacy"
  | "Homework & Study Skills"
  | "Parents & Families"
  | "Digital Learning";

export interface ResourceItem {
  id: string;
  title: string;
  category: "Reading & Literacy" | "Homework & Study Skills" | "Parents & Families" | "Digital Learning";
  description: string;
  format: "Guide" | "Checklist" | "Activity Sheet" | "Overview" | "Toolkit";
  level: "All Ages" | "Elementary" | "Middle School" | "High School & Adults" | "Parents & Caregivers";
  summary: string[];
  placeholderNotice?: string;
  downloadAvailable: boolean;
}

export const resourceCategories: ResourceCategory[] = [
  "All",
  "Reading & Literacy",
  "Homework & Study Skills",
  "Parents & Families",
  "Digital Learning",
];

export const resourcesData: ResourceItem[] = [
  {
    id: "reading-comprehension-guide",
    title: "Everyday Reading Strategies & Comprehension Tips",
    category: "Reading & Literacy",
    description:
      "A practical guide detailing pre-reading questioning, active note-taking, and vocabulary context clues to help learners build stronger comprehension.",
    format: "Guide",
    level: "All Ages",
    summary: [
      "Techniques for asking questions before, during, and after reading",
      "How to use context clues to define unfamiliar words without stopping flow",
      "Graphic organizer concepts to track story plots and main ideas",
      "Encouraging consistent 15-20 minute daily reading sessions",
    ],
    downloadAvailable: false,
    placeholderNotice:
      "This curriculum guide is part of our upcoming learning toolkit. You can view the core principles above or contact us to request educator materials.",
  },
  {
    id: "foundational-phonics-vocabulary",
    title: "Phonics & Vocabulary Builder Guide",
    category: "Reading & Literacy",
    description:
      "A structured overview of core phonetic blends, high-frequency sight words, and engaging vocabulary games for young and emerging readers.",
    format: "Activity Sheet",
    level: "Elementary",
    summary: [
      "Key consonant blends and vowel team reinforcement exercises",
      "High-frequency sight word practice lists",
      "Interactive word-building games using common household items",
      "Tips for making repetition supportive and engaging",
    ],
    downloadAvailable: false,
    placeholderNotice:
      "Printable workbook files will be made available as community workshops launch. Reach out through our contact page to register for updates.",
  },
  {
    id: "writing-sentence-structure",
    title: "Clear Writing & Sentence Crafting Basics",
    category: "Reading & Literacy",
    description:
      "Helpful writing principles covering paragraph structure, transition words, proofreading methods, and creative writing prompts.",
    format: "Toolkit",
    level: "Middle School",
    summary: [
      "The anatomy of an effective paragraph: topic sentences and supporting details",
      "Common transition words to connect ideas smoothly",
      "A self-guided proofreading checklist for school assignments",
      "Starter prompts designed to build expressive writing confidence",
    ],
    downloadAvailable: false,
    placeholderNotice:
      "Curriculum guide pending final educator review. Full worksheets will be published here upon release.",
  },
  {
    id: "homework-planning-template",
    title: "Weekly Homework & Assignment Planner",
    category: "Homework & Study Skills",
    description:
      "An easy-to-use study organization framework that helps learners track multi-step projects, break down assignments, and avoid last-minute stress.",
    format: "Checklist",
    level: "All Ages",
    summary: [
      "Daily priority matrix (urgent vs. long-term project milestones)",
      "Time-blocking recommendations for after-school study intervals",
      "Checklists for gathering study materials before starting work",
      "Techniques to eliminate digital distractions during study hours",
    ],
    downloadAvailable: false,
    placeholderNotice:
      "Template preview available in the interactive resource drawer. Downloadable PDF versions will be added as downloadable assets.",
  },
  {
    id: "effective-study-habits",
    title: "Effective Study Strategies & Retention Habits",
    category: "Homework & Study Skills",
    description:
      "Proven study strategies including the Pomodoro technique, spaced repetition, flashcard creation, and active self-quizzing.",
    format: "Guide",
    level: "High School & Adults",
    summary: [
      "How to implement the 25-minute focused study interval technique",
      "Transforming passive notes into active recall flashcards",
      "Study environment setup: lighting, seating, and device management",
      "Preparing calmly for quizzes, exams, and standardized assessments",
    ],
    downloadAvailable: false,
    placeholderNotice:
      "Developed for small-group workshop participants. Viewable content reflects our core study skills framework.",
  },
  {
    id: "family-reading-routines",
    title: "Creating a Positive Home Reading Environment",
    category: "Parents & Families",
    description:
      "Practical advice for parents and caregivers on establishing enjoyable reading routines, selecting age-appropriate books, and engaging reluctant readers.",
    format: "Guide",
    level: "Parents & Caregivers",
    summary: [
      "Finding 'reading moments' even in busy family schedules",
      "Paired reading: taking turns reading paragraphs aloud",
      "Selecting books that match a child's personal interests and passions",
      "Positive reinforcement: celebrating effort over speed or perfection",
    ],
    downloadAvailable: false,
    placeholderNotice:
      "Distributed during parent workshops. Full digital copies will be accessible here soon.",
  },
  {
    id: "homework-support-for-parents",
    title: "Guiding Without Giving the Answers: Homework Support for Caregivers",
    category: "Parents & Families",
    description:
      "Supportive conversational prompts and calming techniques parents can use when a student feels stuck or frustrated with homework.",
    format: "Checklist",
    level: "Parents & Caregivers",
    summary: [
      "Constructive questions: 'What do you think the first step is?'",
      "Recognizing cognitive fatigue and scheduling short brain breaks",
      "Communicating effectively with classroom teachers when difficulties persist",
      "Reframing mistakes as vital clues in the learning process",
    ],
    downloadAvailable: false,
    placeholderNotice:
      "Workshop resource guide in development. Check back for printable family handouts.",
  },
  {
    id: "computer-basics-beginners",
    title: "Computer Basics & Digital Learning Fundamentals",
    category: "Digital Learning",
    description:
      "A gentle, beginner-friendly introduction to using computers, keyboards, mouse navigation, file management, and school learning portals.",
    format: "Overview",
    level: "All Ages",
    summary: [
      "Understanding hardware components: keyboard shortcuts, mouse, and monitors",
      "Navigating desktop folders, file downloads, and document saving",
      "Accessing school portals, student dashboards, and video classrooms",
      "Basic troubleshooting tips when applications do not respond",
    ],
    downloadAvailable: false,
    placeholderNotice:
      "Companion module to our Digital Literacy workshops. Detailed walkthrough guides will be released as sessions commence.",
  },
  {
    id: "online-safety-evaluation",
    title: "Internet Basics & Digital Safety for Families",
    category: "Digital Learning",
    description:
      "Key considerations for safe internet browsing, recognizing secure websites, protecting personal information, and evaluating online sources.",
    format: "Toolkit",
    level: "All Ages",
    summary: [
      "Creating strong, memorable passwords and using secure accounts",
      "Recognizing deceptive links, popups, and suspicious emails",
      "Guidelines for student privacy on shared family computers",
      "How to verify credible educational information for school projects",
    ],
    downloadAvailable: false,
    placeholderNotice:
      "Safety curriculum component in review. Connect with our team to inquire about family safety workshops.",
  },
];
