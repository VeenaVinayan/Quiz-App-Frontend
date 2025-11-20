export type TQuestionType = "MCQ" | "T/F";

export type TQuestion ={
    question:string;
    type:TQuestionType;
    options?:string[];
    answer:string;
    score:number;
}

export interface IQuestion {
    id:string;
    question:string;
    type:TQuestionType;
    options?:string[];
    answer:string;
    score:number;
}
export interface IQuestionResult {
    questions: IQuestion[];
    totalCount:number;
}
