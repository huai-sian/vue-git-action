<template>
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
            v-model="link" v-if="!GetLink || editing"
            @focus="editing = true">
          <span v-if="GetLink && editing == false" @dblclick="editing = true">{{ GetLink }}</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-main" @click.prevent="save" data-bs-dismiss="modal">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditChapterModal',
  props: ['tempLink'],
  data() {
    return {
      link: '',
      editing: false,
    }
  },
  methods: {
    save() {
      this.$emit('saveLink', this.link);
      this.link = '';
      
    }
  },
  computed: {
    GetLink() {
      return this.tempLink;
    }
  },
  created() {
    this.link = this.tempLink;
    console.log(this.tempLink);
  }
}
</script>