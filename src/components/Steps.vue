<template>
  <div class='progressStep px-md-4 mb-5'>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <div class='step d-flex flex-column align-items-center' :class="{'now':current === 1}">
            <div class="step__circle mb-3 d-flex justify-content-center align-items-center"
              @click.prevent="$router.push(`/dashboard/edit_course/basic`)">1</div>
            <p>課程標題與描述</p>
          </div>
        </div>
        <div class="col-3">
          <div class='step d-flex flex-column align-items-center' :class="{'now':current === 2}">
            <div class="step__circle mb-3 d-flex justify-content-center align-items-center"
              @click.prevent="$router.push(`/dashboard/edit_course/syllabus`)">2</div>
            <p>單元編輯</p>
          </div>
        </div>
        <div class="col-3">
          <div class='step d-flex flex-column align-items-center' :class="{'now':current === 3}">
            <div class="step__circle mb-3 d-flex justify-content-center align-items-center"
              @click.prevent="$router.push(`/dashboard/edit_course/pricing`)">3</div>
            <p>定價</p>
          </div>
        </div>
        <div class="col-3">
          <div class='step d-flex flex-column align-items-center' :class="{'now':current === 4}">
            <div class="step__circle mb-3 d-flex justify-content-center align-items-center"
              @click.prevent="$router.push(`/dashboard/edit_course/online`)">4</div>
            <p>發布課程</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Steps',
  props: ['current', 'link'],
  
}
</script>

<style lang="scss" scoped>
  $main: #012970;
  $greytxt: #6c757d;
  .step {
    &.now {
      .step__circle {
        background-color: $main;
      }
    }
    &__circle {
      border-radius: 50%;
      background-color: $greytxt;
      width: 2.5rem;
      height: 2.5rem;
      color: white;
      cursor: pointer;
    }
  }
</style>
