export interface Program {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName:
    | "BookOpen"
    | "Pencil"
    | "Users"
    | "Laptop"
    | "BookMarked"
    | "School"
    | "Clock"
    | "HeartHandshake"
    | "Globe";
  status: "Core Offering" | "Expanding Initiative" | "Planned Program";
  activities: string[];
  audience: string;
  scheduleNote?: string;
}

export const programsData: Program[] = [
  {
    id: "literacy-programs",
    title: "Literacy Programs",
    shortDescription:
      "Reading and writing support designed to help learners strengthen foundational literacy skills.",
    fullDescription:
      "Our literacy programs are designed for children, youth, and adult learners seeking to strengthen fundamental reading and writing abilities. Through guided exercises, comprehension activities, and vocabulary building, we work to make reading an engaging, confidence-building experience.",
    iconName: "BookOpen",
    status: "Core Offering",
    activities: [
      "Guided reading practice and phonics reinforcement",
      "Writing support and sentence construction",
      "Vocabulary development and comprehension strategies",
      "Foundational literacy activities for early readers",
      "Adult basic literacy encouragement and self-paced exercises",
    ],
    audience: "Children, youth, and adult learners",
    scheduleNote: "Sessions coordinated based on community interest and volunteer availability.",
  },
  {
    id: "homework-assistance",
    title: "Homework Assistance",
    shortDescription:
      "Free educational support to help students better understand assignments, build confidence, and develop effective study habits.",
    fullDescription:
      "Homework assistance offers students a supportive environment where they can work through academic assignments with guidance. Rather than providing quick answers, mentors help learners understand concepts, develop problem-solving steps, and build independent study habits.",
    iconName: "Pencil",
    status: "Core Offering",
    activities: [
      "Assistance with daily school assignments",
      "Guidance for research projects and written reports",
      "Reading comprehension reviews for assigned literature",
      "Writing assignment drafting and proofreading guidance",
      "Study organization and assignment tracking methods",
    ],
    audience: "Elementary, middle, and high school students",
    scheduleNote: "Offered during after-school hours and weekend study periods.",
  },
  {
    id: "tutoring",
    title: "Tutoring",
    shortDescription:
      "One-on-one and small-group educational support tailored to individual learning needs.",
    fullDescription:
      "Our tutoring initiatives focus on targeted academic support designed to meet learners at their current level. Mentors and volunteer educators work with individuals or small groups to reinforce key concepts in reading, language arts, and essential school subjects.",
    iconName: "Users",
    status: "Core Offering",
    activities: [
      "One-on-one personalized tutoring sessions",
      "Small-group collaborative study sessions",
      "Subject-focused assistance in reading and language arts",
      "Study skills and test-preparation strategies",
      "Confidence-building learning reinforcement",
    ],
    audience: "K-12 students requiring individualized support",
    scheduleNote: "Arranged by request and volunteer educator matching.",
  },
  {
    id: "online-learning",
    title: "Online Learning Resources",
    shortDescription:
      "Accessible educational resources and virtual learning support for students and families.",
    fullDescription:
      "To ensure learning support is not limited by physical location or transportation barriers, we provide accessible digital study materials, curriculum-aligned exercises, and virtual tutoring options for remote learners.",
    iconName: "Laptop",
    status: "Expanding Initiative",
    activities: [
      "Curated digital educational guides and worksheets",
      "Virtual one-on-one and small-group tutoring opportunities",
      "Digital reading materials and interactive literacy links",
      "Self-directed learning guides for students and parents",
      "Online educational enrichment resources",
    ],
    audience: "Remote students, rural families, and digital learners",
    scheduleNote: "Self-paced materials accessible online anytime; virtual sessions scheduled as announced.",
  },
  {
    id: "books-materials",
    title: "Books & Educational Materials",
    shortDescription:
      "Distribution of books and educational materials to help families build stronger learning environments at home.",
    fullDescription:
      "Having books at home is one of the most reliable predictors of educational growth. We work to collect, curate, and distribute free age-appropriate books and learning materials to help children and families build home libraries.",
    iconName: "BookMarked",
    status: "Core Offering",
    activities: [
      "Free book distribution for young and intermediate readers",
      "Reading materials for family literacy time",
      "Learning resource packets for home study",
      "Educational games and literacy flashcards",
      "Book drives and community distribution events",
    ],
    audience: "Children, families, and community reading corners",
    scheduleNote: "Distribution events organized periodically as community resources allow.",
  },
  {
    id: "school-supply-assistance",
    title: "School Supply Assistance",
    shortDescription:
      "Assistance with essential school supplies and academic tools to help students arrive prepared to learn.",
    fullDescription:
      "Lacking basic learning tools can hinder a student's daily classroom participation. Kentucky Literacy Foundation, Inc. works to provide essential school supplies to students and families experiencing resource constraints.",
    iconName: "School",
    status: "Expanding Initiative",
    activities: [
      "Distribution of notebooks, paper, and writing binders",
      "Pens, pencils, erasers, and highlighters",
      "Folders, organizers, and assignment planners",
      "Basic academic tools for elementary and middle schoolers",
      "Seasonal supply replenishment drives",
    ],
    audience: "Students and families in need of classroom essentials",
    scheduleNote: "Concentrated at the start of academic terms and mid-year refreshes.",
  },
  {
    id: "after-school-learning",
    title: "After-School Learning",
    shortDescription:
      "Educational activities outside regular school hours including homework support, reading sessions, and enrichment.",
    fullDescription:
      "After-school educational programs provide a constructive, safe environment for learners to continue academic growth after the school bell rings. Sessions blend homework assistance with enriching reading circles and collaborative educational projects.",
    iconName: "Clock",
    status: "Planned Program",
    activities: [
      "Structured after-school homework support",
      "Group reading circles and book discussions",
      "Quiet, supervised study time with mentor presence",
      "Educational enrichment activities and word puzzles",
      "Academic preparation for upcoming school modules",
    ],
    audience: "School-age children during weekday afternoons",
    scheduleNote: "Under development with community host locations.",
  },
  {
    id: "parent-education",
    title: "Parent Education Workshops",
    shortDescription:
      "Workshops and practical resources covering home reading routines, homework strategies, and family literacy encouragement.",
    fullDescription:
      "Parents and caregivers are a child's first and most enduring educators. Our parent education workshops share actionable, stress-free strategies to encourage reading, establish homework routines, and nurture positive learning habits at home.",
    iconName: "HeartHandshake",
    status: "Expanding Initiative",
    activities: [
      "Practical workshops on supporting reading at home",
      "Establishing sustainable homework and study routines",
      "Strategies for encouraging reluctant readers",
      "Navigating school communications and academic conferences",
      "Family literacy activities that make learning enjoyable",
    ],
    audience: "Parents, caregivers, and foster families",
    scheduleNote: "Offered virtually and in community venues as scheduled.",
  },
  {
    id: "digital-literacy",
    title: "Digital Literacy",
    shortDescription:
      "Support with basic computer skills, internet fundamentals, online learning platforms, and digital safety awareness.",
    fullDescription:
      "In today's learning environment, digital literacy is foundational to education and personal advancement. We provide patient, step-by-step guidance for students and adults learning to navigate computers, digital homework portals, and safe online research.",
    iconName: "Globe",
    status: "Core Offering",
    activities: [
      "Foundational computer and operating system navigation",
      "Internet browsing basics and safe online searching",
      "Accessing school portals, Google Classroom, and learning apps",
      "Digital safety, password hygiene, and privacy awareness",
      "Using technology tools for writing, research, and homework",
    ],
    audience: "Adult learners, caregivers, and students advancing digital skills",
    scheduleNote: "Held in workshop formats and individual practice sessions.",
  },
];
