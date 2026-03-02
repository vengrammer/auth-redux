import { Routes, Route } from "react-router-dom";
import EmployeePage from "../component/Employeepage";
import NotFound from "../component/NotFound";
function EmployeeRouter() {
    return (
        <Routes>
            <Route path="/homepage" element={<EmployeePage />} />
             <Route path='*' element={<NotFound />} />
        </Routes>
    )
}
export default EmployeeRouter;