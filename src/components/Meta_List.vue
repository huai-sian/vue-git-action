<template>
  <div>
    <div class="">
      <!-- <div class=" meta__modal-close text-end">
        <i class="far fa-times-circle" @click.prevent="isOpen = false;"></i>
      </div>   -->
      <slot name="close"></slot>
      <div class="p-2 d-flex mt-2 align-items-center justify-content-between">
        <span class="text-start">課程內容</span>
        <span class="progress__circle">
          <div class="number"><i class="fas fa-flag"></i></div>
          <div class="inner"></div>
          <div class="circle">
            <div class="bar left">
              <div class="progress"></div>
            </div>
            <div class="bar right">
              <div class="progress"></div>
            </div>
          </div>
        </span>
      </div>
    </div>
    <div class="course__accorbox">
      <div class="course__accor">
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
                  @click.prevent="changeVideo('690401768')"
                  :class="{'active': nowVid == '690401768'}">
                    <i class="far fa-circle me-2 d-inline-block"></i>
                    <!-- <i class="fas fa-check"></i> -->
                    <span class="title" style="flex: 1 1 0%;">SOLIDWORKS基礎與使用者介面</span>
                    <span class="time">07:29</span>
                  </li>
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
          <!-- <div class="accordion-item">
            <h2 class="accordion-header" id="L2">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                第2章 草圖繪製
              </button>
            </h2>
            <div id="collapse2" class="accordion-collapse collapse" aria-labelledby="heading2" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <ul>
                  <li class="course__accor__list d-flex justify-content-between">
                    <i class="far fa-circle me-2 d-inline-block"></i>
                    <span class="title" style="flex: 1 1 0%;">SOLIDWORKS基礎與使用者介面</span>
                    <span class="time">07:29</span>
                  </li>
                  <li class="course__accor__list d-flex justify-content-between">
                    <i class="far fa-circle me-2 d-inline-block"></i>
                    <span class="title" style="flex: 1 1 0%;">SOLIDWORKS基礎與使用者介面</span>
                    <span class="time">07:29</span>
                  </li>
                  <li class="course__accor__list d-flex justify-content-between">
                    <i class="far fa-circle me-2 d-inline-block"></i>
                    <span class="title" style="flex: 1 1 0%;">SOLIDWORKS基礎與使用者介面</span>
                    <span class="time">07:29</span>
                  </li>
                  <li class="course__accor__list d-flex justify-content-between">
                    <i class="far fa-circle me-2 d-inline-block"></i>
                    <span class="title" style="flex: 1 1 0%;">SOLIDWORKS基礎與使用者介面</span>
                    <span class="time">07:29</span>
                  </li>
                  <li class="course__accor__list d-flex justify-content-between">
                    <i class="far fa-circle me-2 d-inline-block"></i>
                    <span class="title" style="flex: 1 1 0%;">SOLIDWORKS基礎與使用者介面</span>
                    <span class="time">07:29</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="L3">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                第3章 基本零件建模
              </button>
            </h2>
            <div id="collapse3" class="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <ul>
                  <li class="course__accor__list d-flex justify-content-between">
                    <i class="far fa-circle me-2 d-inline-block"></i>
                    <span class="title" style="flex: 1 1 0%;">SOLIDWORKS基礎與使用者介面</span>
                    <span class="time">07:29</span>
                  </li>
                  <li class="course__accor__list d-flex justify-content-between">
                    <i class="far fa-circle me-2 d-inline-block"></i>
                    <span class="title" style="flex: 1 1 0%;">SOLIDWORKS基礎與使用者介面</span>
                    <span class="time">07:29</span>
                  </li>
                  <li class="course__accor__list d-flex justify-content-between">
                    <i class="far fa-circle me-2 d-inline-block"></i>
                    <span class="title" style="flex: 1 1 0%;">SOLIDWORKS基礎與使用者介面</span>
                    <span class="time">07:29</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="L4">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                第4章 對稱與拔模
              </button>
            </h2>
            <div id="collapse4" class="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <ul>
                  <li class="course__accor__list d-flex justify-content-between">
                    <i class="far fa-circle me-2 d-inline-block"></i>
                    <span class="title" style="flex: 1 1 0%;">SOLIDWORKS基礎與使用者介面</span>
                    <span class="time">07:29</span>
                  </li>
                  <li class="course__accor__list d-flex justify-content-between">
                    <i class="far fa-circle me-2 d-inline-block"></i>
                    <span class="title" style="flex: 1 1 0%;">SOLIDWORKS基礎與使用者介面</span>
                    <span class="time">07:29</span>
                  </li>
                  <li class="course__accor__list d-flex justify-content-between">
                    <i class="far fa-circle me-2 d-inline-block"></i>
                    <span class="title" style="flex: 1 1 0%;">SOLIDWORKS基礎與使用者介面</span>
                    <span class="time">07:29</span>
                  </li>
                </ul>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Meta_List',
  props: ['vid', 'chapters'],
  data() {
    return {
      nowVid: '',
    }
  },
  methods: {
    changeVideo(vid) {
      this.$emit('changeVideo', vid);
      this.handlenowVid();
    },
    handlenowVid() {
      this.nowVid = this.vid;
    },
  },
  computed: {
    totalSection() {
      let i = 0;
      this.chapters.forEach(el => {
        el.subChapter.forEach(sub => {
          i ++;
        })
      });
      console.log(i);
      return i;
    },
  },
  created(){
    this.handlenowVid();
  }
}

</script>