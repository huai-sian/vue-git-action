<template>
  <div class="container">
    <section class="py-4 login__form valid">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-6 col-lg-5 d-flex flex-column ">
            <div class="py-4 mb-3">
              <h2 class="fw-bold valid__title mb-3">Oops! 發生錯誤</h2>
              <p class="mb-2">將在{{ sec }}秒後自動跳回首頁</p>
              <p>請稍後再試</p>
            </div>
            <div class="valid__imgfr">
              <img src="../assets/images/empty.svg" alt="">
            </div>
            <router-link to="/" class="valid__btn btn btn-main mt-5 mx-auto">回到首頁</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data() {
    return {
      sec: 5,
      countInterval: '',
    }
  },
  methods: {
    countDown() {
      const vm = this;
      vm.countInterval = setInterval(() => {
        vm.sec -= 1;
        if(vm.sec <= 0) {
          vm.sec = 0;
          this.$router.push('/');
        }
      }, 1000)
    }
  },
  created() {
    this.countDown();
  },
  destroyed() {
    clearInterval(this.countInterval);
  }
}
</script>