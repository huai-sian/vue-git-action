<template>
  <div class="modal fade course__qa" id="evaluationModal" tabindex="-1" aria-labelledby="evaluationModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-0 pb-0">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="text-start mb-3">課程評分</div>
          <div class="courses__rating mb-3 text-start">
            <star-rating 
              v-model="rating"
              :show-rating="false"
              :rounded-corners="true"
              :star-size="25"
              :increment="0.5"
              :border-width="0" />
          </div>
          <h3 class="text-start fw-bold mb-2 evaluation__title" style="font-size: 1.2rem;">標題</h3>
          <input type="text" placeholder="e.g.關於課程" class="course__qa__input" v-model="title">
          <div class="text-start mt-3">評價內容</div>
          <textarea class="evaluation__desc mt-3" name="description" id="description" rows="20" v-model="description"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-main">送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: 'EvaluationModel',
  data() {
    return {
      title: '',
      rating: 5,
      description: ""
    }
  },
  components: {
    StarRating,
  }
}
</script>