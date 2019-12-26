<template>
  <div class="home">
    Home Page
  </div>
</template>

<script>
import apiUrl from '@request/apiConfig'
export default {
  name: 'home',
  mounted () {
    this.$http({
      type: 'post',
      url: apiUrl.get_user
      // data: {
      //   user: '123'
      // }
    }).then(() => {
      // console.log('自定义get：：：', res)
    }, () => {
      // console.log('err:::', err)
    })
  }
}
</script>
<style lang="scss"  scoped>
  div {
    color: $color-grey-dim;
  }
</style>
