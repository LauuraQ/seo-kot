<template>
  <div id="app">
    <ThemeTogle />
    <Header  />
 
    <router-view />
     <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import ThemeTogle from './components/ThemeTogle.vue'
import Footer from './components/Footer.vue'
</script>