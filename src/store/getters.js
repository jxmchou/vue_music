export default {
  getToken (state) {
    return state.loginData.token || ''
  }
}