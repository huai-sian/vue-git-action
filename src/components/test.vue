<template>
  <div>
    <div class="container p-4 editCourse__container">
      <div class="row">
        <!-- <div class="syllabus__group" v-for="(item, i) in data" :key="item.id"> -->
          <div class="syllabus__box syllabus__chapter d-flex align-items-center p-3 mb-2">
            <span>章節 </span>
            <span class="text-start mx-2" style="flex: 1 1 0%;display: inline-block;height: 1rem;" v-if="tempSection.id !== parentData.id" @dblclick.prevent="editChapter(parentData)">
              {{ parentData.title }}
            </span>
            <input type="text" style="flex: 1 1 0%;border:none;"
              v-if="tempSection.id == parentData.id" class="mx-2"
              v-model="tempSection.title"
              @change="finishChapter">
            <span class="mx-2"><i class="fas fa-check" @click.prevent="finishChapter"></i></span>
            <span class="mx-2"><i class="fas fa-plus" @click.prevent="addChapter(i)"></i></span>
            <span class="mx-2"><i class="fas fa-trash" @click.prevent="deleteChapter(parentData)"></i></span>
          </div>
          <template v-if="parentData.section">
            <div v-for="(sec, j) in parentData.section" :key="sec.id">
              <Test :data="sec" :i="j" @finishChapter="finished"></Test>
            </div>
            
          </template>
          
        <!-- </div> -->
      </div>
      
    </div>
    <div class="modal fade editChapter" id="editChapterModal" tabindex="-1" aria-labelledby="editChapterModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header border-0 pb-0">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-start">
            <h3 class="text-start fw-bold mb-2 evaluation__title" style="font-size: 1.2rem;">影片位址</h3>
            <input type="text" placeholder="https://player.vimeo.com/video/"
              class="editChapter__input" 
              v-model="tempLink"
              @focus="editing = true">
            <!-- <span v-if="editing == false" @dblclick="editing = true">{{ tempLink }}</span> -->
            <span class="mt-3 d-block"><input type="checkbox" id="label" class="me-2" v-model="templock"><label for="label"><i class="fas fa-lock"></i>開放免費觀看</label></span>
            <quill-editor class="ql-editor"
                ref="myQuillEditor"
                style="height: 250px;"
                :options="editorOption"
              >
            </quill-editor>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-main" @click.prevent="saveLink(tempLink)" data-bs-dismiss="modal">儲存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* tempSyllabus: {
  id: '12345',
  title: '1a',
  video: '',
  desc: '',
  lock: true,
  section: [{
    id: '56789',
    title: '1-1a',
    video: '',
    desc: '',
    lock: true,
    section: [{
      id: '45566',
      title: '1-1-1a',
      video: '',
      desc: '',
      lock: true,
    },
    {
      id: '87665',
      title: '1-1-1b',
      video: '',
      desc: '',
      lock: true,
    }]
  }],
} */

// [{"id":1651762383022,"title":"uy","video":"","desc":"","lock":true, "section": [{"id":1651762383022,"title":"iu","video":"","desc":"","lock":true}]}]

import Test from './test';
  export default {
  name: 'Test',
  props: ['data', 'i', 'pi'],
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
        id: Math.floor(Date.now()),
        title: '',
        video: '',
        desc: '',
        lock: true,
        section: [{
          id: '',
          title: '',
          video: '',
          desc: '',
          lock: true,
        }],
      },
      tempSection: {
        id: Math.floor(Date.now()),
        title: '',
        video: '',
        desc: '',
        lock: true,
      },
      syllabus: [],
      chapterId: '',
      sectionId: '',
      tempLink: '',
      editing: false,
      templock: true,
      parentData: {
        id: '',
        title: '',
        video: '',
        desc: '',
        lock: true,
        section: [],
      },
    }
  },
  components: {
    Test
  },
  methods: {
    addChapter(idx) {
      // console.log(this.parentData);
      // let secIdx;
      // if(!this.parentData.section) {
      //   this.parentData.section = [];
      //   this.parentData.section.push({
      //     id:  Math.floor(Date.now()),
      //     title: '',
      //     video: '',
      //     desc: '',
      //     lock: true,
      //   });
      //   secIdx = 0
      // } else {
      //   this.parentData.section.splice(idx + 1, 0, {
      //     id:  Math.floor(Date.now()),
      //     title: '',
      //     video: '',
      //     desc: '',
      //     lock: true,
      //   });
      //   secIdx = idx + 1;
      // }
      // console.log(this.parentData);
      // console.log(this.parentItem);
      // this.finished(secIdx, this.pi, this.parentItem, this.parentData.section);
      // this.parentItem[this.pi].
    },
    editChapter(item) {
      this.tempSection = item;
    },
    editSection(item, sec) {
      this.tempSyllabus = item;
      this.tempSection = sec;
    },
    save() {
      this.$router.push('/dashboard/edit_course/pricing');
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
        desc: ''
      });
    },
    finishChapter() {
      // let i;
      // this.syllabus.forEach((el, idx) => {
      //   if(el.id === this.tempSyllabus.id) {
      //     i = idx;
      //   }
      // });
      // this.syllabus[i] = this.tempSyllabus;
      // localStorage.setItem('syllabus', JSON.stringify(this.syllabus));
      // console.log(this.syllabus);
      this.$emit('finishChapter', this.i, this.pi, this.tempSection);
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
      this.syllabus = JSON.parse(localStorage.getItem('syllabus')) || [];
      console.log(this.syllabus);
    },
    deleteChapter(item) {
      let i;
      this.syllabus.forEach((el, idx) => {
        if(el.id === item.id) {
          i = idx;
        }
      });
      this.syllabus.splice(i, 1);
      localStorage.setItem('syllabus', JSON.stringify(this.syllabus));
      this.syllabus = JSON.parse(localStorage.getItem('syllabus')) || [];
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
      this.syllabus = JSON.parse(localStorage.getItem('syllabus')) || [];
      console.log(this.syllabus);
    },
    openModal(chapterId, sectionId, link, lock) {
      this.chapterId = chapterId;
      this.sectionId = sectionId;
      this.tempLink = link;
      this.templock = lock;
      console.log(this.tempLink);
    },
    saveLink(link) {
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
      this.syllabus[i].section[j]['video'] = link;
      this.syllabus[i].section[j]['lock'] = this.templock;
      localStorage.setItem('syllabus', JSON.stringify(this.syllabus));
      this.syllabus = JSON.parse(localStorage.getItem('syllabus')) || [];

    },
    finished(idx, pi, obj) {
      this.parentData.section[idx] = obj;
      console.log(this.tempSection);
      this.$emit('finishChapter', this.i, this.pi, this.tempSection);
    }
  },
  created() {
    //this.syllabus = JSON.parse(localStorage.getItem('syllabus')) || [];
    this.parentData = this.data;
    console.log(this.parentData);
  }
}

</script>