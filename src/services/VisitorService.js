import { Axios } from "../lib/axios"
import constant from "../utils/constant";
import { formatRoute } from 'react-router-named-routes';

export {
addVisitor,
getVisitors,
getVisitor,
updateVisitor,
deleteVisitor
}

const addVisitor = async (payload) => {
    return await Axios.post(constant.SERVICES_ROUTES.ADD_VISITOR,payload);
}

const getVisitors = async () => {
    return await Axios.get(constant.SERVICES_ROUTES.FETCH_ALL_VISITOR)
}

const getVisitor = async (id) => {
    return await Axios.get(constant.SERVICES_ROUTES.SINGLE_VISITOR + "/" +id)
}

const updateVisitor = async (payload) => {
    return await Axios.put(constant.SERVICES_ROUTES.UPDATE_VISITOR,payload)
}

const deleteVisitor = async (id) => {
    const url =formatRoute(constant.SERVICES_ROUTES.DELETE_VISITOR,{id: id});
    return await Axios.delete(url)
}