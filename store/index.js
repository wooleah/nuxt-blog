import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
        state.loadedPosts[postIndex] = editedPost;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxt-blog-b1ee4.firebaseio.com/posts.json')
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
      setPosts({
        commit
      }, posts) {
        commit('setPosts', posts)
      },
      addPost({
        commit
      }, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };
        return axios
          .post('https://nuxt-blog-b1ee4.firebaseio.com/posts.json', createdPost)
          .then(result => {
            commit('addPost', {
              ...createdPost,
              id: result.data.name
            })
          })
          .catch(err => console.log(err))
      },
      editPost({
        commit
      }, editedPost) {
        return axios
          .put(
            `https://nuxt-blog-b1ee4.firebaseio.com/posts/${editedPost.id}.json`,
            editedPost
          )
          .then(res => {
            commit('editPost', editedPost)
          })
          .catch(err => console.log(err))
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    }
  })
}

export default createStore
