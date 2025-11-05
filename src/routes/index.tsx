import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute';

const AppRoute : React.FC = () =>{
     return(
        <Router>
            <Routes>
               <Route path="/*" element={<AuthRoute />} />
               <Route path='/user/*' element={<UserRoute />} />
               <Route path='/admin/*' element={<AdminRoute /> } />
            </Routes> 
        </Router>
     )
}

export default AppRoute;