import { type  TQuestion } from "../Types/question.type";

export const PER_PAGE = 10;

export const INITIAL_STATE: TQuestion = {
  question: "",
  type: "MCQ",     
  options: [],     
  answer: "",
  score: 0,
};
