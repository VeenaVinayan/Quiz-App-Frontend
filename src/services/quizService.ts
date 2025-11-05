import { axiosInstance }from "../apiStore/userApi";
import { type IQuestion } from '../Types/question.type';

class QuizService{

  async saveQuiz(questions: IQuestion[], answers: Record<string, string>, userId: string): Promise<void>{
  try {
    console.log("Result Calculation Service !!", questions, answers);
    const quizQuestions = questions.map(q => q.id);
    const totalScore = questions.reduce((acc, q) => acc + q.score, 0);
    const obtainedScore = questions.reduce((acc, q) => answers[q.id] === q.answer ? acc + q.score : acc, 0);
    const data = { userId, questions: quizQuestions, total: totalScore, score: obtainedScore };
    
    const res =  await axiosInstance.post('/quiz', data);
    console.log(res.data.message);
   } catch (err) {
    console.error("Failed to save quiz:", err);
  }
}
}

export default new QuizService;