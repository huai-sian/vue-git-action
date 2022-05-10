<template>
  <div>
    <Navbar />
    <main class="main pb-5">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default {
  name: 'Dashboard',
  components: {
    Footer,
    Navbar
  }
}
</script>