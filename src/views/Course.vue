<template>
  <div>
    <div class="course">
      <div class="course__hero">
        <h1 class="course__title">SOLIDWORKS零件與組合件培訓教材</h1>
        <div class="container">
          <div class="course-intro__video d-flex justify-content-center mt-5 row">
            <div class="video col-12 col-md-7 p-2 p-md-0">
              <div class="video__wrapper">
                <iframe src="https://player.vimeo.com/video/690401768?h=2377ff8aef&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  frameborder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen=""
                  ref="vimeo">
                </iframe>
              </div>
              
            </div>
            <div class="meta p-3 col-12 col-md-5 m-2 mb-0 m-md-0">
              <div>
                <div class="img">
                  <!-- <h3 class="meta__title">第一章 SOLIDWORKS 基礎與使用者介面</h3> -->
                  <img src="https://www.drmaster.net/edu/wp-content/uploads/2022/03/MO12202.png" 
                    alt=""
                    width="160"
                  >
                  <p>SOLIDWORKS零件與組合件培訓教材《2022繁體中文版》</p>
                  <router-link to="/course_main/1"
                    class="btn btn-main btn-start"
                    style="line-height: 2rem;">購買課程</router-link>
                </div>
              </div>
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
            <div class="course__about py-3 py-md-5 mt-3">
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
          
            <div class="course__accor py-3 py-md-5">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item" v-for="item in chapters" :key="item.id">
                  <h2 class="accordion-header" :id="`L${item.id}`">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${item.id}`" aria-expanded="true" :aria-controls="`collapse${item.id}`">
                      {{ item.name }}
                    </button>
                  </h2>
                  <div :id="`collapse${item.id}`" class="accordion-collapse collapse show" :aria-labelledby="`heading${item.id}`" data-bs-parent="#accordionExample">
                    <div class="accordion-body p-2">
                      <ul>
                        <li class="course__accor__list d-flex justify-content-between"
                          v-for="sub in item.subChapter" :key="sub.id"
                          @click.prevent="changeVideo('690401768')">
                          <i class="far fa-circle me-2 d-inline-block"></i>
                          <span class="title" style="flex: 1 1 0%;">{{ sub.name }}</span>
                          <span class="time">{{ sub.duration }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="course__review py-3 py-md-5">
              <h3 class="course__subtitle">課程評論</h3>
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
          <!-- 右側 -->
          <div class="col-12 col-md-3">
            
          </div>
          
        </div>
      </div>
      <section class="container-fluid mt-3">
        <div class="container position-relative">
          <h2 class="course__related mb-3">相關課程</h2>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="item in recommendData" :key="item.id">
              <CourseCard :course="item"></CourseCard>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev swiper-btn" slot="button-prev"></div>
          <div class="swiper-button-next swiper-btn" slot="button-next"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CourseCard from '../components/CourseCard'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Course',
  components: {
    Swiper,
    SwiperSlide,
    CourseCard
  },
  data() {
    return {
      data: [],
      chapters: [],
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
      }
    }
  },
  methods: {
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
</style>