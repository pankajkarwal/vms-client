import React from 'react'
import AppRoutes from '../routes/Routes';
import Layout from './Layout';
import PageRoute from './../routes/PageRoute';

export default function LayoutContent() {
  console.log("Layout Content")
  return (
    <div>
      {/* <AppRoutes />  */}
<PageRoute />

    </div>
  )
}
