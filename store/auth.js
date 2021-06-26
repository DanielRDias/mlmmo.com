import { Auth } from 'aws-amplify'

export const state = () => ({
  isAuthenticated: false,
  user: null,
})

export const getters = {
  user: (state) => state.user,
}

export const mutations = {
  setUser(state, payload) {
    state.isAuthenticated = !!payload
    state.user = payload
  },
}

export const actions = {
  async load({ commit }) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      commit('setUser', user)
      return user
    } catch (error) {
      commit('setUser', null)
    }
  },
  async authAction({ commit }) {
    const userInfo = await Auth.currentUserInfo()
    commit('setUser', userInfo)
  },

  async logout({ commit }) {
    await Auth.signOut()
    commit('setUser', null)
  },

  async login({ commit }, { username, password }) {
    try {
      const user = await Auth.signIn({
        username,
        password,
      })
      commit('setUser', user)
      return Promise.resolve(user)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async confirmSignUp(_, { username, code }) {
    try {
      const result = await Auth.confirmSignUp(username, code)
      return Promise.resolve(result)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  },

  async signUp(_, { username, password, email }) {
    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      })
      return Promise.resolve(user)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  },

  async userGroups() {
    try {
      const authUser = await Auth.currentAuthenticatedUser()
      // the array of groups that the user belongs to
      const userGroups =
        authUser.signInUserSession.accessToken.payload['cognito:groups']

      if (Array.isArray(userGroups)) {
        return userGroups
      } else {
        return []
      }
      return userGroups
    } catch (error) {
      return error
    }
  },
}
