import React from "react";
import { ArrowRight } from "lucide-react";
import  Navbar  from '../../components/Design/NavBar';
import { Link } from 'react-router-dom';

const QuizInstructions: React.FC = () => {
  return (
    <div className="min-hscreen m-2 bg-gray-100 p-2 shadow">
        <Navbar />
    <div className="flex items-center justify-center bg-gray-100 px-4 mt-10">
      <div className="bg-white max-w-2xl w-full p-8 rounded-3xl shadow-2xl border-t-8 border-amber-500">
        
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Quiz Instructions
        </h1>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-amber-500 font-bold">1.</span>
            <span>This quiz consists of 10 questions.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-500 font-bold">2.</span>
            <span>Time allowed: 10 minutes. The timer starts when you begin.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-500 font-bold">3.</span>
            <span>Each question carries 2 marks.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-500 font-bold">4.</span>
            <span>If the time ends, the quiz will be automatically submitted.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-500 font-bold">5.</span>
            <span>Make sure you read each question carefully before answering.</span>
          </li>
        </ul>

        <p className="mt-6 text-gray-600 italic text-center">
          Good luck! Please click "Start Quiz" when you are ready.
        </p>

        <div className="mt-8 flex justify-center">
            <Link to="/user/quiz"  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300">
                 Start Quiz <ArrowRight size={20} />
            </Link>
        </div>
      </div>
    </div>
   </div> 
  );
};

export default QuizInstructions;
