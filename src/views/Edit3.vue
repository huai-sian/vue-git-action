<template>
  <div class="pricing">
    <Steps :current="step" :link="link"></Steps>
    <div class="container p-4 editCourse__container">
      <div class="row">
        <div class="col-12">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form class="login__formContent" @submit.prevent="handleSubmit(save)">
              <label for="price" class="form-label text-start d-inline-block w-100">課程定價</label>
              <ValidationProvider rules='required' v-slot='{ errors , classes }'>
                <div :class="classes">
                  <input
                    type="number"
                    name="price"
                    v-model="price"
                    class="form-control mb-1"
                    id="price"
                    required
                  >
                  <span class="text-danger mt-1">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <div class="d-flex justify-content-start my-3">
                <input type="checkbox"
                  id="label" class="mt-0 me-2 form-check-input" v-model="isFree">
                <label>將該課程設為免費</label>
              </div>
              <div class="d-flex justify-content-start">
                <button class="btn btn-main mt-3 w-50" >下一步</button>
              </div>
            </form>
          </ValidationObserver>
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
      step: 3,
      link: '/dashboard/edit_course/pricing',
      price: 0,
      isFree: false,
    }
  },
  components: {
    Steps,
  },
  watch: {
    isFree: function() {
      if(this.isFree) {
        this.price = 0;
        console.log('price');
      }
    }
  },
  methods: {
    save() {
      const vm = this;
      // Swal.fire(
      //     '',
      //     '提醒您，上架課程將不會暫存您的變更，需完成至第四步驟完成發布，本系統即會儲存並發布您的課程。',
      //     'info'
      // ).then((res) => {
      //   vm.$router.push('/dashboard/edit_course/online');
      // })
      vm.$router.push('/dashboard/edit_course/online');
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
  created() {

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