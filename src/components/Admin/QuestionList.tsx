import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import type { TApiResponse } from "../../Types/general.types";
import { type TQuestion } from '../../Types/question.type';
import { type  IQuestion} from '../../Types/question.type';

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const fetchQuestions = async () => {
     const response : IQuestion[] = await adminService.getQuestions();
     setQuestions(response);
     console.log(response);
  };
    

 useEffect(() => { fetchQuestions() }, []);

//   const handleDelete = async (id: string) => {
//     await adminService.deleteQuestion(id);
//     fetchQuestions();
//   };

//   const handleUpdate = async (id: string) => {
//     //await adminService.updateQuestion(id, { question: editText, options: [], correctAnswer: "" });
//     setEditingId(null);
//     fetchQuestions();
//   };
  
  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-6">
      <h3 className="text-xl font-semibold mb-4">All Questions</h3>
      {questions.map((q) => (
        <div key={q.id} className="flex justify-between items-center border-b py-2">
          {editingId === q.id ? (
            <input
              className="border p-2 rounded w-full"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <p>{q.question}</p>
          )}
          <div className="flex gap-2">
            {editingId === q.id ? (
              <button
                onClick={() => handleUpdate(q.id!)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingId(q.id!);
                  setEditText(q.question);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            )}
            {/* <button
              onClick={() => handleDelete(q.id!)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
