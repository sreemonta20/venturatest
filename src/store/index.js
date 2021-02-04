export const getters = {
  isAuthenticated(state) {
    debugger
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    debugger
    return state.auth.user
  },
  userToken(state){
    return state.auth.user.token
  }
}
