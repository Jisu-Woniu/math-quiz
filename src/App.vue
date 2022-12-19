<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="navbar navbar-expand-sm text-bg-light sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand">
        <i class="bi bi-calculator"></i>
        四则运算自测系统
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarContent"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/">
              <i class="bi bi-pencil-square"></i>
              测试
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/settings/">
              <i class="bi bi-gear"></i>
              设置
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container-md router-view">
    <RouterView />
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
}

.router-view {
  align-self: center;
}
</style>
