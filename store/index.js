import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        )
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get(process.env.dbBaseUrl + '/posts.json')
          .then(res => {
            const postsArr = []
            for (const key in res.data) {
              postsArr.push({
                ...res.data[key],
                id: key
              })
            }
            vuexContext.commit('setPosts', postsArr)
          })
          .catch(err => console.error(err))
      },
      setPosts({ commit }, posts) {
        commit('setPosts', posts)
      },
      addPost({ commit, state }, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return axios
          .post(
            `https://nuxt-blog-b1ee4.firebaseio.com/posts.json?auth=${state.token}`,
            createdPost
          )
          .then(result => {
            commit('addPost', {
              ...createdPost,
              id: result.data.name
            })
          })
          .catch(err => console.log(err))
      },
      editPost({ commit, state }, editedPost) {
        return axios
          .put(
            `https://nuxt-blog-b1ee4.firebaseio.com/posts/${editedPost.id}.json?auth=${state.token}`,
            editedPost
          )
          .then(res => {
            commit('editPost', editedPost)
          })
          .catch(err => console.log(err))
      },
      authenticateUser({ commit, dispatch }, authData) {
        let authUrl =
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
          process.env.fbAPIKey
        if (!authData.isLogin) {
          authUrl =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
            process.env.fbAPIKey
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            const token = result.idToken
            const expirationTime =
              new Date().getTime() + result.expiresIn * 1000
            commit('setToken', token)
            localStorage.setItem('token', token)
            localStorage.setItem('tokenExpiration', expirationTime)
            Cookie.set('jwt', token)
            Cookie.set('expirationDate', expirationTime)
            dispatch('setLogoutTimer', result.expiresIn * 1000)
          })
          .catch(err => console.log(err))
      },
      setLogoutTimer({ commit }, duration) {
        setTimeout(() => {
          commit('clearToken')
        }, duration)
      },
      initAuth({ commit, dispatch }, req) {
        let token = ''
        let expirationDate = ''
        // get token and expirationDate
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        // check expirationDate
        if (new Date().getTime() > expirationDate || !token) {
          return
        }
        // set token and logoutTimer
        commit('setToken', token)
        dispatch('setLogoutTimer', expirationDate - new Date().getTime())
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}

export default createStore
