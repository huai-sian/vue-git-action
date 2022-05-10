<template>
  <div>
     <div v-for="(item, i) in syllabus" :key="item.id">
      <Test :data="item" :i='i' ></Test> 
    </div>
  </div>
</template>

<script>
import Test from '../components/test';
export default {
  data(){
    return {
      syllabus: [],
    }
  },
  components: {
    Test,
  },
  created() {
    this.syllabus = [{
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
  },
  {
    id: '56719',
    title: '1-1a',
    video: '',
    desc: '',
    lock: true,
    section: [{
      id: '45266',
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
  }]
  }
}
</script>