<template>
  <div id="app">
    <Loading :active.sync="isLoading" :opacity="0.95">
      <template slot="default">
        <img src="./assets/images/loader.gif">
      </template>
    </Loading>
    <router-view/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>

<style lang="scss">
@import "./assets/all";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
