<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light fixed-top">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <h2>元學堂</h2>
        </router-link>

        <button class="navbar-toggler me-auto d-sm-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <li class="nav-item d-flex d-sm-none" v-if="!userName">
          <router-link class="nav-link px-0" to="/login" style="color: rgba(0, 0, 0, 0.55);">登入 / 註冊</router-link>
        </li> 
        <li class="nav-item dropdown d-flex align-items-center d-sm-none" v-if="userName">
          <a class="nav-link dropdown-toggle nav-profile p-0" href="#" id="navbarDropdown-profile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="Avatar" alt="Profile" class="rounded-circle navbar__photo">
            <span class="d-none d-md-block ps-2 fw-bold">{{ userName }}</span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown-profile">
            <li class="dropdown-header text-center mb-2">
              <h6 class="fw-bold mb-2" style="font-size: 20px;">{{ userName }}</h6>
              <span>{{ role }}</span>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><router-link class="dropdown-item" to="/dashboard/profile">個人資料</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><router-link class="dropdown-item" to="/dashboard/notifications">主控台</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><router-link class="dropdown-item" to="/dashboard/courses">課程</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><router-link class="dropdown-item" to="/login">登出</router-link></li>
          </ul>
        </li>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" style="flex-grow: unset;">
          <ul class="navbar-nav me-auto mb-0 mb-lg-0 py-3 d-sm-none">
            <li class="nav-item ps-3">
              <router-link to="/all_courses" class="nav-link text-start" aria-current="page" href="#">所有課程</router-link>
            </li>
          </ul>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" >
          <div class="me-auto d-none d-sm-block">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/all_courses" class="nav-link" aria-current="page">所有課程</router-link>
              </li>
            </ul>
          </div>
          <div class="ms-auto d-none d-sm-block">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item" v-if="!userName">
                <router-link class="nav-link" to="/login">登入 / 註冊</router-link>
              </li> 
              <li class="nav-item dropdown" v-if="userName">
                <a class="nav-link dropdown-toggle nav-profile d-flex align-items-center pe-0" href="#" id="navbarDropdown-profile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img :src="Avatar" alt="Profile" class="rounded-circle navbar__photo">
                  <span class="d-none d-sm-block ps-2 fw-bold">{{ userName }}</span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown-profile">
                  <li class="dropdown-header text-center mb-2">
                    <h6 class="fw-bold mb-2" style="font-size: 20px;">{{ userName }}</h6>
                    <span>{{ role }}</span>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <router-link class="dropdown-item" to="/dashboard/profile">
                      <i class="far fa-user"></i>
                      個人資料
                    </router-link>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <router-link class="dropdown-item" to="/dashboard/notifications">
                      <!-- <i class="far fa-cog"></i> -->
                      主控台
                    </router-link>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <router-link class="dropdown-item" to="/dashboard/courses">
                      <!-- <i class="fa-regular fa-book"></i> -->
                      課程
                    </router-link>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <router-link class="dropdown-item" to="/login">
                      <i class="fas fa-sign-out"></i>
                      登出
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {

    }
  },
  methods: {
    checkExp() {
      if(this.exp < Math.round(new Date().getTime()/1000)) {
        this.removeUser();
      }
    },
    ...mapActions(['getUserFromLocal', 'removeUser'])
  },
  created() {
    this.getUserFromLocal();
    this.checkExp();
    console.log(this.userName);
  },
  computed: {
    ...mapGetters(['userName', 'Avatar', 'userId', 'role', 'exp'])
  }
}
</script>