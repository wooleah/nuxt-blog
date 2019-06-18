<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted"/>
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
  methods: {
    onSubmitted(formData) {
      this.$store.dispatch('addPost', formData).then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>


<style scoped lang="scss">
.new-post-form {
  width: 90%;
  margin: 20px auto;
  @media (min-width: 768px) {
    width: 500px;
  }
}
</style>
