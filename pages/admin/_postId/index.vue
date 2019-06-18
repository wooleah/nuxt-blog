<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from '~/components/Admin/AdminPostForm'
export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  data() {
    return {
      loadedPost: {
        author: 'Woojae',
        title: 'My awesome post',
        content: 'Super amazing, thanks for that',
        thumbnailLink:
          'https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg'
      }
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
