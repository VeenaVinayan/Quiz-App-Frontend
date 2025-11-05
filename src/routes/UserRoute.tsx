import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/User/Dashboard";
import QuizInstructions from "../Pages/Quiz/QuizInstruction";
import QuizPage from '../Pages/Quiz/QuizStart';
import QuizResult from '../Pages/Quiz/QuizResult';

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/profile" element={<Dashboard />} />
      <Route path='/quiz/instructions' element={<QuizInstructions />} />
      <Route path='/quiz' element={<QuizPage />} />
      <Route path='/quiz/result' element={<QuizResult />} />
    </Routes>
  );
};

export default UserRoute;

