<template>
  <router-view />
  <CustomCursor />
</template>

<script setup lang="ts">
import CustomCursor from 'components/CustomCursor.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #1a1a1d;
}

#app {
  width: 100%;
  height: 100%;
}

.full-height {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-h2 {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 500;
}
</style>
