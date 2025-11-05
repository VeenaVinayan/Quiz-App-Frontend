import React from "react";
import { useLocation ,Link } from 'react-router-dom';
import  Navbar  from '../Design/NavBar';
import { Play} from 'lucide-react';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const {  user } = location.state;

  console.log('User Profile Page !!');
 
  const quizHistory = [
    { id: 1, title: "React Basics", score: 90, date: "2025-10-15" },
    { id: 2, title: "Node.js Fundamentals", score: 80, date: "2025-10-20" },
    { id: 3, title: "JavaScript Advanced", score: 76, date: "2025-10-28" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <Navbar />
      </header>
      <section className="bg-white shadow rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Profile</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Phone:</span> {user.phone}</p>
        </div>
      </section>
      <div className="bg-amber-100 flex flex-row shadow rounded-2xl p-6 mb-6">
         <p className="text-amber-700 font-semibold text-2xl" >Test your GK now...</p>
         <Link to='/user/quiz/instructions'
          className="w-50 flex justify-center items-center gap-2 bg-amber-600 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md"
        >
          <Play size={20} />
          Start Quiz
        </Link>
      </div>
      <section className="bg-amber-100 shadow rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Quiz Stats</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-amber-50 rounded-lg">
            <p className="text-2xl font-bold text-amber-600">{user.totalQuizzes}</p>
            <p>Total Quizzes</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg">
            <p className="text-2xl font-bold text-amber-600">{user.avgScore}%</p>
            <p>Average Score</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg">
            <p className="text-2xl font-bold text-amber-600">{user.accuracy}%</p>
            <p>Accuracy</p>
          </div>
        </div>
      </section>
     <section className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Quizzes</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-amber-100 text-left">
                <th className="p-3">GK</th>
                <th className="p-3">Score</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {quizHistory.map((quiz) => (
                <tr key={quiz.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{quiz.score}%</td>
                  <td className="p-3">{quiz.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
