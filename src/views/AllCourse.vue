<template>
  <div>
    <div class="AllCourse">
      <div class="container">
        <div class="AllCourse__top row mt-3 mb-2 align-items-center mx-auto">
          <form class="d-flex position-relative AllCourse__searchForm col-12 col-md-3" @submit.prevent="getData">
            <button class="btn AllCourse__searchBtn position-absolute" type="submit"><i class="fas fa-search"></i></button>
            <input class="form-control me-2 AllCourse__search" type="search" placeholder="Search" aria-label="Search" v-model="query">
          </form>
          <div class="AllCourse__top-badges d-flex align-items-center ms-auto justify-content-center col-12 col-md-6">
            <div class="AllCourse__badge" @click.prevent="CourseCategoryId = 1;getData()">
              3D繪圖
            </div>
            <div class="AllCourse__badge" @click.prevent="CourseCategoryId = 2;getData()">
              學科教學
            </div>
            <div class="AllCourse__badge" @click.prevent="CourseCategoryId = 3;getData()">
              電腦資訊
            </div>
          </div>
          <select class="form-select courses__filter ms-md-2 col-12 col-md-3" aria-label="courses__filter" v-model="filter" @change="getData">
            <option value="latest" selected>最新發布</option>
            <option value="popular">最多人數</option>
            <option value="highrating">最高評價</option>
          </select>
        </div>
        <div class="d-flex justify-content-end mb-4">
          <i class="fas fa-sort-amount-down d-inline-block text-end me-2"
           style="font-size: 1.5rem;"
           v-if="Ordering == 'DESC'"
           @click.prevent="toggleOrdering('ASC')"></i>
          <i class="fas fa-sort-amount-up d-inline-block text-end me-2"
            style="font-size: 1.5rem;"
            v-if="Ordering == 'ASC'"
            @click.prevent="toggleOrdering('DESC')"></i>
        </div>
      </div>
      <div class="container">
        <div class="row" v-if="!noData">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="(item, i) in data" :key="`${i}${item.id}`">
            <CourseCard :course="item" />
          </div>
        </div>
        <div v-if="noData">
          <p class="noData__txt">找不到您搜尋的課程</p>
          <img src="../assets/images/empty.svg" alt="" width="250">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseCard from '../components/CourseCard'
import { mapActions } from 'vuex'

export default {
  name: 'AllCourse',
  components: {
    CourseCard
  },
  data() {
    return {
      filter: 'latest',
      query: '',
      data: [],
      page: 2,
      CourseName: 'SOLIDWORKS',
      CourseCategoryId: 1,
      OrderBy: 'lastest',
      Ordering: "ASC",
      isUpdated: 0,
      routerQuery: '',
      noData: false,
    }
  },
  methods: {
    toggleOrdering(order) {
      this.Ordering = order;
      this.data = [];
      this.getData();
    },
    getData() {
      const query = {
        CourseName: this.query,
        CourseCategoryId: this.CourseCategoryId,
        OrderBy: this.OrderBy,
        Ordering: this.Ordering,
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
        this.data = res.data.data.courseList;
        this.updateLoading(false);
        if(this.data.length == 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      }).catch(err => {
        this.$router.push('/error');
        console.log(err.response);
      })
    },
    scrollLoad() {
      const vm = this;
      console.log(vm.page);
      const query = {
          CourseName: vm.CourseName,
          CourseCategoryId: vm.CourseCategoryId,
          OrderBy: vm.OrderBy,
          Ordering: vm.Ordering,
          page: vm.page,
        }
      window.addEventListener('scroll', function() {
        if(window.scrollY + window.innerHeight >= (document.body.offsetHeight - 100) && vm.isUpdated == 0) {
          vm.isUpdated = 1;
          if(vm.isUpdated == 1) {
            query.page = vm.page;
            vm.$http.post('https://apiedu.drmaster.mypeoplevol.com/Course/All', query, {
              headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
              },
            }).then(res => {
              console.log(res.data);
              vm.data.push(...res.data.data.courseList);
              if(res.data.data.courseList.length > 0) {
                vm.isUpdated = 0;
                vm.page ++;
              } else {
                vm.isUpdated = 1;
              }
              
            }).catch(err => {
              this.$router.push('/error');
              console.log(err.response);
            })
          }
        }
      })
      
    },
    ...mapActions(['updateLoading'])
  },
  mounted() {
    this.scrollLoad();
  },
  created() {
    if(Object.values(this.$route.query)) {
      this.routerQuery = Object.values(this.$route.query).join('');
      this.query = this.routerQuery;
      const query = {
        CourseName: this.query,
        CourseCategoryId: this.CourseCategoryId,
        OrderBy: this.OrderBy,
        Ordering: this.Ordering,
        page: 1,
      }
      this.updateLoading(true);
      this.$http.post('https://apiedu.drmaster.mypeoplevol.com/Course/All', query, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        console.log(res.data.data);
        this.data = res.data.data.courseList;
        this.updateLoading(false);
      }).catch(err => {
        this.$router.push('/error');
        console.log(err.response);
      })
    } else {
      this.getData();
    }
    console.log(Object.values(this.$route.query).join(''));
  }
}
</script>