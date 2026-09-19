export interface FAQItem {
  question: string;
  answer: string;
  category?: "General" | "Programs" | "Get Involved";
}

export const faqsData: FAQItem[] = [
  {
    question: "What does Kentucky Literacy Foundation, Inc. do?",
    answer:
      "Kentucky Literacy Foundation, Inc. is a nonprofit organization dedicated to improving access to education and literacy resources. We work to support children, students, adults, and families through literacy programs, homework assistance, tutoring, book and educational material distribution, school supply assistance, and educational workshops.",
    category: "General",
  },
  {
    question: "Who can access educational resources and programs?",
    answer:
      "Our initiatives are intended to support children, K-12 students, adult learners, and families who have limited access to learning support across Kentucky communities. Participation in specific sessions is subject to individual program scheduling and educator availability.",
    category: "General",
  },
  {
    question: "Do you provide tutoring?",
    answer:
      "Yes. One-on-one and small-group tutoring are core components of our educational support model. Sessions are coordinated based on individual learning needs and educator availability, focusing primarily on reading, writing, and foundational study skills.",
    category: "Programs",
  },
  {
    question: "Do you provide free books and school supplies?",
    answer:
      "Distributing books and learning materials to help families build supportive reading environments at home is an essential part of our mission. Book distributions and school supply assistance activities are conducted periodically as community resources and donations allow.",
    category: "Programs",
  },
  {
    question: "Can I volunteer with the foundation?",
    answer:
      "Yes. We welcome volunteer interest from educators, community members, and mentors who share a passion for literacy. Volunteer roles include reading mentors, homework assistants, workshop helpers, and administrative or community outreach support.",
    category: "Get Involved",
  },
  {
    question: "Can schools or community organizations partner with you?",
    answer:
      "Yes. We are open to exploring educational collaborations with local schools, public libraries, community organizations, and educational advocates. Please contact our team via the partnership inquiry form to discuss shared initiatives.",
    category: "Get Involved",
  },
  {
    question: "How can I support the organization's mission?",
    answer:
      "There are several meaningful ways to support our mission: volunteering your time and expertise, donating new or gently used books and school supplies, discussing community partnerships, or providing financial support toward learning materials and educational programs.",
    category: "Get Involved",
  },
  {
    question: "How can families request educational assistance?",
    answer:
      "Families, caregivers, and adult learners can reach out directly through our Contact page. Selecting 'Educational Support' or 'Tutoring' on the inquiry form allows our team to connect with you regarding current program availability and appropriate learning resources.",
    category: "General",
  },
];
