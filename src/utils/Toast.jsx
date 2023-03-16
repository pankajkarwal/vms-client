import {  toast } from 'material-react-toastify';

function Toast(message, type) {
   
  try {
    switch (type) {
      case toast.TYPE.SUCCESS:
        toast.success(message)
        break
      case toast.TYPE.INFO:
        toast.info(message)
        break
      case toast.TYPE.WARNING:
        toast.warning(message)
        break
      case toast.TYPE.ERROR:
        console.log("Error")
        toast.error(message)
        break
      case toast.TYPE.DEFAULT:
        toast.info(message)
        break
      case toast.TYPE.DARK:
        toast.dark(message)
        break
      default:
        toast.info(message)
        break
    }
    
    return true
  } catch (error) {
    return false
  }
}

export default Toast

