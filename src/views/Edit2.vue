<template>
  <div class="syllabus">
    <Steps :current="step" :link="link"></Steps>
    <div class="container p-4 editCourse__container">
      <div class="row">
        <div class="syllabus__group" v-for="(item, i) in syllabus" :key="item.id">
          <div class="syllabus__box syllabus__chapter d-flex align-items-center p-3 mb-2 position-relative">
            <span>章節 {{ i + 1 }}</span>
            <span class="text-start mx-2" style="flex: 1 1 0%;display: inline-block;height: 1rem;" v-if="tempSyllabus.id !== item.id" 
              @dblclick.prevent="editChapter(item);Showtooltip = ''"
              @mouseover="Showtooltip = item.id"
              @mouseleave="Showtooltip = ''">
              {{ item.title }}
            </span>
            <span class="position-absolute edit-tooltip" v-if="Showtooltip == item.id">
              點擊兩下以編輯
            </span>
            <input type="text" style="flex: 1 1 0%;border:none;"
              v-if="tempSyllabus.id == item.id" class="mx-2"
              v-model="tempSyllabus.title"
              @change="finishChapter"
              >
            <!-- <span class="mx-2"><i class="fas fa-check" @click.prevent="finishChapter"></i></span> -->
            <span class="mx-2"><i class="fas fa-plus" @click.prevent="addChapter(i)"></i></span>
            <span class="mx-2"><i class="fas fa-trash" @click.prevent="deleteChapter(item)"></i></span>
          </div>
          <div class="syllabus__box syllabus__section d-flex align-items-center p-3 ms-5 mb-2 position-relative"
            v-for="(sec, j) in item.section" :key="sec.id">
            <span class="mx-2" v-if="sec.lock" 
              @click.prevent="editSection(item, sec);tempSection.lock = false;finishSection(item.id)">
                <i class="fas fa-lock me-1"></i>
            </span>
            <span class="mx-2" v-if="!sec.lock"
              @click.prevent="editSection(item, sec);tempSection.lock = true;finishSection(item.id)">
              <i class="fas fa-unlock"></i>
            </span>
            <span>單元 {{ j + 1 }}</span>
            <span class="text-start mx-2" 
              @mouseover="Showtooltip = sec.id"
              @mouseleave="Showtooltip = ''"
              style="flex: 1 1 0%;display: inline-block;height: 1rem;" v-if="tempSyllabus.id !== item.id || tempSection.id !== sec.id" 
              @dblclick.prevent="editSection(item, sec);Showtooltip = ''">
              {{ sec.title }}
            </span>
            <span v-if="Showtooltip == sec.id" class="position-absolute edit-tooltip">
              點擊兩下以編輯
            </span>
            <input type="text" style="flex: 1 1 0%;border:none;"
              v-if="tempSyllabus.id == item.id && tempSection.id == sec.id"
              class="mx-2"
              v-model="tempSection.title"
              @change="finishSection(item.id)">
            <span class="mx-2" data-bs-target="#editChapterModal" data-bs-toggle="modal"
              @click.prevent="openModal(item.id, sec.id, sec.video, sec.lock, sec.desc, sec.time)">
              <i class="fas fa-edit"></i>
            </span>
            <!-- <span class="mx-2"><i class="fas fa-check" @click.prevent="finishSection(item.id)"></i></span> -->
            <span class="mx-2"><i class="fas fa-plus" @click.prevent="addSection(item.id, j)"></i></span>
            <span class="mx-2"><i class="fas fa-trash" @click.prevent="deleteSection(item, sec)"></i></span>
            <!-- <span class="mx-2"><i class="fas fa-plus" @click.prevent="addSub=sec.id"></i></span> -->
            <!-- <Test v-if="addSub==sec.id"></Test> -->
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-start">
        <button class="btn btn-main mt-3 w-50" @click.prevent="save">下一步</button>
      </div>
      
    </div>
    <div class="modal fade editChapter" id="editChapterModal" tabindex="-1" aria-labelledby="editChapterModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header border-0 pb-0">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div class="modal-body text-start">
              <h3 class="text-start fw-bold mb-2 evaluation__title" style="font-size: 1.2rem;">影片位址</h3>
                <ValidationProvider rules='required|http' v-slot='{ errors , classes }'>
                  <div :class="classes" class="position-relative">
                    <input type="text" placeholder="https://player.vimeo.com/video/"
                      class="editChapter__input" 
                      v-model="tempLink"
                      @focus="editing = true">
                  </div>
                  <span class="text-danger mt-1">{{ errors[0] }}</span>
                </ValidationProvider>
              <!-- <span v-if="editing == false" @dblclick="editing = true">{{ tempLink }}</span> -->
                <span class="mt-3 d-block"><input type="checkbox" id="label" class="mt-0 me-2 form-check-input" v-model="templock">
                  <label for="label">
                    <i class="fas fa-lock me-1"></i>開放免費觀看
                  </label>
                </span>
                <div class="mt-4">
                  <h3 class="mb-2 fw-bold">影片長度</h3>
                  <div>
                    <input type="number" name="hour" size="2" max="10" min="0"
                      class="form-control d-inline-block me-2"
                      style="width: unset;"
                      v-model="hour" @change="handleHour(hour)">
                    <span class="me-3">小時</span>
                    <input type="number" name="min" size="2" max="60" min="0"
                      class="form-control d-inline-block me-2"
                      style="width: unset;"
                      v-model="min" @change="handleMin(min)">
                    <span class="me-3">分鐘</span>
                    <input type="number" name="sec" size="2" max="60" min="0"
                      class="form-control d-inline-block me-2"
                      style="width: unset;"
                      v-model="sec" @change="handleSec(sec)">
                    <span>秒</span>
                  </div>
                  
                </div>
                <quill-editor class="ql-editor"
                  v-model="tempContent"
                  ref="myQuillEditor"
                  style="height: 250px;"
                  :options="editorOption"
                  >
                </quill-editor>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-main" data-bs-dismiss="modal" @click.prevent="saveLink">儲存</button>
            </div>
        </div>
      </div>
    </div>
    <!-- <div v-for="(item, i) in syllabus" :key="item.id">
      <Test :data="item" :i='i' :pi="i" @finishChapter="finished"></Test> 
    </div> -->
  </div>
