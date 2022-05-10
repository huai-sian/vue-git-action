<template>
  <div class="container" style="transform: translateY(10%);">
    <section class="py-4 login__form valid">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-6 col-lg-5 d-flex flex-column ">
            <div class="py-4 mb-3">
              <h2 class="fw-bold valid__title">驗證成功</h2>
            </div>
            <div class="valid__imgfr">
              <img src="../assets/images/acception.svg" alt="">
            </div>
            <p class="my-3">立即至登入頁，以繼續使用服務</p>
            <router-link to="/login" class="valid__btn btn btn-main mt-5 mx-auto">回到登入</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Valid',
  data() {
    return {
      userid: '',
      code: '',
    }
  },
  methods: {
    getParams() {
      this.userid = this.$route.query.userid;
      this.code = this.$route.query.code;
      this.code = decodeURI(this.code);
      console.log(this.code);
      const validStr = {
        userId: this.userid,
        code: this.code
      }
      console.log(validStr);
      this.$http.post('https://apiedu.drmaster.mypeoplevol.com/Member/RegisterConfirmation', validStr, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        console.log(res.data.status);

      }).catch(err => {
        console.log(err.response);
        this.$router.push('/error');
      });
    },
  },
  created() {
    this.getParams();
  }
}
</script>