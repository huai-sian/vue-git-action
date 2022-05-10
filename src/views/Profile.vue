<template>
  <div>
    <Breadcrumb activePage="個人資料" />
    <div class="profile">
      <div class="row">
        <div class="col-md-4 mb-4 mb-md-0">
          <div class="card">
            <div class="card-body profile-card pt-4 d-flex flex-column align-items-center profile__card">
              <img :src="Avatar" alt="Profile" class="rounded-circle" ref="roundImg">
              <h2 class="mt-2 profile__name">{{ user.userName }}</h2>
              <h3 class="mt-2 profile__identity">{{ user.status }}</h3>
              <div class="social-links mt-2">
                <a v-if="user.link === 'NotSet'" class="twitter" href=""><i class="fas fa-link"></i></a>
                <a v-else :href="user.link" class="twitter"><i class="fas fa-link"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card profile__card">
            <div class="card-body pt-3">
              <ul class="nav nav-tabs nav-tabs-bordered tablist">
                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">概覽</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">編輯</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">設定</button>
                </li>

                <li class="nav-item" v-if="LoginProvider == 'password'">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">更改密碼</button>
                </li>
  
              </ul>
              <div class="tab-content pt-2">
                <div class="tab-pane fade show active profile-overview" id="profile-overview">
                  <h5 class="card-title text-start">個人資料</h5>

                  <div class="row mb-4">
                    <div class="col-lg-3 col-md-4 label mb-2 mb-md-0">使用者名稱</div>
                    <div class="col-lg-9 col-md-8 text-start">{{ user.userName }}</div>
                  </div>

                  <div class="row mb-4">
                    <div class="col-lg-3 col-md-4 label mb-2 mb-md-0">身份</div>
                    <div class="col-lg-9 col-md-8 text-start">{{ user.status }}</div>
                  </div>

                  <div class="row mb-4">
                    <div class="col-lg-3 col-md-4 label mb-2 mb-md-0">Email</div>
                    <div class="col-lg-9 col-md-8 text-start">{{ user.email }}</div>
                  </div>

                </div>

                  <div class="tab-pane fade profile-edit pt-3" id="profile-edit">

                    <form>
                      <div class="row mb-3">
                        <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">圖片</label>
                        <div class="col-md-8 col-lg-9">
                          <img src="../assets/images/profile-img.jpg" alt="Profile" ref="img">
                          <div class="pt-2">
                            <input type="file" id="customFile" class="form-control d-none"
                              ref="files" @change="uploadFile">
                            <label for="customFile" class="btn btn-main btn-sm me-1">
                              <i class="fas fa-spinner fa-spin" v-if="fileUploading=='loading'"></i>
                              <i class="fas fa-upload" v-if="fileUploading=='done'"></i>
                              <i class="far fa-times-circle" v-if="fileUploading=='fail'"></i>
                              </label>
                            <a class="btn btn-danger btn-sm ms-1" title="Remove my profile image" @click.prevent="deleteFile"><i class="far fa-trash-alt"></i></a>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="fullName" class="col-md-4 col-lg-3 col-form-label">使用者名稱</label>
                        <div class="col-md-8 col-lg-9">
                          <input name="fullName" type="text" class="form-control" id="fullName" v-model="user.userName">
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="about" class="col-md-4 col-lg-3 col-form-label">身份</label>
                        <div class="col-md-8 col-lg-9">
                          <input name="about" class="form-control" id="about" v-model="user.status">
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="company" class="col-md-4 col-lg-3 col-form-label">Email</label>
                        <div class="col-md-8 col-lg-9">
                          <input name="company" type="email" class="form-control" id="company" v-model="user.email">
                        </div>
                      </div>
                    
                      <div class="row mb-3">
                        <label for="Twitter" class="col-md-4 col-lg-3 col-form-label">相關連結</label>
                        <div class="col-md-8 col-lg-9">
                          <input name="twitter" type="text" class="form-control" id="Twitter" v-model="user.link">
                        </div>
                      </div>

                      <div class="text-center">
                        <button type="submit" class="btn btn-main">儲存變更</button>
                      </div>
                    </form>
                  </div>

                  <div class="tab-pane fade pt-3 profile-settings" id="profile-settings">

                    <form>

                      <div class="row mb-3">
                        <label for="fullName" class="col-md-4 col-lg-3 col-form-label text-start">Email 通知設定</label>
                        <div class="col-md-8 col-lg-9">
                          <!-- <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="changesMade" v-model="user.getNotice">
                            <label class="form-check-label w-100 text-start mt-1" for="changesMade">
                              系統變更通知
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="newProducts" v-model="user.getNotice">
                            <label class="form-check-label w-100 text-start mt-1" for="newProducts">
                              訊息通知
                            </label>
                          </div> -->
                        </div>
                      </div>

                      <div class="text-center">
                        <button type="submit" class="btn btn-main">儲存變更</button>
                      </div>
                    </form>

                  </div>

                  <div class="tab-pane fade pt-3 profile-change-password" id="profile-change-password" v-if="LoginProvider == 'password'">
                    <ValidationObserver v-slot="{ handleSubmit }">
                      <form @submit.prevent="handleSubmit(changePsd)">
                        <div class="row mb-3">
                          <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label text-start">舊密碼</label>
                          <div class="col-md-8 col-lg-9">
                            <ValidationProvider rules='required|password' v-slot='{ errors , classes }'>
                              <div :class="classes" class="position-relative">
                                <input
                                  name="password"
                                  class="form-control mb-1"
                                  id="currentPassword"
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
                        </div>

                        <div class="row mb-3">
                          <label for="newPassword" class="col-md-4 col-lg-3 col-form-label text-start">新密碼</label>
                          <div class="col-md-8 col-lg-9">
                            <ValidationProvider rules='required|password|password2:@confirm' v-slot='{ errors , classes }'>
                              <div :class="classes" class="position-relative">
                                <input
                                  name="newpassword"
                                  class="form-control mb-1"
                                  id="newPassword"
                                  required
                                  v-model="newPsd"
                                  :type="showNewPsd ? 'text' : 'password'"
                                  placeholder="6位以上 | 含大小寫字母及數字">
                                <span class="text-danger mt-1">{{ errors[0] }}</span>
                                <i class="fas fa-eye psd_visible position-absolute"
                                  @click.prevent="showNewPsd=true" v-if="!showNewPsd"></i>
                                <i class="fas fa-eye-slash psd_invisible position-absolute"
                                  @click.prevent="showNewPsd=false" v-if="showNewPsd"></i>
                              </div>
                            </ValidationProvider>
                          </div>
                        </div>

                        <div class="row mb-3">
                          <label for="confirmPassword" class="col-md-4 col-lg-3 col-form-label text-start">確認密碼</label>
                          <div class="col-md-8 col-lg-9">
                            <ValidationProvider name="confirm" rules='required' v-slot='{ errors , classes }'>
                              <div :class="classes" class="position-relative">
                                <input
                                  name="confirmPassword"
                                  class="form-control mb-1"
                                  id="confirmPassword"
                                  required
                                  :type="showConfirmPsd ? 'text' : 'password'"
                                  v-model="confirmPsd"
                                  placeholder="6位以上 | 含大小寫字母及數字">
                                <span class="text-danger mt-1">{{ errors[0] }}</span>
                                <i class="fas fa-eye psd_visible position-absolute"
                                  @click.prevent="showConfirmPsd=true" v-if="!showConfirmPsd"></i>
                                <i class="fas fa-eye-slash psd_invisible position-absolute"
                                  @click.prevent="showConfirmPsd=false" v-if="showConfirmPsd"></i>
                              </div>
                            </ValidationProvider>
                          </div>
                        </div>

                        <div class="text-center">
                          <button type="submit" class="btn btn-main">儲存變更</button>
                        </div>
                      </form>
                    </ValidationObserver>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Profile',
  components: {
    Breadcrumb,
  },
  data() {
    return {
      user: {
        userName: 'Kevin Anderson',
        status: '教師',
        email: 'k.anderson@example.com',
        link: 'https://twitter.com/#',
        password: '',
        getNotice: true,
      },
      newPsd: '',
      confirmPsd: '',
      showPsd: false,
      showNewPsd: false,
      showConfirmPsd: false,
      fileUploading: 'done'
    }
  },
  methods: {
    changePsd() {
      let data = {
        OldPassword: this.user.password,
        NewPassword: this.newPsd
      }
      this.$http.post('https://apiedu.drmaster.mypeoplevol.com/Member/ChangePassword', data, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${this.userAuth}`
        },
      }).then(res => {
        console.log(res.data);
        
      }).catch(err => {
        this.$router.push('/error');
        console.log(err.response);
      })
    },
    getUser() {
      const vm = this;
      vm.$http.get('https://apiedu.drmaster.mypeoplevol.com/Member/Profile', {
        headers: {
          'Accept': '*/*',
          'Authorization': `bearer ${vm.userAuth}`
        },
      }).then(res => {
        vm.user.userName = res.data.data.userName;
        vm.user.email = res.data.data.email;
        vm.user.link = res.data.data.relatedLink;
        vm.user.status = res.data.data.roles[0];
      }).catch(err => {
        //this.$router.push('/error');
        console.log(err.response);
      })
    },
    updateUser() {

    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      console.log(uploadedFile);
      const vm = this;
      const formData = new FormData();
      formData.append('upload', uploadedFile);
      vm.fileUploading = 'loading';
      vm.$http.post('http://imgsvredu.drmaster.mypeoplevol.com/Avatar', formData)
      .then((response) => {
        console.log(response.data);
        vm.$refs.img.src = `${response.data.url}`;
        vm.$refs.roundImg.src = `${response.data.url}`;
        vm.fileUploading = 'done';
      }).catch(err => {
         vm.fileUploading = 'fail';
        console.log(err.response);
      })
    },
    deleteFile() {
      
    },
    ...mapActions(['getUserAuth', 'getUserAuthFromLocal', 'checkExpAuth'])
  },
  computed: {
    ...mapGetters(['userName', 'Avatar', 'userId', 'role', 'exp', 'userAuth', 'LoginProvider'])
  },
  created() {
    this.getUserAuthFromLocal();
    this.checkExpAuth();
    this.getUser();
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