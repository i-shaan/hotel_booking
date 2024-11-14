import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layouts/Layout';

import Register from "../src/pages/Register"
import '@fortawesome/fontawesome-free/css/all.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/SignIn';


function App() {
  return (
  
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Home Page</p>
        </Layout>} />
        
        <Route path="/search" element={<Layout>
          <p>Search Page</p>
        </Layout>} />
        <Route path="/register" element={<Layout>
          <Register/>
        </Layout>} /> 
        <Route path="/sign-in" element={<Layout>
          <Login/>
        </Layout>} /> 
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </Router>
   
   
  );
}

export default App;
