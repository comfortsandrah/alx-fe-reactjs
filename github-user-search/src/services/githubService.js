import axios from "axios";

export function fetchUserData(query) {
    console.log(query)
    return axios.get(`https://api.github.com/search/users?q=${query}`)

}

