export type ExamGuideFaq = { question: string; answer: string };

export type ExamGuide = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  markdown: string;
  faq: ExamGuideFaq[];
};
