import React from 'react'
import VisitorList from './../pages/VisitorList'
import constant from '../utils/constant'
import ArticleList from './../pages/ArticleList';
import NotFound from './../pages/NotFound'
import Login from '../components/Login'
import Dashboard from '../pages/Dashboard';
import { VisitorForm } from '../components/CreateVisitor'
import { Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';
import VisitorRoutes from './VisitorRoutes';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={constant.APP_ROUTES.LOGIN}  >
                <Route index element={<Dashboard />} />
                <Route path={constant.APP_ROUTES.GET_VISITOR + "/*"} element={<VisitorRoutes /> }/>
                <Route path={constant.APP_ROUTES.ARTICLE_LIST} element={<ArticleList />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>

    )
}

export default AppRoutes
