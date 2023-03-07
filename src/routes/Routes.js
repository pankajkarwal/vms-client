import React from 'react'
import VisitorList from './../pages/VisitorList'
import constant from '../utils/constant'
import ArticleList from './../pages/ArticleList';
import NotFound from './../pages/NotFound'
import Login from '../components/Login'
import { CreateVisitor } from '../components/CreateVisitor'
import {  Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={constant.APP_ROUTES.LOGIN} element={<Layout />} />
                <Route path={constant.APP_ROUTES.GET_VISITOR} element={<VisitorList />} />
                <Route path={constant.APP_ROUTES.ARTICLE_LIST} element={<ArticleList />} />
                <Route path={constant.APP_ROUTES.EDIT_VISITOR} element={<CreateVisitor />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}

export default AppRoutes
