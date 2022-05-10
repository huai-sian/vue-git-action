<template>
  <div class="basic">
    <Steps :current="step" :link="link"></Steps>
    <div class="container p-4 editCourse__container">
      <div class="row">
        <div class="col-12 col-md-8">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form class="row login__formContent" @submit.prevent="handleSubmit(save)">
              <div class="col-12 col-md-7">
                <label for="Username" class="form-label text-start d-inline-block w-100">課程標題</label>
                <ValidationProvider rules='required' v-slot='{ errors , classes }'>
                  <div :class="classes">
                    <input
                      type="text"
                      name="username"
                      v-model="title"
                      class="form-control mb-1"
                      id="Username"
                      required
                    >
                    <span class="text-danger mt-1">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="col-12 col-md-5">
                <label class="form-label text-start d-inline-block w-100">課程分類</label>
                <select class="form-select" aria-label="courses__filter" v-model="category">
                  <option value="business">商業技巧</option>
                  <option value="3D">3D繪圖</option>
                  <option value="dataAnalysis">數據分析</option>
                </select>
              </div>
              <div class="col-12 mt-3">
                <label for="desc" class="form-label text-start d-inline-block w-100">課程描述</label>
                <textarea
                  v-model="desc"
                  rows="8"
                  name="desc"
                  class="form-control mb-1"
                  required>
                </textarea>
              </div>
              <div class="col-12 my-3 d-flex align-items-center">
                <label for="bookcover" class="w-50"><span class="btn btn-main-outline mb-2 w-100" style="max-width: 20rem;">上傳書本圖片</span></label>
                <input type="file" name="bookcover" id="bookcover" class="d-none" ref="bookfiles" @change="getBookUploaded">
                <img src="../assets/images/coverImg.svg" width="160" alt="" ref="bookImg">
                <input type="hidden" v-model='bookImg'>
              </div>
              <button class="btn btn-main mt-3 w-50" style="margin-left: 12px;" @click.prevent="save">下一步</button>
            </form>
          </ValidationObserver>
        </div>
        <div class="col-12 col-md-4 mt-4 mt-md-0">
          <label for="cover" class="w-100"><span class="btn btn-main-outline mb-2 w-100" style="max-width: 20rem;">上傳課程封面圖片</span></label>
          <input type="file" name="cover" id="cover" class="d-none" ref="files" @change="getUploaded">
          <input type="hidden" v-model='coverImg'>
          <div class="card courses__card mx-auto"
            style="max-width: 20rem;min-height: 300px;"
          >
            <div class="courses__cover" ref="img">

            </div>
            <div class="card-body text-start py-4">
              <h5 class="card-title courses__card-title fw-bold" style="min-height: 30px;">{{ title }}</h5>
              <div class="d-flex align-items-end mb-2">
                <div class="courses__rating me-2">
                  <i class="fas fa-star courses__rating__star"></i>
                  <i class="fas fa-star courses__rating__star"></i>
                  <i class="fas fa-star courses__rating__star"></i>
                  <i class="fas fa-star courses__rating__star"></i>
                  <i class="fas fa-star courses__rating__star"></i>
                </div>
                <span class="card-subtitle text-muted d-inline-block"><small>0</small> 則評價</span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span href="#" class="card-subtitle text-muted"><small>0</small> 位學生</span>
                <strong class="text-right courses__card-price">NT$ <span>0</span></strong>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Steps from '../components/Steps'
const Swal = require('sweetalert2');

export default {
  name: 'EditCourse',
  components: {
    Steps,
  },
  data() {
    return {
      title: '',
      step: 1,
      link: '/dashboard/edit_course/basic',
      category: '',
      desc: '',
      bookImg: '',
      coverImg: '',
    }
  },
  methods: {
    save() {
      const vm = this;
      vm.$router.push('/dashboard/edit_course/syllabus');
    },
    getUploaded(e) {
      // this.$refs.img.style.backgroundImage = `url(${URL.createObjectURL(this.$refs.files.files[0])})`;
      const uploadedFile = this.$refs.files.files[0];
      console.log(uploadedFile);
      const vm = this;
      const formData = new FormData();
      formData.append('upload', uploadedFile);
      this.$http.post('http://imgsvredu.drmaster.mypeoplevol.com/Course', formData)
      .then((response) => {
        console.log(response.data);
        vm.$refs.img.style.backgroundImage = `url(${response.data.url})`;
      }).catch(err => {
        this.$router.push('/error');
        console.log(err.response);
      })
    },
    getBookUploaded() {
      // this.$refs.img.style.backgroundImage = `url(${URL.createObjectURL(this.$refs.files.files[0])})`;
      const uploadedFile = this.$refs.bookfiles.files[0];
      console.log(uploadedFile);
      const vm = this;
      const formData = new FormData();
      formData.append('upload', uploadedFile);
      this.$http.post('http://imgsvredu.drmaster.mypeoplevol.com/CourseBook', formData)
      .then((response) => {
        console.log(response.data);
        vm.$refs.bookImg.src = `${response.data.url}`;
      }).catch(err => {
        this.$router.push('/error');
        console.log(err.response);
      })
    },
  },
  beforeRouteLeave (to, from, next) {
    const vm = this
    // Swal.fire(
    //   '',
    //   '提醒您，上架課程將不會暫存您的變更，需完成至第四步驟完成發布，本系統即會儲存並發布您的課程。',
    //   'info'
    // ).then((res) => {
    //     vm.$router.push('/dashboard/edit_course/pricing');
    // });
    Swal.fire({
      title: '',
      text: "提醒您，上架課程將不會暫存您的變更，需完成至第四步驟完成發布，本系統即會儲存並發布您的課程。",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '繼續'
    }).then((result) => {
      if (result.isConfirmed) {
        next();
      }
    })
  },
  mounted() {
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "你還沒有完成你的文章，就這樣離開了嗎？";

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage;                            //Webkit, Safari, Chrome
    });
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