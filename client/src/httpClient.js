import axios from 'axios'
import jwtDecode from 'jwt-decode'

const httpClient = axios.create()

httpClient.getToken = function() {
    return localStorage.getItem('token')
}

httpClient.setToken = function(token) {
    localStorage.setItem('token', token)
    return token
}

httpClient.getCurrentUser = function() {
    const token = this.getToken()
    console.log(token)
    if(token) return jwtDecode(token)
    return null
}

httpClient.login = function(credentials) {
    return this({ method: 'post', url: '/api/users/authenticate', data: credentials })
        .then((serverResponse) => {
            const token = serverResponse.data.token
            if(token) {
                this.defaults.headers.common.token = this.setToken(token)
                return jwtDecode(token)
            } else {
                return false
            }
        })
}

httpClient.signUp = function(userInfo) {
    return this({ method: 'post', url: 'api/users', data: userInfo })
        .then((serverResponse) => {
            const token = serverResponse.data.token
            if(token) {
                this.defaults.headers.common.token = this.setToken(token)
                return jwtDecode(token)
            } else {
                return false
            }
        })
}

httpClient.logOut = function() {
    localStorage.removeItem('token')
    delete this.defaults.headers.common.token
    return true
}

httpClient.getPosts = function() {
    return this({ method: 'get', url: '/api/posts' })
}

httpClient.createPost = function(postInfo) {
    return this({ method: 'post', url: '/api/posts', data: postInfo })

}

httpClient.defaults.headers.common.token = httpClient.getToken()

export default httpClient