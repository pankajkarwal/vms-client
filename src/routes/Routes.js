import React, { memo } from 'react'
import constant from '../utils/constant'
import NotFound from './../pages/NotFound'
import { Route, Routes, useNavigate } from 'react-router-dom';

import Layout from '../layout/Layout';
import { PrivateRoutes } from './PrivateRoutes';
import Login from './../pages/Login/login';

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