import React , { useState ,useEffect , useContext } from "react";
import { useLocation} from 'react-router-dom';
import quizService from '../../services/quizService';
import { AuthContext } from "../../Context/authContext";
import { type IQuestion } from '../../Types/question.type';
import {type TQuizResult } from '../../Types/quiz.types';
import Navbar from '../../components/Design/NavBar';

const ResultPage: React.FC = () => {
  const [result, setResult] = useState<TQuizResult | null>(null);
  console.log('Result Page !!');
  const location = useLocation();
  const { questions, answers } = location.state as {
    questions: IQuestion[];
    answers: Record<string, string>;
  };
  const context = useContext(AuthContext);
  const user = context?.getUserData?.(); 
  const userId = user?.id;
  console.log("User DAta ::", user);

  useEffect(() => {
    if (!userId) return; 
      if (!questions || !answers || !userId) return;

    const totalScore = questions.reduce((sum, q) => sum + q.score, 0);
    const obtainedScore = questions.reduce(
      (sum, q) => (answers[q.id] === q.answer ? sum + q.score : sum),
      0
    );
    const correctCount = questions.filter(q => answers[q.id] === q.answer).length;
    const incorrectCount = questions.length - correctCount;
    const percentage = Math.round((obtainedScore / totalScore) * 100);

    const localResult: TQuizResult = {
      totalScore,
      obtainedScore,
      correctCount,
      incorrectCount,
      percentage,
    };
    console.log("Calculated Result = ",localResult);
    setResult(localResult);
    const saveQuizResult = async () => {
      try {
        await quizService.saveQuiz(questions, answers, userId);
      
      } catch (error) {
        console.error("Error saving quiz result:", error);
      }
    };
    saveQuizResult();
  },[questions, answers, userId]);

  const { totalScore, obtainedScore, correctCount ,incorrectCount, percentage} = result ?? {};
   return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Navbar />
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quiz Result</h2>
          <div className="flex flex-row p-2 m-3">
            <h3>Name :: </h3>
      
          </div>
          <div className="flex flex-col md:flex-row justify-around items-center mb-6 gap-6">
          <div className="text-center bg-amber-100 p-4 rounded-xl w-40">
            <p className="text-gray-700 font-medium">Total Score</p>
            <p className="text-2xl font-bold text-gray-800">{totalScore}</p>
          </div>
          <div className="text-center bg-amber-200 p-4 rounded-xl w-40">
            <p className="text-gray-700 font-medium">Obtained</p>
            <p className="text-2xl font-bold text-gray-800">{obtainedScore}</p>
          </div>
          <div className="text-center bg-amber-300 p-4 rounded-xl w-40">
            <p className="text-gray-700 font-medium">Percentage</p>
            <p className="text-2xl font-bold text-gray-800">{percentage}%</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-2 font-medium text-gray-700">Score Progress</p>
          <div className="w-full bg-gray-300 rounded-full h-6">
            <div
              className="bg-amber-700 h-6 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="flex justify-around mb-6 gap-6">
          <div className="text-center bg-green-100 p-4 rounded-xl w-40">
            <p className="text-gray-700 font-medium">Correct</p>
            <p className="text-2xl font-bold text-green-700">{correctCount}</p>
          </div>
          <div className="text-center bg-red-100 p-4 rounded-xl w-40">
            <p className="text-gray-700 font-medium">Incorrect</p>
            <p className="text-2xl font-bold text-red-700">{incorrectCount}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Question Review</h3>
          <div className="space-y-4">
            {questions.map((q, idx) => {
              const isCorrect = answers[q.id] === q.answer;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border ${
                    isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
                  }`}
                >
                  <p className="font-medium">
                    {idx + 1}. {q.question}
                  </p>
                  <p className="mt-2">
                    Your Answer:{" "}
                    <span className={isCorrect ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
                      {answers[q.id] || "Not answered"}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p className="mt-1 text-gray-800">
                      Correct Answer: <span className="font-semibold">{q.answer}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
       </div>
    </div>
  );
};

export default ResultPage;
// import React, { useState, useEffect, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import quizService from "../../services/quizService";
// import { AuthContext } from "../../Context/authContext";
// import { type IQuestion } from "../../Types/question.type";
// import { type TQuizResult } from "../../Types/quiz.types";
// import Navbar from "../../components/Design/NavBar";

// const ResultPage: React.FC = () => {
//   const [result, setResult] = useState<TQuizResult | null>(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const context = useContext(AuthContext);

//   const user = context?.getUserData?.();
//   const userId = user?.id;
//   const name = user?.name;

//   const state = location.state as
//     | { questions: IQuestion[]; answers: Record<string, string> }
//     | undefined;

//   const questions = state?.questions ?? [];
//   const answers = state?.answers ?? {};

//   useEffect(() => {
//     if (!userId || questions.length === 0) {
//        navigate("/");
//       return;
//     }

//     const totalScore = questions.reduce((sum, q) => sum + (q.score || 1), 0);
//     const obtainedScore = questions.reduce(
//       (sum, q) => (answers[q.id] === q.answer ? sum + (q.score || 1) : sum),
//       0
//     );

//     const correctCount = questions.filter(q => answers[q.id] === q.answer).length;
//     const incorrectCount = questions.length - correctCount;
//     const percentage = Math.round((obtainedScore / totalScore) * 100);

//     const localResult: TQuizResult = {
//       totalScore,
//       obtainedScore,
//       correctCount,
//       incorrectCount,
//       percentage,
//     };

//     setResult(localResult);

//     (async () => {
//       try {
//         await quizService.saveQuiz(questions, answers, userId);
//       } catch (error) {
//         console.error("Error saving quiz result:", error);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [questions, answers, userId, navigate]);

//   if (loading || !result)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-lg text-gray-600 animate-pulse">Calculating your result...</p>
//       </div>
//     );

//   const { totalScore, obtainedScore, correctCount, incorrectCount, percentage } = result;

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <Navbar />
//       <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl p-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quiz Result</h2>

//         <div className="flex flex-row p-2 m-3 justify-center">
//           <h3 className="text-xl font-semibold text-gray-700">Name: </h3>
//           <span className="ml-2 text-lg font-medium text-gray-800">{name || "User"}</span>
//         </div>

//         <div className="flex flex-col md:flex-row justify-around items-center mb-6 gap-6">
//           <div className="text-center bg-amber-100 p-4 rounded-xl w-40">
//             <p className="text-gray-700 font-medium">Total Score</p>
//             <p className="text-2xl font-bold text-gray-800">{totalScore}</p>
//           </div>
//           <div className="text-center bg-amber-200 p-4 rounded-xl w-40">
//             <p className="text-gray-700 font-medium">Obtained</p>
//             <p className="text-2xl font-bold text-gray-800">{obtainedScore}</p>
//           </div>
//           <div className="text-center bg-amber-300 p-4 rounded-xl w-40">
//             <p className="text-gray-700 font-medium">Percentage</p>
//             <p className="text-2xl font-bold text-gray-800">{percentage}%</p>
//           </div>
//         </div>

//         <div className="mb-6">
//           <p className="mb-2 font-medium text-gray-700">Score Progress</p>
//           <div className="w-full bg-gray-300 rounded-full h-6">
//             <div
//               className="bg-amber-700 h-6 rounded-full transition-all duration-700"
//               style={{ width: `${percentage}%` }}
//             />
//           </div>
//         </div>

//         <div className="flex justify-around mb-6 gap-6">
//           <div className="text-center bg-green-100 p-4 rounded-xl w-40">
//             <p className="text-gray-700 font-medium">Correct</p>
//             <p className="text-2xl font-bold text-green-700">{correctCount}</p>
//           </div>
//           <div className="text-center bg-red-100 p-4 rounded-xl w-40">
//             <p className="text-gray-700 font-medium">Incorrect</p>
//             <p className="text-2xl font-bold text-red-700">{incorrectCount}</p>
//           </div>
//         </div>

//         <div className="mt-6">
//           <h3 className="text-xl font-semibold mb-4 text-gray-800">Question Review</h3>
//           <div className="space-y-4">
//             {questions.map((q, idx) => {
//               const isCorrect = answers[q._id] === q.answer;
//               return (
//                 <div
//                   key={q.id}
//                   className={`p-4 rounded-xl border ${
//                     isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
//                   }`}
//                 >
//                   <p className="font-medium">
//                     {idx + 1}. {q.question}
//                   </p>
//                   <p className="mt-2">
//                     Your Answer:{" "}
//                     <span
//                       className={isCorrect ? "text-green-700 font-bold" : "text-red-700 font-bold"}
//                     >
//                       {answers[q.id] || "Not answered"}
//                     </span>
//                   </p>
//                   {!isCorrect && (
//                     <p className="mt-1 text-gray-800">
//                       Correct Answer: <span className="font-semibold">{q.answer}</span>
//                     </p>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultPage;
