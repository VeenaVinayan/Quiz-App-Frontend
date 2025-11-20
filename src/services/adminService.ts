import { axiosInstance } from "../apiStore/userApi";
import type { TQuestion } from "../Types/question.type";
import { QUESTION } from '../constants/routes/quiz';
import type { TApiResponse } from "../Types/general.types";
import { type IQuestion, type IQuestionResult } from '../Types/question.type';
import { PER_PAGE } from '../constants/question';

class AdminService{
    async addQuestion(questions : TQuestion[]):Promise<TApiResponse<TQuestion>>{
            const { data } = await axiosInstance.post(QUESTION.QUESTIONS,questions);
            return data;
    }
    async getQuestions(page : number):Promise<IQuestionResult>{
           console.log('Get question Service !');
           const { data } = await axiosInstance.get(`${QUESTION.QUESTIONS}/${page}/${PER_PAGE}`);
           console.log('Questiona after api call ::',data.data);
           return data.data;
    }
    async deleteQuestion(id :string):Promise<boolean>{
          console.log("Delete Id ::",id);
          const response = await axiosInstance.delete(`${QUESTION.QUESTIONS}/${id}`);
          if(response.status === 200) return true;
          else return false;      
    }
    async updateQuestion(question : IQuestion){
          console.log("Updated Value",question);
          const response = await axiosInstance.put(`${QUESTION.QUESTIONS}`,question);
          if(response) return true;
          else return false;
    }
  }
export default new AdminService;