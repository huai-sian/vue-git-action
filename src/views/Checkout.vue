<template>
  <div class="checkout">
    <div class="container p-4 checkout__container text-start">
      <div class="row">
        <div class="col-12">
          <h3>購買成功 - 訂單明細</h3>
          <hr>
          <div>
            <h3>課程名稱：</h3>
            <strong>1SOLIDWORKS零件與組合件培訓教材</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Checkout',
  data() {
    return {
      courseData: [],
      cid: ''
    }
  },
  method: {
    checkout() {
      const vm = this;
      vm.$http.post('https://apiedu.drmaster.mypeoplevol.com/Course/All', query, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization':`bearer ${this.userAuth}`
        },
      }).then((res) => {
        
      }).catch((err) => {
        console.log(err);
      })
    },
    ...mapGetters(['userName', 'Avatar', 'userId', 'role', 'exp', 'userAuth', 'LoginProvider'])
  },
  created() {
    this.cid = this.$route.params.id;
  }
}
</script>