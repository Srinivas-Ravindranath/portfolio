<template>
  <div class="home-view">
    <NavBar />

    <main>
      <HeaderView />
      <PortfolioSection />
      <ProjectsSection />
    </main>

    <FooterHero />

  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import HeaderView from '@/components/HomePageComponents/HeaderView.vue'
import PortfolioSection from '@/components/HomePageComponents/PortFolioSection.vue'
import ProjectsSection from '@/components/HomePageComponents/ProjectSection.vue'
import FooterHero from '@/components/HomePageComponents/FooterHero.vue'
</script>

<style scoped>
.home-view {
  /* optional styling */
}
</style>
