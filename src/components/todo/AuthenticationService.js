import axios from 'axios'

class AuthenticationService {

  executeBasicAuthenticationService(username, password) {
    console.log('excute')
    
    return axios.get('http://localhost:8080/basicAuth', 
    {headers: {authorization: this.createBasicAuthToken(username,password)}})
     //{headers: this.createBasicAuthToken(username, password)})
  }

  executeJwtAuthenticationService(username, password) {
    console.log('excute')
    
    return axios.post('http://localhost:8080/authenticate', 
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
    sessionStorage.setItem('authenticatedUser', username);
    this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
  }

  registerSuccessfulLoginForJwt(username, token) {
    sessionStorage.setItem('authenticatedUser', username);
    this.setupAxiosInterceptors(this.createJWTToken(token))
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
  }

  isUserLogged() {
    let user = sessionStorage.getItem('authenticatedUser');
    
    console.log('user'+user);
    if(user===null) return false;
    else return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem('authenticatedUser')
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