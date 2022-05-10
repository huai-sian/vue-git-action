<template>
  <div>
    <Navbar />
    <main class="main-layout pb-5">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default {
  name: 'Layout',
  components: {
    Footer,
    Navbar
  }
}
</script>