export interface Faq {
  question: string;
  answer: string;
}

export interface Config {
  repository: string;
  faq: Faq[];
}
