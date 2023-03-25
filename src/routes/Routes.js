import React , {memo} from 'react'
import constant from '../utils/constant'
import ArticleList from './../pages/ArticleList';
import NotFound from './../pages/NotFound'
import Dashboard from '../pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import VisitorRoutes from './VisitorRoutes';
import CountryRoutes from './CountryRoutes';
import CityRoutes from './CityRoutes';
import Layout from '../layout/Layout';
import { PrivateRoutes } from './PrivateRoutes';
import Login from './../pages/Login/login';
import UserRoutes from './UserRoutes';

const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route path={constant.APP_ROUTES.LOGIN}  >
                <Route index element={<Dashboard />} />
                <Route path={constant.APP_ROUTES.VISITOR.GET_VISITOR + "/*"} element={<VisitorRoutes /> }/>
                <Route path={constant.APP_ROUTES.COUNTRY.GET_COUNTRY + "/*"} element={<CountryRoutes /> }/>
                <Route path={constant.APP_ROUTES.CITY.GET_CITY + "/*"} element={<CityRoutes /> }/>
                <Route path={constant.APP_ROUTES.ARTICLE_LIST} element={<ArticleList />} />
                <Route path='*' element={<NotFound />} />
            </Route> */}


           
                <Route element={<PrivateRoutes /> } >
                    {/* <Route path='/' element={<LayoutContent />} /> */}
                    <Route path='/*' element={<Layout />} />
                {/* <Route path={constant.APP_ROUTES.VISITOR.GET_VISITOR + "/*"} element={<VisitorRoutes /> }/>
                <Route path={constant.APP_ROUTES.COUNTRY.GET_COUNTRY + "/*"} element={<CountryRoutes /> }/>
                <Route path={constant.APP_ROUTES.CITY.GET_CITY + "/*"} element={<CityRoutes /> }/>
                <Route path={constant.APP_ROUTES.USER.GET_USER + "/*"} element={<UserRoutes /> }/>
                <Route path={constant.APP_ROUTES.ARTICLE_LIST} element={<ArticleList />} /> */}
                <Route path='*' element={<NotFound />} />
                </Route>
                <Route path={constant.APP_ROUTES.LOGIN} element={<Login />} />
           
        </Routes>

    )
}

export default memo(AppRoutes)