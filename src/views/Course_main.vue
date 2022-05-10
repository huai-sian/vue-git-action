<template>
  <div>
    <div class="course">
      <div class="course__hero course__hero-main">
        <h1 class="course__title">SOLIDWORKS零件與組合件培訓教材</h1>
        <div class="container">
          <div class="course-intro__video d-flex align-items-center justify-content-center mt-5 row course-intro__main">
            <div class="video col-12 col-md-7 p-0 p-2 p-md-0" style="height: 100%;">
              <div class="video__wrapper">
                <iframe :src="`https://player.vimeo.com/video/${vid}?h=2377ff8aef&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`"
                  frameborder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen=""
                  ref="vimeo">
                </iframe>
              </div>
              
            </div>
            <div class="meta__mainList p-3 col-12 col-md-5 d-none d-md-block">
              <MetaList @changeVideo="changeVideo" :vid="vid" :chapters="chapters"></MetaList>
            </div>

            <div class="meta__btn p-3 mt-4 col-12 d-block d-md-none" @click.prevent="isOpen = !isOpen">
              課程內容 >
            </div>

            <div class="meta__mainList meta__modal p-3 col-12 d-md-none" v-if="isOpen">
              <MetaList @changeVideo="changeVideo" :chapters="chapters">
                <template v-slot:close>
                  <div class=" meta__modal-close text-end">
                    <i class="far fa-times-circle" @click.prevent="isOpen = false;"></i>
                  </div>
                </template>
              </MetaList>
            </div>
          </div>
        </div>
        
      </div>
      <!-- <ul class="nav nav-tabs nav-tabs-bordered tablist">
        <li class="nav-item">
          <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#course-overview">概覽</button>
        </li>

        <li class="nav-item">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#course-">編輯</button>
        </li>

        <li class="nav-item">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">設定</button>
        </li>

        <li class="nav-item">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">更改密碼</button>
        </li>
      </ul> -->
      <div class="container">
        <div class="row">
          <!-- 左側 -->
          <div class="col-12 col-md-9 text-start">
            <ul class="nav nav-tabs nav-tabs-bordered tablist pt-4 course__tablist">
                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">課程簡介</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">課程評價</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">問題討論</button>
                </li>
  
              </ul>
              <div class="tab-content pt-2">
                <div class="tab-pane fade show active profile-overview" id="profile-overview">
                  <div class="course__about py-3 py-md-5">
                    <h3 class="course__subtitle">關於課程</h3>
                    <div class="row">
                      <div class="col-6 d-flex align-items-center">
                        <img src="../assets/images/clock.svg" alt="">
                        <div class="d-flex flex-column">
                          <span class="mb-2 text-muted">課程時長</span>
                          <span>10 堂課</span>
                        </div>
                      </div>
                      <div class="col-6 d-flex align-items-center">
                        <img src="../assets/images/users-100.png" alt="">
                        <div class="d-flex flex-column">
                          <span class="mb-2 text-muted">課程人數</span>
                          <span>30 位同學</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="course__desc py-3 py-md-5">
                    <h3 class="course__subtitle">課程詳情</h3>
                    <p class="course__introtxt">是依據DS SOLIDWORKS公司所出版的《SOLIDWORKS 2022：SOLIDWORKS Essentials》
                      編譯而成的書籍，本書著重於介紹使用SOLIDWORKS軟體建立零件、組合件的基本方法和相關
                      技術，以及產生工程圖的基礎知識。本套教材不但保留了英文原版教材精華和風格基礎外，
                      同時也按照台灣讀者的閱讀習慣進行了編譯審校，最適合企業工程設計人員和學校相關專業師生使用。</p>
                  </div>
                </div>

                <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
                  <div class="course__review py-3 py-md-5">
                    <div class="d-flex justify-content-between align-items-center">
                      <h3 class="course__subtitle">課程評論</h3>
                      <button class="btn btn-main mb-3" data-bs-target="#evaluationModal" data-bs-toggle="modal" type="button">發表留言</button>
                    </div>
                    <div class="course__review__card">
                      <div class="card" style="border-radius: 0rem;">
                        <div class="card-body p-4 text-start d-flex align-items-center">
                          <div class="card-photo me-4">
                            <div class="card-imgfr mb-2">
                              <img src="../assets/images/profile-img.jpg" alt="" class="rounded-circle card-header p-0">
                            </div>
                            <p class="course__review__user mb-2">Adele</p>
                            <span>
                              <time class="text-muted">2022.03.29</time>
                            </span>
                          </div>
                          <div class="card-right">
                            <div class="courses__rating mb-3">
                            <i class="fas fa-star courses__rating__star"></i>
                            <i class="fas fa-star courses__rating__star"></i>
                            <i class="fas fa-star courses__rating__star"></i>
                            <i class="fas fa-star courses__rating__star"></i>
                            <i class="fas fa-star courses__rating__star"></i>
                          </div>
                            <strong class="fw-bold mb-3 d-block">內容豐富 教學完整</strong>
                            <p>內容豐富 教學完整</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-pane fade pt-3 profile-settings" id="profile-settings">
                  <div class="course__review py-3 py-md-5">
                    <div class="d-flex justify-content-between align-items-center">
                      <h3 class="course__subtitle">問題討論</h3>
                      <button class="btn btn-main mb-3" data-bs-target="#exampleModal" data-bs-toggle="modal" type="button">發表留言</button>
                    </div>
                    <div class="course__review__card">
                      <div class="card" style="border-radius: 0rem;">
                        <div class="card-body p-4 text-start d-flex align-items-center">
                          <div class="card-photo me-4">
                            <div class="card-imgfr mb-2">
                              <img src="../assets/images/profile-img.jpg" alt="" class="rounded-circle card-header p-0">
                            </div>
                            <p class="course__review__user mb-2">Adele</p>
                            <span>
                              <time class="text-muted">2022.03.29</time>
                            </span>
                          </div>
                          <div class="card-right">
                            <strong class="fw-bold mb-3 d-block" @click.prevent="showReply(0)">內容豐富 教學完整</strong>
                            <p>內容豐富 教學完整</p>
                          </div>
                        </div>
                        <div class="card-body" v-if="showNum === 0" style="margin-left: 110px;">
                          <input type="text" name="" id="" class="p-2 course__review__reply" style="width: 100%;" placeholder="留言">
                          <button class="mt-2 btn btn-main">送出</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <!-- 右側 -->
          <div class="col-12 col-md-3">
          </div>
          
        </div>
      </div>
      <section class="container-fluid">
        <div class="container position-relative">
          <h2 class="course__related mb-5">相關課程</h2>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="item in recommendData" :key="item.id">
              <CourseCard :course="item"></CourseCard>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev swiper-btn" slot="button-prev"></div>
          <div class="swiper-button-next swiper-btn" slot="button-next"></div>
        </div>
      </section>

      <div class="modal fade course__qa" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header border-0 pb-0">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h3 class="text-start fw-bold mb-2" style="font-size: 1.2rem;">標題</h3>
              <input type="text" placeholder="e.g.關於課程" class="course__qa__input" v-model="title">
              <quill-editor class="ql-editor" v-model="content"
                ref="myQuillEditor"
                style="height: 300px;"
                :options="editorOption"
                @change="onEditorChange($event)"
              >
              </quill-editor>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-main">送出</button>
            </div>
          </div>
        </div>
      </div>
      <EvaluationModal></EvaluationModal>
    </div>
  </div>
