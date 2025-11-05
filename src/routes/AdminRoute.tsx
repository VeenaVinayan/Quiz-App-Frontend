import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Admin/Dashboard';
import AddQuestion from '../components/Admin/AddQuestion';
import ListQuestion from '../components/Admin/QuestionList';

const AdminDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="add" element={<AddQuestion />} />
        <Route path="list" element={<ListQuestion />} />
      </Route> 
    </Routes>
  );
};

export default AdminDashboard;
