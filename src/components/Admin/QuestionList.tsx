import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import { type  IQuestionResult,type  IQuestion} from '../../Types/question.type';
import { ArrowRight, ArrowLeft, DeleteIcon , EditIcon } from "lucide-react";
import {toast } from 'react-toastify';
import EditQuestionModal from "./QuestionForm";
import { PER_PAGE } from "../../constants/question";
const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [edit, setEdit] = useState<IQuestion>();
  const [page, setPage] = useState<number>(1);
  const [total, setTotal ] = useState<number>();
  const [isOpen, setIsOpen ] = useState<boolean>(false);

  const fetchQuestions = async (page : number) => {
     const response : IQuestionResult = await adminService.getQuestions(page);
     setQuestions(response.questions);
     const totalPages = Math.floor(response.totalCount/PER_PAGE)+1;
     setTotal(totalPages);
     console.log(response);
  };
    
  useEffect(() => { fetchQuestions(page) },[page]);

  const handleDelete = async (id: string) => {
    const res = await adminService.deleteQuestion(id);
    if(res){
        setQuestions((prev) => prev.filter((q) => q.id !== id));
        toast.success("Question delete Successfully");
    }else{
      toast.error("Question delete failed !")
    }
  };

  const handleUpdate = async (question: IQuestion) => {
     setIsOpen(true);
     setEdit(question);
  };

  const handleEditSave = async(question : IQuestion) =>{
     const response = await adminService.updateQuestion(question);
     if(response){
         setQuestions((prev) =>
               prev.map((q) => (q.id === question.id ? {...q,...edit} : q ))
        );
         toast.success("Question edited successfully");
     }else{
         toast.error("Question editing failed ");
     }
  }
  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-6">
      <h3 className="text-xl font-semibold mb-4">All Questions</h3>
      {questions.map((q) => (
        <div key={q.id} className="flex justify-between items-center border-b py-2">
            <p>{q.question}</p>
          
          <div className="flex gap-2">
               <button
                onClick={() => {
                    handleUpdate(q);
                }}
                className="bg-yellow-700 text-white px-3 py-1 rounded"
              >
                <EditIcon size={16} />
              </button>
            
            <button
              onClick={() => handleDelete(q.id!)}
              className="px-3 py-1 rounded bg-amber-900 text-white"
            >
              <DeleteIcon size={16} />
            </button>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center space-x-3 mt-6">
  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className="px-4 py-2 rounded-full bg-linear-to-r from-amber-700 to-gray-600 text-white hover:from-gray-300 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
  >
    <ArrowLeft size={16} color={'white'} />
  </button>

  <span className="px-4 py-2 rounded-full bg-amber-800 text-white font-semibold shadow-md">
    {page}
  </span>

  <button
    onClick={() => setPage(page + 1)}
    disabled={page === total}
    className="px-4 py-2 rounded-full bg-linear-to-r from-amber-700 to-gray-600 text-white hover:from-gray-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
  >
    <ArrowRight size={16} color={'white'} />
  </button>
</div>
<EditQuestionModal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    question={edit}
    onSave={handleEditSave}
 />
</div>

 );
};

export default QuestionList;
