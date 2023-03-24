import { Axios } from "../lib/axios"
import constant from "../utils/constant";
import { formatRoute } from 'react-router-named-routes';


const addCity = async (payload) => {
    return await Axios.post(constant.SERVICES_ROUTES.CITY.ADD_CITY, payload);
}

const getCities = async () => {
    return await Axios.get(constant.SERVICES_ROUTES.CITY.FETCH_ALL_CITY)
}

const getCity = async (id) => {
    return await Axios.get(constant.SERVICES_ROUTES.CITY.SINGLE_CITY + "/" + id)
}

const updateCity = async (payload) => {
    return await Axios.put(constant.SERVICES_ROUTES.CITY.UPDATE_CITY, payload)
}

const deleteCity = async (id) => {
    const url = formatRoute(constant.SERVICES_ROUTES.CITY.DELETE_CITY, { id: id });
    return await Axios.delete(url)
}
export {
    addCity,
    getCities,
    getCity,
    updateCity,
    deleteCity
}