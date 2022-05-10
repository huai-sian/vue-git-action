<template>
  <div class="footer py-5 text-start">
    <div class="container px-4">
      <div class="row">
        <div class="col-12 col-3 col-md-3 order-2 order-md-1 mb-4">
          <h5 class="footer__title fw-bold mb-2">關於博碩</h5>
          <p class="footer__txt">隨著 5G 即將現世，雲世代已然成為世界潮流的趨勢。
            博碩文化為了提供客戶更好的服務，所以也將服務升級化。
            全心全意為所有服務的對象打造一個全新的軟體教育平台。
            期待藉由網路科技的進步，讓大家能享受更為便捷的服務。</p>
        </div>
        <div class="col-12 col-sm-6 col-md-3 order-3 order-md-2 mb-4">
          <h5 class="footer__title fw-bold mb-2">熱門分類</h5>
          <ul class="footer__list">
            <li class="footer__list__item mb-2">電腦資訊</li>
            <li class="footer__list__item mb-2">概論</li>
            <li class="footer__list__item mb-2">學科教學</li>
            <li class="footer__list__item mb-2">3D 繪圖</li>
          </ul>
        </div>
        <div class="col-12 col-sm-6 col-md-3 order-4 order-md-3 mb-4">
          <h5 class="footer__title fw-bold mb-2">追蹤動態</h5>
          <div class="d-flex">
            <div><a href="https://www.facebook.com/DrMasterTW/"><img src="../assets/images/facebook.svg" alt=""></a></div>
            <div><a href="https://www.instagram.com/drmaster_tw/"><img src="../assets/images/instagram.svg" alt=""></a></div>
            <div><a href="https://www.youtube.com/user/DrMasterTW"><img src="../assets/images/youtube-squared.svg" alt=""></a></div>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-3 order-1 order-md-4 footer__email mb-4">
          <label for="subcribeEmail" class="d-block mb-2 fw-bold">訂閱電子報</label>
          <input type="email" id="subcribeEmail" class="d-block mb-2 form-control" placeholder="name@example.com">
          <button class="btn btn-prmiary btn-subscibe d-block mb-2">送出</button>
        </div>
      </div>
    </div>
    <div class="container-fluid text-center">
      <hr>
      <small class="footer__copyright">博碩數位學院 © 保留所有版權</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>