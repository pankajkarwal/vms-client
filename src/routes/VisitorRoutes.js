import React from 'react'
import { Route, Routes } from "react-router-dom";
import constant from '../utils/constant';
import VisitorList from './../pages/Visitor/VisitorList';
import { VisitorForm } from './../components/CreateVisitor';

export default function VisitorRoutes() {
    return <Routes>
        <Route index element={ <VisitorList />} />
        <Route
            path={constant.APP_ROUTES.VISITOR.EDIT_VISITOR}
            element={<VisitorForm />} />
        <Route path={constant.APP_ROUTES.VISITOR.ADD_VISITOR} element={<VisitorForm />} />
    </Routes>
}