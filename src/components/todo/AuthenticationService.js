import axios from 'axios'

class AuthenticationService {
  registerSuccessfulLogin(username, password){
    console.log('auth register')
    sessionStorage.setItem('authenticatedUser', username);
    this.setupAxiosInterceptors()
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
  
  setupAxiosInterceptors() {
    console.log('setupAxios')
    let username = 'user'
    let password = 'password'

    let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

    axios.interceptors.request.use(
      (config) => {
        if(this.isUserLogged()) {
          //console.log('login 됨')
          config.headers.authorization = basicAuthHeader
        }               
        
        return config
      }
    ); 
  }
}

export default new AuthenticationService();