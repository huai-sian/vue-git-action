<template>
  <div class="container">
    <section class="py-4 login__form">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-6 col-lg-5 d-flex flex-column ">
            <div class="py-4">
              <router-link to="/" class="logo w-auto d-block mx-auto">
                <h2>元學堂</h2>
              </router-link>
            </div>
            <div class="card login__card">
              <div class="card-body">
                <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">忘記密碼</h5>
                    <p class="text-center small login__txt mb-3">
                      系統會將驗證信碼寄到您的信箱中。<br
                      >
                      確認送出後再請留意收取唷!
                    </p>
                </div>
                <div v-if="!isSent">
                  <ValidationObserver v-slot="{ handleSubmit }" >
                    <form class="row login__formContent" @submit.prevent="handleSubmit(send)">
                      <div class="col-12 mt-3">
                        <label for="Email" class="form-label text-start d-inline-block w-100">Email</label>
                        <ValidationProvider rules='email' v-slot='{ errors , classes }'>
                          <div :class="classes">
                            <input
                              type="email"
                              name="Email"
                              class="form-control mb-1"
                              id="Email"
                              required
                              v-model="email">
                            <span class="text-danger mt-1">{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </div>
                      <div class="col-12 mt-3">
                        <button class="btn btn-main w-100" type="submit">送出</button>
                      </div>
                    </form>
                  </ValidationObserver>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const Swal = require('sweetalert2');

export default {
  name: 'ForgetPsd',
  data() {
    return {
      email: '',
      isSent: false,
    }
  },
  methods: {
    send() {
      const data = { email: this.email };
      // connect to api
      this.$http.post('https://apiedu.drmaster.mypeoplevol.com/Member/ForgotPassword', data, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
      }).then(res => {
        console.log(res.data);
        // console.log(data);
        Swal.fire(
        '送出成功',
        '系統已將驗證信寄到您的信箱中。',
        'success'
      );
      }).catch(err => {
        Swal.fire(
          '錯誤',
          '請稍候再試',
          'info'
        );
        console.log(err.response);
      })
      this.email = '';
      this.isSent = true;
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
  .invalid .text-danger {
    text-align: left;
    width: 100%;
    display: block;
    font-size: 12px;
  }

  .invalid input {
    border: 1px #EB0600 solid;
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(252, 67, 21, 0.25);
    }
  }
</style>