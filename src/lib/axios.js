import axios from 'axios'
import { formatRoute } from 'react-router-named-routes';
import constant from '../utils/constant';

let baseURL
baseURL = process.env.REACT_APP_VMS_API_URL

let Axios

const init = () => {
  Axios = axios.create({
    baseURL: baseURL,
    timeout: 60000
  })
  Axios.interceptors.request.use(handleSuccessRequest, handleErrorRequest)
  Axios.interceptors.response.use(handleSuccess, handleError)

}

const handleSuccessRequest = (request) => {
  addLoadingIndicator();
  if (localStorage.getItem('token'))
    // try to check if token is expired...
    request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  return request
}

const handleErrorRequest = (error) => {
  removeLoadingIndicator();
  return Promise.reject(error)
}

const handleSuccess = (response) => {
  removeLoadingIndicator();
  return response
}

const handleError = (error) => {
  removeLoadingIndicator()
  if (error.message === 'Network Error') {
    // The user doesn't have internet
    return Promise.reject(error.response)
  }
  try {
    switch (error.response.status) {
      case 400:
        removeLoadingIndicator()
        localStorage.removeItem('token')
        window.location.href = formatRoute(constant.APP_ROUTES.LOGIN, {})
        break
      case 401:
        removeLoadingIndicator()
        localStorage.removeItem('token')
        window.location.href = formatRoute(constant.APP_ROUTES.LOGIN, {})
        break
      case 404:
        // Show 404 page
        break
      case 500:
        // Serveur Error redirect to 500
        break
      default:
        Promise.reject(error.response)
        break
    }
  } catch (e) {
  }
  return Promise.reject(error.response)
}

const addLoadingIndicator = () => {
  document.body.classList.add('loading-indicator')
}

const removeLoadingIndicator = () => {
  document.body.classList.remove('loading-indicator')
}

init()

export {
  Axios,
  baseURL,
  init,
}
