<template>
  <div class="about-view">
    <NavBar />

    <main>
      <HeaderViewView />
      <WorkExperiences />
    </main>

  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import HeaderViewView from '@/components/AboutSectionComponents/HeaderView.vue'
import WorkExperiences from '@/components/AboutSectionComponents/WorkExperiences.vue'

</script>

<style scoped>
.home-view {
  /* optional styling */
}
</style>
