<template>
  <div>
    <Breadcrumb activePage="通知" />
    <div class="notification">
      <select class="form-select notification__filter ms-auto mb-3" aria-label="Default select example" v-model="filter">
        <option selected value="ascending">新到舊</option>
        <option value="descending">舊到新</option>
      </select>
      <div class="row">
        <div 
          class="col-12 my-2 notification__box p-4 d-flex justify-content-between"
          v-for="item in msgs"
          :key="item.id"
          data-bs-toggle="modal"
          data-bs-target="#contentModal"
          @click.prevent="openModal(item)"
        >
          <div>
            <h4 class="notification__title">{{ item.title }}</h4>
            <p class="notification__txt">{{ item.text }}</p>
          </div>
          <span class="d-block d-flex align-items-center">{{ item.time }}</span>
        </div>
      </div>
      <div class="modal fade" id="contentModal" tabindex="-1" aria-labelledby="contentModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="contentModalLabel">通知</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-start">
              <h2 class="modal-title fw-bold modal-msg-title">{{ openedMsg.title }}</h2>
              <p class="modal-text">{{ openedMsg.text }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'

export default {
  name: 'Notification',
  components: {
    Breadcrumb,
  },
  data() {
    return {
      filter: 'ascending',
      msgs: [{
        id: 0,
        title: 'Title1',
        text: 'txttxtxxtx',
        time: '1 天前',
        read: false,
      }, {
        id: 1,
        title: 'Title2',
        text: 'txttxtxxtx',
        time: '1 天前',
        read: false,
      }, {
        id: 2,
        title: 'Title3',
        text: 'txttxtxxtx',
        time: '1 天前',
        read: false,
      }],
      openedMsg: {}
    }
  },
  watch: {
    filter: function() {
      this.sortData();
    }
  },
  methods: {
    openModal(item) {
      this.openedMsg = Object.assign({}, item);
    },
    sortData() {

    }
  }
}
</script>