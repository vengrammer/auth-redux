import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminRouter from "./Router/AdminRouter";
import EmployeeRouter from './Router/EmployeeRouter';
import LoginPage from './component/LoginPage';
import NotFound from './component/NotFound';
import Register from './component/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='admin/*' element={<AdminRouter/>}/>
        <Route path='employee/*' element={<EmployeeRouter />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App