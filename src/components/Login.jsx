import React from 'react'
import { Link} from 'react-router-dom'
import constant from '../utils/constant'

export default function Login() {
  return (
    <div>
        Welcome to Login Page<br></br>
        <Link to={constant.APP_ROUTES.ARTICLE_LIST} >Article List</Link> <br></br>
        <Link to={constant.APP_ROUTES.GET_VISITOR} >Visitor List</Link>

    </div>
  )
}
