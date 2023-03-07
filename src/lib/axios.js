import axios from 'axios'

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

        break
      case 401:
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
