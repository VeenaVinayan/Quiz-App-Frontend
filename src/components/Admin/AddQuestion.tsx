import React, { useState } from "react";
import adminService from "../../services/adminService";
import { type  TQuestion } from "../../Types/question.type";
import { INITIAL_STATE } from "../../constants/question";
import { Edit, Delete } from "lucide-react";
import { toast } from 'react-toastify';
import type { TApiResponse } from "../../Types/general.types";
import { useNavigate } from 'react-router-dom';

const QuestionForm: React.FC = () => {
  const [question, setQuestion] = useState<TQuestion>(INITIAL_STATE);
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

     if (name.startsWith("option") && typeof index === "number") {
    const newOptions = [...(question.options || [])];
      newOptions[index] = value;
      setQuestion({ ...question, options: newOptions });
    } else {
      setQuestion({ ...question, [name]: name === "score" ? Number(value) : value });
    }
  };

  const handleAddQuestion = () => {
    if (!question.question || !question.answer) {
      alert("Question and Answer are required!");
      return;
    }

    const finalQuestion: TQuestion = {
      ...question,
      options: question.type === "T/F" ? ["True", "False"] : question.options,
    };

    setQuestions((prev) => [...prev, finalQuestion]);
    setQuestion(INITIAL_STATE);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }

    try {
       console.log("Questions ::",questions);
       const res : TApiResponse<TQuestion> =   await adminService.addQuestion(questions);
       console.log("Response is::",res);
       if(res?.data?.success){
            toast.success(res?.data?.message);
            navigate('/admin/dashboard');
       }else{
        toast.success('Successfully Added !!');
       }
      setQuestions([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit questions.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Add Quiz Questions</h2>

        <form className="space-y-4">
          {/* Question Text */}
          <div>
            <label className="block font-medium mb-1">Question</label>
            <input
              className="border p-2 rounded w-full"
              name="question"
              value={question.question}
              onChange={handleChange}
              placeholder="Enter question"
            />
          </div>

          {/* Question Type */}
          <div className="flex items-center gap-6 mb-2">
            <span className="font-medium">Type:</span>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="T/F"
                checked={question.type === "T/F"}
                onChange={handleChange}
              />
              True / False
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="MCQ"
                checked={question.type === "MCQ"}
                onChange={handleChange}
              />
              Multiple Choice
            </label>
          </div>

          {question.type === "MCQ" &&
            [0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <span>{i + 1}.</span>
                <input
                  className="border p-2 rounded w-full"
                  name={`option${i}`}
                  value={question.options[i] || ""}
                  onChange={(e) => handleChange(e, i)}
                  placeholder={`Option ${i + 1}`}
                />
              </div>
            ))}

           <div>
            <label className="block font-medium mb-1">Correct Answer</label>
            <input
              className="border p-2 rounded w-full"
              name="answer"
              value={question.answer}
              onChange={handleChange}
              placeholder="Correct answer"
            />
          </div>

          {/* Score */}
          <div>
            <label className="block font-medium mb-1">Score</label>
            <input
              type="number"
              className="border p-2 rounded w-full"
              name="score"
              value={question.score || ""}
              onChange={handleChange}
              placeholder="Question Score"
            />
          </div>

          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Question
          </button>
        </form>

        {questions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Questions Added</h3>
            <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
              {questions.map((q, i) => (
                <div
                  key={i}
                  className="bg-gray-100 p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div>
                    <p className="font-medium">{i + 1}. {q.question}</p>
                    {q.options.length > 0 && (
                      <ul className="list-decimal ml-6 mt-1">
                        {q.options.map((opt, idx) => (
                          <li key={idx}>{opt}</li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-2">Answer: <span className="font-semibold">{q.answer}</span></p>
                    <p>Score: {q.score}</p>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button><Edit size={20} color="gray" /></button>
                    <button><Delete size={20} color="gray" /></button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Submit All Questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;
