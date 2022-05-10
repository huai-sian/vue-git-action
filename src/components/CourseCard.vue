<template>
  <!-- <div class="col-12 col-sm-6 col-lg-4 mb-4"> -->
    <!-- <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <div class="courses__img overflow-hidden">
            <img src="https://www.drmaster.net/edu/wp-content/uploads/2021/05/MO12104_s.jpg" alt="wp-content" class="img-fluid">
          </div>
        </div>
        <div class="col-md-9">
          <div class="card-body text-start">
            <a href="" class="courses__link"><h5 class="card-title fw-bold courses__card-title">Card title</h5></a>
            <div class="d-flex align-items-center mt-1">
              <span class="courses__rating">( <small>0</small> 評價 )</span>
              <span class="courses__students"><small>5667</small> 學生</span>
            </div>
            <p class="card-text my-2">This is a wider card..</p>
            <hr style="background-color: #ABB2B9;">
            <button class="btn btn-main d-block ms-auto ">繼續課程</button>
          </div>
        </div>
      </div>
    </div> -->
    <div class="card courses__card" @click.prevent='$router.push(`/course/${course.id}`)'>
      <slot name="edit"></slot>
      <img src="../assets/images/hero.svg" alt="" v-if="!course.imgUrl">
      <img :src="course.imgUrl" class="card-img-top img-fluid courses__img" alt="..." v-if="course.imgUrl">
      <div class="card-body text-start py-4">
        <h5 class="card-title courses__card-title fw-bold">{{ course.name }}</h5>
        <div class="d-flex align-items-end mb-2">
          <div class="courses__rating me-2">
            <i class="fas fa-star courses__rating__star"></i>
            <i class="fas fa-star courses__rating__star"></i>
            <i class="fas fa-star courses__rating__star"></i>
            <i class="fas fa-star courses__rating__star"></i>
            <i class="fas fa-star courses__rating__star"></i>
          </div>
          <span class="card-subtitle text-muted d-inline-block"><small>{{ course.ratingCount }}</small> 則評價</span>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <span href="#" class="card-subtitle text-muted"><small>{{ course.numberOfStudent }}</small> 位學生</span>
          <strong class="text-right courses__card-price">NT$ <span>{{ course.price}}</span></strong>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'CourseCard',
  props: ['course'],
  data() {
    return {

    }
  }
};
</script>