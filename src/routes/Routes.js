import React, { memo } from 'react'
import constant from '../utils/constant'
import ArticleList from './../pages/ArticleList';
import NotFound from './../pages/NotFound'
import Dashboard from '../pages/Dashboard';
import { Route, Routes, useNavigate } from 'react-router-dom';
import VisitorRoutes from './VisitorRoutes';
import CountryRoutes from './CountryRoutes';
import CityRoutes from './CityRoutes';
import Layout from '../layout/Layout';
import { PrivateRoutes } from './PrivateRoutes';
import Login from './../pages/Login/login';
import UserRoutes from './UserRoutes';

const AppRoutes = () => {
    const navigate = useNavigate()
    return (
        <Routes>
            <Route element={<PrivateRoutes />} >
                <Route path='/*' element={<Layout navigate={navigate} />} />
            </Route>
            <Route path='*' element={<NotFound />} />
            <Route path={constant.APP_ROUTES.LOGIN} element={<Login />} />
        </Routes>
    )
}

export default memo(AppRoutes)