</template>

<script>
import Steps from '../components/Steps'
import Test from '../components/test'
const Swal = require('sweetalert2');

/*  [{
    id: '',
    title: '',
    video: '',
    desc: '',
    lock: true,
    section: [
      {
        id: '',
        title: '',
        video: '',
        desc: '',
        lock: true,
      },
      {
        id: '',
        title: '',
        video: '',
        desc: '',
        lock: true,
      }
    ]
  }] */


export default {
  name: 'Edit2',
  data() {
    return {
      step: 2,
      link: '/dashboard/edit_course/syllabus',
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
      tempSyllabus: {
        id: '',
        title: '',
        section: [{
          id: '',
          title: '',
          video: '',
          desc: '',
          lock: true,
          time: '',
        }],
      },
      tempSection: {
        id: Math.floor(Date.now()),
        title: '',
        video: '',
        desc: 'content',
        lock: true,
        time: '',
      },
      syllabus: [],
      chapterId: '',
      sectionId: '',
      tempLink: '',
      editing: false,
      templock: true,
      addSub: '',
      tempContent: '',
      hour: 0,
      min: 0,
      sec: 0,
      Showtooltip: false,
    }
  },
  components: {
    Steps,
    Test
  },
  methods: {
    addChapter(idx) {
      this.syllabus.splice(idx + 1, 0, {
        id:  Math.floor(Date.now()),
        title: '',
        section: [{
          id: Math.floor(Date.now()+ 10),
          title: '',
          video: '',
          desc: '',
          lock: true,
          time: '',
        }]
      });
    },
    editChapter(item) {
      this.tempSyllabus = item;
    },
    editSection(item, sec) {
      this.tempSyllabus = item;
      this.tempSection = sec;
    },
    save() {
      const vm = this;
      // Swal.fire(
      //     '',
      //     '提醒您，上架課程將不會暫存您的變更，需完成至第四步驟完成發布，本系統即會儲存並發布您的課程。',
      //     'info'
      // ).then((res) => {
      //   vm.$router.push('/dashboard/edit_course/pricing');
      // })
      vm.$router.push('/dashboard/edit_course/pricing');
    },
    addSection(id, idx) {
      let i;
      this.syllabus.forEach((el, idx) => {
        if(el.id === id) {
          i = idx;
        }
      });
      this.syllabus[i].section.splice(idx +1, 0, {
        id: Math.floor(Date.now()),
        title: '',
        video: '',
        desc: '',
        lock: true,
        time: '',
      });
    },
    finishChapter() {
      let i;
      this.syllabus.forEach((el, idx) => {
        if(el.id === this.tempSyllabus.id) {
          i = idx;
        }
      });
      this.syllabus[i] = this.tempSyllabus;
      localStorage.setItem('syllabus', JSON.stringify(this.syllabus));
      console.log(this.syllabus);
    },
    finishSection(id) {
      let i;
      let j;
      console.log(id);
      this.syllabus.forEach((el, idx) => {
        console.log(el.id);
        if(el.id === id) {
          i = idx;
        }
      });
      console.log(i);
      this.syllabus[i].section.forEach((el, idx) => {
        if(el.id === this.tempSection.id) {
          j = idx;
        }
      })
      this.syllabus[i].section[j] = this.tempSection;
      localStorage.setItem('syllabus', JSON.stringify(this.syllabus));
      this.getDatafromLocal();
      console.log(this.syllabus);
    },
    deleteChapter(item) {
      let i;
      this.syllabus.forEach((el, idx) => {
        if(el.id === item.id) {
          i = idx;
        }
      });
      if(this.syllabus.length == 1) {
        return;
      }
      this.syllabus.splice(i, 1);
      localStorage.setItem('syllabus', JSON.stringify(this.syllabus));
      this.getDatafromLocal();
      console.log(this.syllabus);
    },
    deleteSection(item, sec) {
      let i;
      let j;
      this.syllabus.forEach((el, idx) => {
        console.log(item.id);
        if(el.id === item.id) {
          i = idx;
        }
      });
      console.log(i);
      this.syllabus[i].section.forEach((el, idx) => {
        if(el.id === sec.id) {
          j = idx;
        }
      })
      this.syllabus[i].section.splice(j, 1);
      localStorage.setItem('syllabus', JSON.stringify(this.syllabus));
      this.getDatafromLocal();
      console.log(this.syllabus);
    },
    openModal(chapterId, sectionId, link, lock, content, time) {
      this.chapterId = chapterId;
      this.sectionId = sectionId;
      this.tempLink = link;
      this.templock = lock;
      this.tempContent = content;
      this.formatTime(time);
      console.log(this.tempLink);
    },
    saveLink() {
      let i;
      let j;
      this.syllabus.forEach((el, idx) => {
        if(el.id === this.chapterId) {
          i = idx;
        }
      });
      console.log(i);
      this.syllabus[i].section.forEach((el, idx) => {
        if(el.id === this.sectionId) {
          j = idx;
        }
      })
      let hr;
      let min;
      let sec;
      let time;
      if(isNaN(this.hour)) {
        hr = 0;
      }
      if(isNaN(this.min)) {
        min = 0;
      }
      if(isNaN(this.sec)) {
        sec = 0;
      }
      hr = this.hour < 10 ? `0${this.hour}` : `${this.hour}`;
      min = this.min < 10 ? `0${this.min}` : `${this.min}`;
      sec = this.sec < 10 ? `0${this.sec}` : `${this.sec}`;
      time = `${hr}:${min}:${sec}`;
      this.syllabus[i].section[j]['video'] = this.tempLink;
      this.syllabus[i].section[j]['lock'] = this.templock;
      this.syllabus[i].section[j]['desc'] = this.tempContent;
      this.syllabus[i].section[j]['time'] = time;
      console.log(time);
      localStorage.setItem('syllabus', JSON.stringify(this.syllabus));
      this.getDatafromLocal();
    },
    formatTime(time) {
      let timeArr = time.split(':');
      this.hour = Number(timeArr[0]);
      this.min= Number(timeArr[1]);
      this.sec = Number(timeArr[2]);
    },
    finished(idx, pi, parentItem, obj) {
      this.syllabus[idx] = obj;
      console.log(obj);
      localStorage.setItem('syllabus', JSON.stringify(this.syllabus));
      this.getDatafromLocal();
      console.log(this.syllabus);
    },
    handleHour(num) {
      if(num.toString().length > 2) {
        console.log(num);
        num = Number(Array.from(num.toString()).slice(-2).join(''));
        this.hour = num;
      }
      if(num < 0) {
        this.hour = 0;
      }
    },
    handleMin(num) {
      if(num > 59) {
        this.min = 0;
      }
      if(num.toString().length > 2) {
        console.log(num);
        num = Number(Array.from(num.toString()).slice(-2).join(''));
        if(num > 59) {
          this.min = 0;
        } else {
          this.min = num;
        }
      }
      if(num < 0) {
        this.min = 0;
      }
    },
    handleSec(num) {
      if(num > 59) {
        this.sec = 0;
      }
      if(num.toString().length > 2) {
        console.log(num);
        num = Number(Array.from(num.toString()).slice(-2).join(''));
        if(num > 59) {
          this.sec = 0;
        } else {
          this.sec = num;
        }
      }
      if(num < 0) {
        this.sec = 0;
      }
    },
    getDatafromLocal() {
      this.syllabus = JSON.parse(localStorage.getItem('syllabus')) || [];
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
    this.getDatafromLocal();
    console.log(this.syllabus);
    if(this.syllabus.length == 0 || !this.syllabus) {
      this.syllabus.push({
        id: Math.floor(Date.now()),
        title: '',
        section: [{
          id: Math.floor(Date.now() + 10),
          title: '',
          video: '',
          desc: '',
          lock: true,
          time: ''
        }],
      });
    }
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