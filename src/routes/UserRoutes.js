import React from 'react'
import { Route, Routes } from "react-router-dom";
import constant from '../utils/constant';
import {UserForm} from '../components/User/UserForm';
import UserList from '../pages/User/UserList';

export default function UserRoutes() {
    return <Routes>
        <Route index element={<UserList />} />
        <Route
            path={constant.APP_ROUTES.CITY.EDIT_CITY}
            element={<UserForm />} />
        <Route path={constant.APP_ROUTES.CITY.ADD_CITY} element={<UserForm />} />
    </Routes>
}