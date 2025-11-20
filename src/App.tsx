import AppRoute from "./routes"
import { ToastContainer} from 'react-toastify';
import { AuthProvider } from "./Context/authProvider";
function App() {

  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <AppRoute />
      </AuthProvider> 
    </>
  )
}

export default App