</template>

<script>
import CourseCard from '../components/CourseCard'
import MetaList from '../components/Meta_List'
import EvaluationModal from '../components/EvaluationModal'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Course_main',
  components: {
    Swiper,
    SwiperSlide,
    CourseCard,
    MetaList,
    EvaluationModal
  },
  data() {
    return {
      data: [],
      recommendData: [],
      swiperOption: {
        spaceBetween: 30,
        slidesPerView: 4,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
          }
        }
      },
      editorOption: {
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }], ['bold'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['link', 'image']
            ]
          },
        },
        theme: 'snow'
      },
      content: '',
      title: '',
      isOpen: false,
      vid: 690401768,
      showNum: 1,
      chapters: [],
    }
  },
  methods: {
    onEditorChange(e) {

    },
    changeVideo(vid) {
      console.log(vid);
      this.vid = vid;
    },
    showReply(num) {
      this.showNum = num;
    },
    getData() {
      const query = {
        CourseName: 'SOLIDWORKS',
        CourseCategoryId: 1,
        OrderBy: 'lastest',
        Ordering: 'ASC',
        page: 1,
      }
      this.$http.post('https://apiedu.drmaster.mypeoplevol.com/Course/All', query, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        console.log(res.data.data.courseList);
        this.recommendData = res.data.data.courseList.slice(0,5);
        
      }).catch(err => {
        this.$router.push('/error');
        console.log(err.response);
      })
    },
    getCourse() {
      this.$http.get('https://apiedu.drmaster.mypeoplevol.com/Course/Chapter?Id=1', {
        headers: {
          'Accept': '*/*',
        },
      }).then(res => {
        this.chapters = Array.from(res.data.data);
        console.log(this.chapters);
      }).catch(err => {
        this.$router.push('/error');
        console.log(err.response);
      })
    }
  },
  created() {
    this.getData();
    this.getCourse();
  }
}
</script>

<style lang="scss" scoped>
.video__wrapper {
	position: relative;
	padding-bottom: 56.25%; /* 16:9 */
	height: 0;
}

.video__wrapper iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.course__qa ::v-deep .ql-container {
  height: calc(100% - 60px);
}

.ql-editor {
  overflow: visible;
}

</style>