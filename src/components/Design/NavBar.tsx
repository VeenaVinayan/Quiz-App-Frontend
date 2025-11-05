import React , {useContext} from "react";
import { AuthContext } from '../../Context/authContext';
import { SquareDashed } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const context = useContext(AuthContext);

  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 bg-gray-100 rounded shadow-md">
      <div className="flex items-center gap-3">
         <SquareDashed color={'gray'} size={26} />
        <h1 className="text-2xl font-bold text-amber-800">QuizMaster</h1>
      </div>
      {context?.isAuthenticated ? (
        <div className="bg-amber-900 rounded-full shadow-2xl w-32 h-32" >
       </div>
      ):(
        <Link to='/login'
              className="bg-amber-600 text-white px-5 py-2 rounded-full hover:bg-amber-700 transition-all">
           Login
        </Link>
      )
    }
      
    </nav>
  );
};

export default Navbar;
