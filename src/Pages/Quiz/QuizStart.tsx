import React ,{ useEffect , useState} from "react";
import Quiz from "./QuizPage";
import { type IQuestion } from '../../Types/question.type';
import quizService from "../../services/quizService";

const QuizStart : React.FC= () => {
    const [ questions, setQuestions ] = useState<IQuestion[]>([]); 
  
    useEffect(() =>{
        ( async () =>{
        const questions : IQuestion []   = await quizService.getQuestions();
        console.log('Questions :: ',questions);
        setQuestions(questions)
      })();
    },[]);  
    
    if (!questions.length) return <p className="justify-center items-center text-amber-900 font-medium">Loading questions...</p>;
    return (
        <div>
           <Quiz questions={questions} />
        </div>
    )
}

export default QuizStart;
