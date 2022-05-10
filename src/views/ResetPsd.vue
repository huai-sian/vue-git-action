<template>
  <div class="container">
    <section class="py-4 login__form">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-6 col-lg-5 d-flex flex-column ">
            <div class="py-4">
              <router-link to='/' class="logo w-auto d-block mx-auto">
                <h2>元學堂</h2>
              </router-link>
            </div>
            <div class="card login__card">
              <div class="card-body">
                <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">重設密碼</h5>
                    <p class="text-center small login__txt mb-3">更改以下用戶的密碼：</p>
                </div>
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form class="row login__formContent" @submit.prevent="handleSubmit(resetPsd)">
                    <div class="col-12 mt-3">
                      <label for="Password" class="form-label text-start d-inline-block w-100">密碼</label>
                      <ValidationProvider rules='required|password|password2:@confirm' v-slot='{ errors , classes }'>
                        <div :class="classes" class="position-relative">
                          <input
                            name="Password"
                            class="form-control mb-1"
                            id="Password"
                            required
                            :type="showPsd ? 'text' : 'password'"
                            v-model="user.password">
                          <span class="text-danger mt-1">{{ errors[0] }}</span>
                          <i class="fas fa-eye psd_visible position-absolute"
                            @click.prevent="showPsd=true" v-if="!showPsd"></i>
                          <i class="fas fa-eye-slash psd_invisible position-absolute"
                            @click.prevent="showPsd=false" v-if="showPsd"></i>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-12 mt-3">
                      <label for="confirmPassword" class="form-label text-start d-inline-block w-100">再次確認密碼</label>
                      <ValidationProvider name="confirm" rules='required' v-slot='{ errors , classes }'>
                        <div :class="classes" class="position-relative">
                          <input
                            name="confirmPassword"
                            class="form-control mb-1"
                            id="confirmPassword"
                            required
                            :type="showConfirmPsd ? 'text' : 'password'"
                            v-model="user.confirmPassword">
                          <span class="text-danger mt-1">{{ errors[0] }}</span>
                          <i class="fas fa-eye psd_visible position-absolute"
                            @click.prevent="showConfirmPsd=true" v-if="!showConfirmPsd"></i>
                          <i class="fas fa-eye-slash psd_invisible position-absolute"
                            @click.prevent="showConfirmPsd=false" v-if="showConfirmPsd"></i>
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
    </section>
  </div>
</template>

<script>
const Swal = require('sweetalert2');

export default {
  name: 'ResetPsd',
  data() {
    return {
      user: {
        password: '',
        confirmPassword: '',
      },
      showPsd: false,
      showConfirmPsd: false,
      userid: '',
      code: '',
    }
  },
  methods: {
    resetPsd() {
      // connect to api
      this.userid = this.$route.query.userid;
      this.code = this.$route.query.code;
      this.code = decodeURI(this.code);
      console.log(this.code);
      const data = {
        code: this.code,
        userId: this.userid,
        password: this.user.password
      }
      console.log(data);
      this.$http.post('https://apiedu.drmaster.mypeoplevol.com/Member/ForgotPasswordConfirmation', data, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
      }).then(res => {
        console.log(res.data.message);
        // console.log(data);
        Swal.fire(
          '送出成功',
          `${res.data.message}`,
          'success'
        );
        this.$router.push('/login');
      }).catch(err => {
        console.log(err.response);
        Swal.fire(
          '錯誤',
          '請稍候再試',
          'info'
        );
      })
    },
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