class AuthenticationService {
  registerSuccessfulLogin(username, password){
    console.log('auth register')
    sessionStorage.setItem('authenticatedUser', username);

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
}

export default new AuthenticationService();