import axiosInstance from "../apiStore/adminApi";
import type { TQuestion } from "../Types/question.type";
import { QUESTION } from '../constants/routes/quiz';
import type { TApiResponse } from "../Types/general.types";
import { type IQuestion } from '../Types/question.type';

class AdminService{
    async addQuestion(questions : TQuestion[]):Promise<TApiResponse<TQuestion>>{
            const { data } = await axiosInstance.post(QUESTION.ADD_QUESTION,questions);
            return data;
    }
    async getQuestions():Promise<IQuestion[]>{
            console.log('Get question Service !');
            const { data } = await axiosInstance.get(QUESTION.GET_QUESTIONS);
            console.log('Questiona after api call ::',data.data);
            return data.data;
    }
    async deleteQuestion(id){
 
    }
    async updateQuestion(){

    }

    }
export default new AdminService;