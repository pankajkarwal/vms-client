import { Axios } from "../lib/axios"
import constant from "../utils/constant";
import { formatRoute } from 'react-router-named-routes';

export {
addCountry,
getCountries,
getCountry,
updateCountry,
deleteCountry
}

const addCountry = async (payload) => {
    return await Axios.post(constant.SERVICES_ROUTES.COUNTRY.ADD_COUNTRY,payload);
}

const getCountries = async () => {
    return await Axios.get(constant.SERVICES_ROUTES.COUNTRY.FETCH_ALL_COUNTRY)
}

const getCountry = async (id) => {
    return await Axios.get(constant.SERVICES_ROUTES.COUNTRY.SINGLE_COUNTRY + "/" +id)
}

const updateCountry = async (payload) => {
    return await Axios.put(constant.SERVICES_ROUTES.COUNTRY.UPDATE_COUNTRY,payload)
}

const deleteCountry = async (id) => {
    const url =formatRoute(constant.SERVICES_ROUTES.COUNTRY.DELETE_COUNTRY,{id: id});
    return await Axios.delete(url)
}