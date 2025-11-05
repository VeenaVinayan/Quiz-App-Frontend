import { type  TQuestion } from "../Types/question.type";

export const INITIAL_STATE: TQuestion = {
  question: "",
  type: "MCQ",     
  options: [],     
  answer: "",
  score: 0,
};
