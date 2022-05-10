<template>
  <div>
    <Breadcrumb activePage="課程" />
    <div class="courses">
      <!-- <div class="d-flex justify-content-between align-items-center px-4">
        <input 
          type="text"
          name="query"
          class="form-control mb-1 courses__query"
          id="query"
          v-model="query"
          placeholder="搜尋課程..."
        >
        <select class="form-select courses__filter ms-auto mb-3" aria-label="courses__filter" v-model="filter">
          <option selected value="date">日期</option>
          <option value="active">進行中課程</option>
          <option value="finished">已完成課程</option>
        </select>
      </div> -->
      <div class="row mt-4">
        <div class="col-xl-4 mb-4 mb-md-0">
          <div class="card">
            <div class="card-body profile-card pt-4 d-flex flex-column align-items-center profile__card">
              <img src="../assets/images/profile-img.jpg" alt="Profile" class="rounded-circle">
              <h2 class="mt-2 profile__name">{{ user.userName }}</h2>
              <h3 class="mt-2 profile__identity">{{ user.status }}</h3>
              <div class="social-links mt-2">
                <a :href="user.link" class="twitter"><i class="fas fa-link"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-8">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="courses__tabTitle fw-bold text-start">我開的課</h3>
            <button class="btn btn-main" @click.prevent="$router.push('/dashboard/edit_course/basic')">我要開課</button>
          </div>
          <div class="container-fluid">
            <div class="row" v-if="!noData">
              <div class="col-12 col-sm-6 col-lg-4 mb-4" v-for="item in ownedCourses" :key="item.id">
                <CourseCard :course="item" >
                  <template slot="edit">
                    <span class="btn btn-edit" @click.stop="$router.push('/dashboard/edit_course/basic')">
                      <i class="fas fa-edit"></i>
                    </span>
                  </template>
                </CourseCard>
              </div>
            </div>
            <div v-if="noData">
              <p class="noData__txt">找不到您搜尋的課程</p>
              <img src="../assets/images/empty.svg" alt="" width="250">
            </div>
          </div>
          
          <h3 class="courses__tabTitle fw-bold text-start mb-3">我修的課</h3>
          <div class="container-fluid">
            <div class="row">
              <div class="col-12 col-sm-6 col-lg-4 mb-4" v-for="item in purchasedCourses" :key="item.id">
                <CourseCard :course="item" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <!-- <nav class='my-5'>
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a href="#" class="page-link" @click.prevent="">上一頁</a>
          </li>
          <li class="page-item">
            <a href="#" class="page-link" @click.prevent="">1</a>
          </li>
          <li class="page-item">
            <a href="#" class="page-link" @click.prevent="">下一頁</a>
          </li>
        </ul>
      </nav> -->
    </div>
  </div>
    
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import CourseCard from '../components/CourseCard'
import { mapActions } from 'vuex'

export default {
  name: 'Courses',
  components: {
    Breadcrumb,
    CourseCard
  },
  data() {
    return {
      query: '',
      data: [],
      purchasedCourses: [],
      ownedCourses: [],
      filter: 'date',
      user: {
        userName: 'Kevin Anderson',
        status: '教師',
        email: 'k.anderson@example.com',
        link: 'https://twitter.com/#',
        password: '123456',
        getNotice: true,
      },
      noData: false,
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
      this.updateLoading(true);
      this.$http.post('https://apiedu.drmaster.mypeoplevol.com/Course/All', query, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        console.log(res.data.data.courseList);
        this.purchasedCourses = res.data.data.courseList.slice(0,5);
        this.ownedCourses = res.data.data.courseList.slice(0,5);
        this.updateLoading(false);
        if(res.data.data.courseList.length == 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      }).catch(err => {
        this.$router.push('/error');
        console.log(err.response);
      })
    },
    ...mapActions(['updateLoading'])
  },
  created() {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
  .btn-edit {
    position: absolute;
    right: .8rem;
    top: .8rem;
    padding: .48rem .6rem;
    background-color: white;
    border-radius: 50%;
    z-index: 10;
  }
</style>