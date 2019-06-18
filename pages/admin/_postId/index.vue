<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from '~/components/Admin/AdminPostForm'
import axios from 'axios'
export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  asyncData(context) {
    return axios
      .get(
        `https://nuxt-blog-b1ee4.firebaseio.com/posts/${context.params.postId}.json`
      )
      .then(res => {
        return { loadedPost: { ...res.data, id: context.params.postId } }
      })
      .catch(err => context.error(err))
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch('editPost', editedPost).then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.update-form {
  width: 90%;
  margin: 20px auto;
  @media (min-width: 768px) {
    width: 500px;
  }
}
</style>
