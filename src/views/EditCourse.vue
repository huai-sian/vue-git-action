<template>
  <div class="editCourse">
    <router-view></router-view>
  </div>
</template>

<script>
import Steps from '../components/Steps'

export default {
  name: 'EditCourse',
  components: {
    Steps
  },
  data() {
    return {

    }
  }
}
</script>
