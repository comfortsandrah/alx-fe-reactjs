import axios from "axios";

export function fetchUserData(query) {
    console.log(query)
    const location = query
    const minRepos = query
    return axios.get(`https://api.github.com/search/users?q=${query}`)
}

