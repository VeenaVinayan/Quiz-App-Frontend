import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Design/NavBar";
import { Play } from "lucide-react";
import useAuthContext from "../../customHook/Auth";
import quizService from "../../services/quizService";
import { type TQuiz } from "../../Types/quiz.types";
import ProgressBar from "../Design/ProgressBar";

const Dashboard: React.FC = () => {
  const [quiz, setQuiz] = useState<TQuiz[]>([]);
  const [quizResult, setResult] = useState<number>(0);

  const context = useAuthContext();
  const user = context?.userData;

  useEffect(() => {
    (async () => {
      if (!user?.id) return;
      const data = await quizService.getQuizHistory(user.id);
      if (data) {
        setQuiz(data);
        calculateStats(data);
      }
    })();
  },[]);

  const calculateStats = (quiz: TQuiz[]) => {
    let totalScore = 0;
    let score = 0;
    quiz.forEach((q) => {
      totalScore += Number(q.totalScore);
      score += Number(q.score);
    });
    const percentage = Math.floor((score / totalScore) * 100);
    setResult(percentage);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-amber-50 p-4 md:p-8">
      
      <header className="mb-8">
        <Navbar />
      </header>

      <div className="max-w-5xl mx-auto space-y-8">

        <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Profile Overview
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 text-gray-700">
            <p><span className="font-medium">Name:</span> {user?.name}</p>
            <p><span className="font-medium">Email:</span> {user?.email}</p>
            <p><span className="font-medium">Phone:</span> {user?.phone}</p>
          </div>
        </section>

        <section className="bg-amber-200/80 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg rounded-2xl p-6 border border-amber-300">
          <p className="text-2xl font-semibold text-amber-900">
            Test your GK now and improve yourself!
          </p>

          <Link
            to="/user/quiz/instructions"
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md"
          >
            <Play size={20} />
            Start Quiz
          </Link>
        </section>
      {
        quiz.length > 0 && (
        <>
        <section className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Quiz Statistics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-amber-50 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-amber-600">{quiz.length}</p>
              <p className="text-gray-700 font-medium mt-1">Total Quizzes</p>
            </div>

            <div className="p-6 bg-amber-50 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-amber-600">{quizResult}%</p>
              <p className="text-gray-700 font-medium mt-1">Average Score</p>
            </div>

            <div className="p-4 flex justify-center">
              <ProgressBar percentage={quizResult ?? 0} size={150} stroke={12} />
            </div>
          </div>
        </section>

          <section className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-amber-500 rounded-full"></span>
              Recent Quizzes
            </h2>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-amber-50 border-b">
                    <th className="p-4 text-gray-700 font-medium">Score</th>
                    <th className="p-4 text-gray-700 font-medium">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {quiz.map((q, index) => (
                    <tr
                      key={q.id}
                      className={`transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-amber-100/40`}
                    >
                      <td className="p-4 font-semibold text-gray-800">
                        <span className="inline-block bg-amber-500 text-white px-4 py-1 rounded-full text-sm shadow-sm">
                          {Math.floor((q.score/q.totalScore)*100)}%
                        </span>
                      </td>

                      <td className="p-4 text-gray-600">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
         </> 
        )}
      </div>
    </div>
  );
};

export default Dashboard;
