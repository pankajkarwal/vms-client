import { Axios } from "../lib/axios"
import constant from "../utils/constant";
import { formatRoute } from 'react-router-named-routes';



const addVisitor = async (payload) => {
    return await Axios.post(constant.SERVICES_ROUTES.VISITOR.ADD_VISITOR,payload);
}

const getVisitors = async () => {
    return await Axios.get(constant.SERVICES_ROUTES.VISITOR.FETCH_ALL_VISITOR)
}

const getVisitor = async (id) => {
    return await Axios.get(constant.SERVICES_ROUTES.VISITOR.SINGLE_VISITOR + "/" +id)
}

const updateVisitor = async (payload) => {
    return await Axios.put(constant.SERVICES_ROUTES.VISITOR.UPDATE_VISITOR,payload)
}

const deleteVisitor = async (id) => {
    const url =formatRoute(constant.SERVICES_ROUTES.VISITOR.DELETE_VISITOR,{id: id});
    return await Axios.delete(url)
}

export {
    addVisitor,
    getVisitors,
    getVisitor,
    updateVisitor,
    deleteVisitor
    }