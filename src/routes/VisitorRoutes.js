import React from 'react'
import { Route, Routes } from "react-router-dom";
import constant from '../utils/constant';
import VisitorList from './../pages/VisitorList';
import { VisitorForm } from './../components/CreateVisitor';

export default function VisitorRoutes() {
    return <Routes>
        <Route index element={<VisitorList />} />
        <Route
            path={constant.APP_ROUTES.EDIT_VISITOR}
            element={<VisitorForm />} />
        <Route path={constant.APP_ROUTES.ADD_VISITOR} element={<VisitorForm />} />
    </Routes>
}