export interface FAQType {
    contents: ContentType[];
    faqTitle: string;
    questions: QuestionType[];
}

interface ContentType {
    title: string;
    description: string;
}

interface QuestionType {
    question: string;
    answer: string;
}