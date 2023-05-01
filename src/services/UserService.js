import { Axios } from "../lib/axios"
import constant from "../utils/constant";
import { formatRoute } from 'react-router-named-routes';


const addUser = async (payload) => {
    return await Axios.post(constant.SERVICES_ROUTES.USER.ADD_USER, payload);
}

const getUsers = async () => {
    return await Axios.get(constant.SERVICES_ROUTES.USER.FETCH_ALL_USER)
}

const getUser = async (id) => {
    return await Axios.get(constant.SERVICES_ROUTES.USER.SINGLE_USER + "/" + id)
}

const updateUser = async (payload) => {
    return await Axios.put(constant.SERVICES_ROUTES.USER.UPDATE_USER, payload)
}

const deleteUser = async (id) => {
    const url = formatRoute(constant.SERVICES_ROUTES.USER.DELETE_USER, { id: id });
    return await Axios.delete(url)
}
const loginUser = async (payload) =>{
    return await Axios.post(constant.SERVICES_ROUTES.USER.LOGIN,payload)
}
export {
    addUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    loginUser
}