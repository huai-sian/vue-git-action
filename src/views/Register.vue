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
                    <h5 class="card-title text-center pb-0 fs-4">註冊帳號</h5>
                    <p class="text-center small login__txt mb-3">歡迎您來註冊本學院，請先填寫以下欄位資訊，填寫完成後送出申請本學院會盡快為您審核。</p>
                </div>
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form class="row login__formContent" @submit.prevent="handleSubmit(register)">
                    <div class="col-12 mt-3">
                      <label for="Username" class="form-label text-start d-inline-block w-100">使用者名稱</label>
                      <ValidationProvider rules='required|username' v-slot='{ errors , classes }'>
                        <div :class="classes">
                          <input
                            type="text"
                            name="username"
                            class="form-control mb-1"
                            id="Username"
                            required
                            v-model="user.username">
                          <span class="text-danger mt-1">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
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
                            v-model="user.email">
                          <span class="text-danger mt-1">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-12 mt-3">
                      <label for="Password" class="form-label text-start d-inline-block w-100">密碼</label>
                      <ValidationProvider rules='required|password|password2:@confirm' v-slot='{ errors , classes }'>
                        <div :class="classes" class="position-relative">
                          <input
                            name="Password"
                            class="form-control mb-1"
                            id="Password"
                            required
                            v-model="user.password"
                            :type="showPsd ? 'text' : 'password'"
                            placeholder="6位以上 | 含大小寫字母及數字">
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
                      <button class="btn btn-main w-100" type="submit">註冊</button>
                    </div>
                    <div class="col-12 mt-3">
                        <p class="small mb-0">已經有帳號？
                        <router-link to="/login" style="color: #012970;">登入</router-link></p>
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
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      user: {
          username: '',
          password: '',
          confirmPassword: '',
          email: ''
      },
      showPsd: false,
      showConfirmPsd: false,
    }
  },
  methods: {
    register() {
      // connect to api
      const user = {
        userName: this.user.username,
        password: this.user.password,
        email: this.user.email,
      }
      this.updateLoading(true);
      console.log(user);
      this.$http.post('https://apiedu.drmaster.mypeoplevol.com/Member/Register', user, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        console.log(res.data);
        Swal.fire(
          '註冊完成',
          `${res.data.message}`,
          'success'
        );
        this.updateLoading(false);
        // push to login page
        this.$router.push('/login');
    
      }).catch(err => {
        if(err.response) {
          console.log(err.response.status);
          console.log(err.response);
          if(err.response.status == 400) {
            let errorArr = Object.values(err.response.data.errors);
            let errorStr = '';
            errorStr.forEach(el => {
              errorStr += `${el}`;
            });
            Swal.fire(
              '',
              `${errorStr}`,
              'info'
            );
          }
          if(err.response.status == 409) {
            Swal.fire(
              '',
              `${err.response.data.message}`,
              'info'
            );
          }
        } else {
          Swal.fire(
            '錯誤',
            '請稍候再試',
            'info'
          );
        }
        
      });
    },
    ...mapActions(['updateLoading'])
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