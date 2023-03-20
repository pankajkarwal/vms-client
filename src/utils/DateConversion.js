import moment from "moment/moment"

export const DateConversion = (actualDate, format) => {

return moment(actualDate).format(format)
}