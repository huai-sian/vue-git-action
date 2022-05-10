<template>
  <div class="home">
    <div class="home__hero container my-5">
      <div class="row mb-4">
        <div class="col-12 col-md-6 mb-3 mb-md-4">
          <div class="d-flex flex-column align-items-center mt-5">
            <h3 class="home__hero__title">搜尋有興趣的線上課程</h3>
            <form class="d-flex position-relative home__searchForm col-12 col-md-3 mb-3" @submit.prevent="search">
              <button class="btn home__searchBtn position-absolute" type="submit"><i class="fas fa-search"></i></button>
              <input class="form-control me-2 home__search" type="search" placeholder="搜尋" aria-label="Search" v-model="query">
            </form>
            <span class="text-start home__hero__txt">
              <i class="fas fa-bullseye me-2"></i>專業的師資教材<br>
              <i class="fas fa-bullseye me-2"></i>提供您全方位的影音學習環境<br>
              <i class="fas fa-bullseye me-2"></i>突破傳統的學習模式
            </span>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="home__imgfr mx-auto">
            <img src="../assets/images/hero.svg" alt="">
          </div>
        </div>
      </div>
    </div>
    <section class="container-fluid py-5 px-0" style="background-color: white;">
      <div class="container position-relative px-5">
        <h2 class="course__related mb-5">精選課程</h2>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="item in data" :key="item.id">
            <CourseCard :course="item"></CourseCard>
          </swiper-slide>
        </swiper>
        <div class="swiper-button-prev swiper-btn" slot="button-prev"></div>
        <div class="swiper-button-next swiper-btn" slot="button-next"></div>
      </div>
    </section>
    <div class="home__review py-5">
      <h3 class="course__related mb-5">學生們這麼說</h3>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4">
            <div class="card border-0 mb-3" style="border-radius: 0rem;">
              <div class="card-body p-4 text-start d-flex flex-column">
                <i class="fas fa-quote-left home__review__quote mb-2"></i>
                <div class="card-right mb-3">
                  <strong class="fw-bold mb-3 d-block">內容豐富 教學完整</strong>
                  <p>內容豐富 教學完整</p>
                </div>
                <div class="card-photo me-4 d-flex align-items-center justify-content-end">
                  <div class="card-imgfr mb-2 me-3">
                    <img src="../assets/images/profile-img.jpg" alt="" class="rounded-circle card-header p-0">
                  </div>
                  <p class="course__review__user mb-2 me-2">Adele</p>
                  <i class="fas fa-quote-right home__review__quote"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="card border-0 mb-3" style="border-radius: 0rem;">
              <div class="card-body p-4 text-start d-flex flex-column">
                <i class="fas fa-quote-left home__review__quote mb-2"></i>
                <div class="card-right mb-3">
                  <strong class="fw-bold mb-3 d-block">內容豐富 教學完整</strong>
                  <p>內容豐富 教學完整</p>
                </div>
                <div class="card-photo me-4 d-flex align-items-center justify-content-end">
                  <div class="card-imgfr mb-2 me-3">
                    <img src="../assets/images/profile-img.jpg" alt="" class="rounded-circle card-header p-0">
                  </div>
                  <p class="course__review__user mb-2 me-2">Adele</p>
                  <i class="fas fa-quote-right home__review__quote"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="card border-0 mb-3" style="border-radius: 0rem;">
              <div class="card-body p-4 text-start d-flex flex-column">
                <i class="fas fa-quote-left home__review__quote mb-2"></i>
                <div class="card-right mb-3">
                  <strong class="fw-bold mb-3 d-block">內容豐富 教學完整</strong>
                  <p>內容豐富 教學完整</p>
                </div>
                <div class="card-photo me-4 d-flex align-items-center justify-content-end">
                  <div class="card-imgfr mb-2 me-3">
                    <img src="../assets/images/profile-img.jpg" alt="" class="rounded-circle card-header p-0">
                  </div>
                  <p class="course__review__user mb-2 me-2">Adele</p>
                  <i class="fas fa-quote-right home__review__quote"></i>
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
// @ is an alias to /src
import CourseCard from '../components/CourseCard'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperSlide,
    CourseCard,
  },
  data() {
    return {
      query: '',
      data: [],
      swiperOption: {
        autoplay: true,
        spaceBetween: 20,
        slidesPerView: 3,
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
        }
      },
    }
  },
  methods: {
    getData() {
      const query = {
        CourseName: '',
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
        this.data = res.data.data.courseList;
        
      }).catch(err => {
        this.$router.push('/error');
        console.log(err.response);
      })
    },
    search() {
      const query = {
        CourseName: this.query,
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
        this.data = res.data.data.courseList;
        this.$router.push({ path: '/all_courses', query: `${this.query}`});
      }).catch(err => {
        this.$router.push('/error');
        console.log(err.response);
      })
    }
  },
  created() {
    this.getData();
  }
};
</script>
