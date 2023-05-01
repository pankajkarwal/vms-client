import React,{ memo} from 'react'
import { Routes } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';
import Dashboard from './../pages/Dashboard';
import VisitorRoutes from './VisitorRoutes';
import CountryRoutes from './CountryRoutes';
import CityRoutes from './CityRoutes';
import UserRoutes from './UserRoutes';
import ArticleList from './../pages/ArticleList';
import NotFound from './../pages/NotFound';
import constant from '../utils/constant';
import { Route } from 'react-router-dom';

 function PageRoute() {
   
    return (
        <Routes>
        <Route path={constant.APP_ROUTES.INDEX} element={<PrivateRoutes />} >
           
            <Route index element={<Dashboard />} />
            <Route path={constant.APP_ROUTES.VISITOR.GET_VISITOR + "/*"} element={<VisitorRoutes />} />
            <Route path={constant.APP_ROUTES.COUNTRY.GET_COUNTRY + "/*"} element={<CountryRoutes />} />
            <Route path={constant.APP_ROUTES.CITY.GET_CITY + "/*"} element={<CityRoutes />} />
            <Route path={constant.APP_ROUTES.USER.GET_USER + "/*"} element={<UserRoutes />} />
            <Route path={constant.APP_ROUTES.ARTICLE_LIST} element={<ArticleList />} />
            <Route path='*' element={<NotFound />} />
        </Route>
        </Routes>
    )
}

export default memo(PageRoute)