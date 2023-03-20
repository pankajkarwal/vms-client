import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';

import React from 'react'
import constant from './constant';
export default [
    {
        title:"Home",
        path:constant.APP_ROUTES.LOGIN,
        icon:<HomeIcon />
    },
    {
        title:"Visitor List",
        path:constant.APP_ROUTES.VISITOR.GET_VISITOR,
        icon:<SupervisedUserCircleIcon />
    },
    {
        title:"Article List",
        path:constant.APP_ROUTES.ARTICLE_LIST,
        icon:<ApartmentIcon />
    },
    {
        title:"Country Master",
        path:constant.APP_ROUTES.COUNTRY.GET_COUNTRY,
        icon:<PublicIcon />
    },
    {
        title:"City Master",
        icon:<LocationCityIcon />
    }
]