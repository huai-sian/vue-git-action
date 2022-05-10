<template>
  <div>
    <div class="pagetitle text-start">
        <h1 class="pagetitle__title mb-2">{{ activePage }}</h1>
        <nav>
          <ol class="breadcrumb mb-3">
            <li class="breadcrumb-item">首頁</li>
            <li class="breadcrumb-item">使用者</li>
            <li class="breadcrumb-item active">{{ activePage }}</li>
          </ol>
        </nav>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    activePage: String,
  },
}
</script>