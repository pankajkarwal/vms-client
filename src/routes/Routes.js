import React from 'react'
import constant from '../utils/constant'
import ArticleList from './../pages/ArticleList';
import NotFound from './../pages/NotFound'
import Dashboard from '../pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import VisitorRoutes from './VisitorRoutes';
import CountryRoutes from './CountryRoutes';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={constant.APP_ROUTES.LOGIN}  >
                <Route index element={<Dashboard />} />
                <Route path={constant.APP_ROUTES.VISITOR.GET_VISITOR + "/*"} element={<VisitorRoutes /> }/>
                <Route path={constant.APP_ROUTES.COUNTRY.GET_COUNTRY + "/*"} element={<CountryRoutes /> }/>
                <Route path={constant.APP_ROUTES.ARTICLE_LIST} element={<ArticleList />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>

    )
}

export default AppRoutes
