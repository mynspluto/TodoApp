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
    return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`)
    //console.log('executed service')
  }
}

export default new HelloWorldService()