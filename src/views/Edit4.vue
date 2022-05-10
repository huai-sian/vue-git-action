<template>
  <div class="online">
    <Steps :current="step" :link="link"></Steps>
    <div class="container p-4 editCourse__container">
      <div class="row">
        <div class="col-12 text-start">
          <div class="mb-2">排定您的課程上線日期</div>
          <span class="d-inline-block mb-3" v-if="nowYear&&nowMonth&&nowDate&&nowHour&&nowMin">將會於{{ nowYear }}, {{ nowMonth }} {{ nowDate }}, {{ nowHour }}:{{ nowMin }}發佈</span>
          <span class="d-inline-block mb-3" v-else></span>
          <div class="row mb-3">
            <div class="col-6 mb-4">
              <span class="form-select-txt d-inline-block mb-2">月份</span>
              <select class="form-select py-3 position-relative" aria-label="Default select example" v-model="nowMonth">
                <option disabled value>請選擇月份</option>
                <option :value="m" v-for="m in Monthdata" :key="m">{{ m }}</option>
              </select>
            </div>
            <div class="col-3 mb-4">
              <span class="form-select-txt d-inline-block mb-2">日期</span>
              <select class="form-select py-3" aria-label="Default select example" v-model="nowDate">
                <option disabled value>請選擇日期</option>
                <option :value="d" v-for="d in date" :key="d">{{ d }}</option>
              </select>
            </div>
            <div class="col-3 mb-4">
               <span class="form-select-txt d-inline-block mb-2">年</span>
              <select class="form-select py-3" aria-label="Default select example" v-model="nowYear">
                <option disabled value>請選擇年份</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div class="col-6">
              <span class="form-select-txt d-inline-block mb-2">時</span>
              <select class="form-select py-3" aria-label="Default select example"  v-model="nowHour">
                <option disabled value>請選擇時間</option>
                <option :value="h" v-for="h in hour" :key="h">{{ h }}</option>
              </select>
            </div>
            <div class="col-6">
              <span class="form-select-txt d-inline-block mb-2">分</span>
              <select class="form-select py-3" aria-label="Default select example"  v-model="nowMin">
                <option disabled value>請選擇時間</option>
                <option :value="m" v-for="m in min" :key="m">{{ m < 10 ? `0${m}` : `${m}` }}</option>
              </select>
            </div>
            <!-- <div class="col-4">
              <span class="form-select-txt d-inline-block mb-2">AM / PM</span>
              <select class="form-select py-3" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div> -->
          </div>
          <div class="d-flex flex-column justify-content-start">
            <!-- <button class="btn btn-main mt-3 w-50 d-block" >存為範本</button> -->
            <button class="btn btn-main mt-3 w-50 d-block">發布</button>
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
  name: 'Edit3',
  data(){
    return {
      step: 4,
      link: '/dashboard/edit_course/online',
      Monthdata: [],
      nowMonth: '',
      nowDate: '',
      nowHour: '',
      nowMin: '',
      nowYear: '',
      date: 31,
      hour: 24,
      min: 60,
      ampm: 'AM'
    }
  },
  components: {
    Steps,
  },
  methods: {
    setPrice() {
      
    },
  },
  watch: {
    nowMonth: function() {
      if(this.nowMonth == 'Apr' || this.nowMonth == 'Jun' || 
      this.nowMonth == 'Sep' || this.nowMonth == 'Nov'
      ) {
        this.date = 30;
      } else if(this.nowMonth == 'Feb') {
        this.date = 28;
      } else {
        this.date = 31;
      }
    }
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
  created() {
    this.Monthdata = ['Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'July', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];
  }
}
</script>