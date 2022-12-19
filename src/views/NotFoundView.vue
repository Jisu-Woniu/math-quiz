<script setup lang="ts"></script>
<template>
  <main>
    <h1>页面走丢了……</h1>
    你要找的东西可能在另一个世界
    <RouterLink to="/" class="btn btn-primary btn-lg">带我回去</RouterLink>
  </main>
</template>
<style scoped>
main {
  display: flex;
  min-height: 50vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
