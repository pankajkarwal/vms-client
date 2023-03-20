import React from 'react'
import { Route, Routes } from "react-router-dom";
import constant from '../utils/constant';
import { CountryForm } from '../components/Country/CountryForm';
import CountryList from '../pages/Country/CountryList';

export default function CountryRoutes() {
    return <Routes>
        <Route index element={<CountryList />} />
        <Route
            path={constant.APP_ROUTES.COUNTRY.EDIT_COUNTRY}
            element={<CountryForm />} />
        <Route path={constant.APP_ROUTES.COUNTRY.ADD_COUNTRY} element={<CountryForm />} />
    </Routes>
}