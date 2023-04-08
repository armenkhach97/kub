import { Routes, Route } from 'react-router-dom';
import { getUserAccountType } from './actions/constant';
import PageNotFound from './pages/404';
import Home from './pages/home';
import Room from './pages/room';
import Users from './pages/users';
import AllReports from './pages/reports';
import ResetPassword from './pages/reset-password';
import Register from "./components/auth/Register.jsx";

export default function Routing(props) {
    const accountType = getUserAccountType()

    return <Routes>
        {accountType === "admin" ? <Route exact path='/' element={<Room />}></Route> : <Route exact path='/' element={<Home />}></Route>}
        {accountType === "admin" && <Route exact path='/users' element={<Users />}></Route>}
        {accountType === "admin" && <Route exact path='/reports' element={<AllReports />}></Route>}

        <Route exact path='/reset-password/:id' element={<ResetPassword />}></Route>
        <Route exact path='/*' element={<PageNotFound />}></Route>

    </Routes>
}
