import React from "react";
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-gradient-to-r from-blue-100 via-white to-blue-50">
      <div className="flex-1 text-center md:text-left space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-snug">
          Test Your Knowledge with <span className="text-amber-800">QuizMaster</span>
        </h2>
        <p className="text-gray-600 text-lg md:w-3/4 mx-auto md:mx-0">
          Challenge yourself with fun, interactive quizzes on various topics. Improve your skills and see how you rank!
        </p>
       </div>
      <div className="flex-1 mt-10 md:mt-0">
        <Link to="/login"
            className="bg-amber-800 text-white px-6 py-3 rounded-full text-lg hover:bg-amber-700 transition-all">
          Start Quiz
        </Link>
      </div>
    </section>
  );
};
export default Hero;
