import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import constant from '../utils/constant';

export const PrivateRoutes = () => {
  const token =  localStorage.getItem("token")
  let auth = {'token':false}
  auth.token = token && token !=="" ? true : false
return (
    auth.token ? <Outlet/> : <Navigate to={constant.APP_ROUTES.LOGIN}/>
  )
}