import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../components/Login'
import constant from '../utils/constant'
import { CreateVisitor } from '../components/CreateVisitor';
import VisitorList from '../pages/VisitorList';
import ArticleList from '../pages/ArticleList';
import NotFound from '../pages/NotFound';
import AppRoutes from '../routes/Routes';

export default function LayoutContent() {
  return (
    <div>
      
        <AppRoutes />
        
    </div>
  )
}
