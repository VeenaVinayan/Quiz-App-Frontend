import React, { useEffect, useState } from "react";
import { type IQuestion } from '../../Types/question.type';
import { useNavigate } from 'react-router-dom';

interface QuizProps {
  questions: IQuestion[];
  timeLimitMinutes?: number;
}

const Quiz: React.FC<QuizProps> = ({ questions, timeLimitMinutes = 4 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState(timeLimitMinutes * 60);
  console.log("Questions in quiz page ::",questions);
  const currentQuestion = questions[currentIndex];
  const navigate = useNavigate();

  useEffect(() => {
    if (secondsLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = () => {
    console.log('On submit in Quiz Page !!');
    navigate('/user/quiz/result',{state:{questions,answers},replace:true});
  };

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-3xl max-w-3xl w-full p-8">
    
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <div className="text-gray-700 font-semibold bg-amber-200 px-4 py-2 rounded-xl">
            Time Left: {formatTime(secondsLeft)}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-800 text-lg font-medium">{currentQuestion.question}</p>

           <div className="mt-4 space-y-3">
            {currentQuestion.type === "MCQ" &&
              currentQuestion.options?.map((opt, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={opt}
                    checked={answers[currentQuestion.id] === opt}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    className="accent-amber-500"
                  />
                  <span className="text-gray-700">{opt}</span>
                </label>
              ))}

            {currentQuestion.type === "T/F" && (
              <>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value="True"
                    checked={answers[currentQuestion.id] === "True"}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    className="accent-amber-500"
                  />
                  True
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value="False"
                    checked={answers[currentQuestion.id] === "False"}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    className="accent-amber-500"
                  />
                  False
                </label>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-xl disabled:opacity-50"
          >
            Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-amber-500 text-white font-semibold px-6 py-2 rounded-xl hover:bg-amber-600 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-amber-800 text-white font-semibold px-6 py-2 rounded-xl hover:bg-amber-600 transition"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
