import axios from 'axios'
import {API_URL} from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
class AuthenticationService {

  executeBasicAuthenticationService(username, password) {
    console.log('excute')
    
    return axios.get(`${API_URL}/basicAuth`, 
    {headers: {authorization: this.createBasicAuthToken(username,password)}})
     //{headers: this.createBasicAuthToken(username, password)})
  }

  executeJwtAuthenticationService(username, password) {
    console.log('excute')
    
    return axios.post(`${API_URL}/authenticate`, 
      {
        username,
        password 
      }
    )
    
  }

  createBasicAuthToken(username, password) {
    console.log('createtoken')
    console.log(username + password)
    return 'Basic ' + window.btoa(username + ":" + password)
    
  }

  createJWTToken(token) {
    return 'Bearer ' + token
  }

  registerSuccessfulLogin(username, password){
    //console.log('auth register')
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
  }

  registerSuccessfulLoginForJwt(username, token) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptors(this.createJWTToken(token))
  }

  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLogged() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    
    console.log('user'+user);
    if(user===null) return false;
    else return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    if(user===null) return ''
    return user
  }
  
  setupAxiosInterceptors(token) {
    console.log('setupAxios')

    axios.interceptors.request.use(
      (config) => {
        if(this.isUserLogged()) {
          //console.log('login 됨')
          config.headers.authorization = token
        }               
        
        return config
      }
    ); 
  }
}

export default new AuthenticationService();