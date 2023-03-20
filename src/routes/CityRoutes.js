import React from 'react'
import { Route, Routes } from "react-router-dom";
import constant from '../utils/constant';
import { CityForm } from '../components/City/CityForm';
import CityList from '../pages/City/CityList';

export default function CityRoutes() {
    return <Routes>
        <Route index element={<CityList />} />
        <Route
            path={constant.APP_ROUTES.CITY.EDIT_CITY}
            element={<CityForm />} />
        <Route path={constant.APP_ROUTES.CITY.ADD_CITY} element={<CityForm />} />
    </Routes>
}