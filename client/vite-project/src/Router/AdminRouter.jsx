
import {Routes, Route} from "react-router-dom"
import AdminPage from "../component/adminpage";
import NotFound from "../component/NotFound";
function AdminRouter() {
    return (
        <Routes>
            <Route path="/homepage" element={<AdminPage />} />
             <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default AdminRouter;