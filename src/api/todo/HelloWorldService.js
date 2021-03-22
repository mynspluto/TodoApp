import axios from "axios"

class HelloWorldService {
  executedHelloWorldService() {
    return axios.get('http://localhost:8080/hello-world')
    //console.log('executed service')
  }
  executedHelloWorldBeanService() {
    return axios.get('http://localhost:8080/hello-world-bean')
    //console.log('executed service')
  }
  executedHelloWorldPathVariableService(name) {

    let username = 'user'
    let password = 'password'

    let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
    return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`,
      {
        headers: {
          authorization: basicAuthHeader
        }
      }
    );
    //console.log('executed service')
  }
}

export default new HelloWorldService()