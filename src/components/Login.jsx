import React from 'react'
import { NavLink, Link, Outlet} from 'react-router-dom'
import constant from '../utils/constant'

export default function Login() {
  return (
    <div>
        Welcome to Login Page<br></br>
        <NavLink to={constant.APP_ROUTES.ARTICLE_LIST} >Article List</NavLink> <br></br>
        <NavLink to={constant.APP_ROUTES.GET_VISITOR} >Visitor List</NavLink>
        <Outlet />
    </div>
  )
}
