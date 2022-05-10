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
                    <h5 class="card-title text-center pb-0 fs-4">登入</h5>
                    <p class="text-center small login__txt mb-3">
                      歡迎您來到本學院。
                    </p>
                </div>
                <ValidationObserver v-slot="{ handleSubmit }" >
                  <form class="row login__formContent" @submit.prevent="handleSubmit(login)">
                    <div class="col-12 mt-3">
                      <label for="Username" class="form-label text-start d-inline-block w-100">使用者名稱</label>
                      <ValidationProvider rules='required|username' v-slot='{ errors , classes }'>
                        <div :class="classes">
                          <input 
                            type="text"
                            name="username"
                            class="form-control"
                            id="Username"
                            required
                            v-model="user.username">
                          <span class="text-danger mt-1">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-12 mt-3">
                      <label for="Password" class="form-label text-start d-inline-block w-100">密碼</label>
                      <ValidationProvider rules='password' v-slot='{ errors , classes }'>
                        <div :class="classes" class="position-relative">
                          <input
                            name="Password"
                            class="form-control"
                            id="Password"
                            required
                            v-model="user.password"
                            :type="showPsd ? 'text' : 'password'">
                          <span class="text-danger mt-1">{{ errors[0] }}</span>
                          <i class="fas fa-eye psd_visible position-absolute"
                            @click.prevent="showPsd=true" v-if="!showPsd"></i>
                          <i class="fas fa-eye-slash psd_invisible position-absolute"
                            @click.prevent="showPsd=false" v-if="showPsd"></i>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-12 mt-3 d-flex">
                      <input class="form-check-input me-2" type="checkbox" value="" id="rememberMe" v-model="rememberMe" @change="toggleRemember">
                      <label class="form-check-label mt-1" for="rememberMe">
                        記住我
                      </label>
                    </div>
                    <div class="col-12 mt-3">
                      <button class="btn btn-main w-100" type="submit">登入</button>
                    </div>
                    <div class="col-12 mt-3">
                        <p class="small mb-0">還沒有帳號？
                          <router-link to="/register" style="color: #012970;">註冊</router-link> | 
                          <router-link to="/forgetPsd" style="color: #012970;">忘記密碼</router-link>
                          </p>
                      </div>
                  </form>
                </ValidationObserver>
                <GoogleSignInButton  class="mt-3"/>
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
import jwt from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import { decode } from 'punycode';
import { mapActions } from 'vuex';
import GoogleSignInButton from '../components/GoogleSigninButton'

export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      rememberMe: false,
      showPsd: false,
      }
  },
  components: {
    GoogleSignInButton
  },
  methods: {
    toggleRemember() {
      localStorage.setItem('rememberMe', this.rememberMe);
      if(this.rememberMe) {
        localStorage.setItem('DrUsername', this.user.username);
      }
    },
    login() {
      // connect to api
      this.updateLoading(true);
      const user = {
        UserName: this.user.username,
        Password: this.user.password,
      }
      console.log(user);
      this.$http.post('https://apiedu.drmaster.mypeoplevol.com/Member/Login', user, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        console.log(res.data);
        let decoded = jwtDecode(res.data.data.jwtToken);
        
        console.log(decoded);
        this.$store.dispatch('getUser', decoded);
        this.$store.dispatch('getUserAuth', res.data.data.jwtToken);
        this.updateLoading(false);
        Swal.fire(
          '登入成功',
          '',
          'success'
        );
        // push to login page
        // 1650980606
        this.$router.push('/');
    
      }).catch(err => {
        console.log(err);
        if(err.response) {
          this.updateLoading(false);
          console.log(err.response.status);
          console.log(err.response);
          if(err.response.status == 400) {
            Swal.fire(
              '',
              `${err.response.data.message}`,
              'info'
            );
          }
        } else {
          this.updateLoading(false);
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
    this.rememberMe = localStorage.getItem('rememberMe') || false;
    if(this.rememberMe) {
      this.user.username = localStorage.getItem('DrUsername')
    }
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