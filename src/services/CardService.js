import { Axios } from "../lib/axios"

export {
loadCards
}
const loadCards =() => {
  return Axios.get("https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed")
}