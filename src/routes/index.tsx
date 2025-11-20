import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute';
import ProtectedRoute from './protectedRoute'

const AppRoute : React.FC = () =>{
     return(
        <Router>
            <Routes>
              {/* <Route element ={<PrivateRoute />} > */}
                <Route path="/*" element={<AuthRoute />} />
              {/* </Route>   */}
               <Route path='/user/*' element={<ProtectedRoute><UserRoute /></ProtectedRoute>} />
               <Route path='/admin/*' element={<ProtectedRoute><AdminRoute /></ProtectedRoute> } />
            </Routes> 
        </Router>
     )
}

export default AppRoute;