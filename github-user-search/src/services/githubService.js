import axios from "axios";

export function fetchUserData(query) {
    const location = query
    const minRepos = query
    return axios.get(`https://api.github.com/search/users?q=${query}`)
}

