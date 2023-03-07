import { Axios } from "../lib/axios"
import constant from "../utils/constant";

export {
addVisitor,
getVisitors,
getVisitor,
updateVisitor
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