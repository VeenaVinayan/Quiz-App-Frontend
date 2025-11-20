export type TQuizResult ={
    totalScore : number;
    obtainedScore:number;
    correctCount : number;
    incorrectCount : number;
    percentage: number;
}
export type TQuiz={
    id:string;
    userId:string;
    score:number;
    totalScore:number;
    createdAt:Date;
}