import { axiosInstance }from "../apiStore/userApi";
import { type IQuestion } from '../Types/question.type';
import { type TQuiz } from '../Types/quiz.types';
import { QUIZ } from '../constants/routes/quiz';

class QuizService{
 async saveQuiz(questions: IQuestion[], answers: Record<string, string>, userId: string): Promise<void>{
  try {
    console.log("Result Calculation Service !!", questions, answers);
    const quizQuestions = questions.map(q => q.id);
    const totalScore = questions.reduce((acc, q) => acc + q.score, 0);
    const obtainedScore = questions.reduce((acc, q) => answers[q.id] === q.answer ? acc + q.score : acc, 0);
    const data = { userId, questions: quizQuestions, totalScore, score: obtainedScore };
    
    const res =  await axiosInstance.post(QUIZ.QUIZ, data);
    console.log(res.data.message);
   } catch (err) {
    console.error("Failed to save quiz:", err);
  }
}
async getQuizHistory(userId : string):Promise<TQuiz[] | null>{
      const  response  = await axiosInstance.get(`${QUIZ.QUIZ_HISTORY}/${userId}`);
      console.log("Quiz History ::",response);
      if(response.status === 200) return response.data.quizData;
      else return null;
 }
async getQuestions():Promise<IQuestion[]>{
   console.log('Get quiz questions ');
   const { data } = await axiosInstance.get(QUIZ.QUIZ);
   return data.questions;
 }
}

export default new QuizService;