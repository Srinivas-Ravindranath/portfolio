<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/" class="nav-link">HOME</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about-me" class="nav-link">ABOUT ME</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/blog" class="nav-link">BLOG</router-link>
      </li>
      <li class="nav-toggle-item">
        <div
          class="nav-circle"
          @click="toggleTheme"
          @mouseover="showLabel = true"
          @mouseleave="showLabel = false"
        >
          <img class="icon" :src="isDark ? darkIcon : lightIcon" alt="Toggle theme" />
          <span class="theme-label" v-if="showLabel">
            {{ isDark ? 'LIGHT' : 'DARK' }}
          </span>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import darkIcon from '@/components/icons/dark.png'
import lightIcon from '@/components/icons/light.png'

const isDark = ref(true)
const showLabel = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    isDark.value = false
  } else {
    isDark.value = true
  }
  if (isDark.value) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.add('light-mode')
  }
})

watch(isDark, (newVal) => {
  if (newVal) {
    document.body.classList.add('dark-mode')
    document.body.classList.remove('light-mode')
    localStorage.setItem('theme', 'dark')
  } else {
    document.body.classList.add('light-mode')
    document.body.classList.remove('dark-mode')
    localStorage.setItem('theme', 'light')
  }
})
</script>

<style scoped>

.navbar {
  background-color: #000;
  border-top: 4px solid #331e00;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  font-family: monospace;
  overflow: visible;
}

.nav-list {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-item {
  width: 140px;
  border: 1px solid #fff;
  padding: 0.75rem 1rem;
  text-align: center;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-item:hover {
  transform: scale(1.05);
}

/* Optional styling for router-links */
.nav-link {
  text-decoration: none;
  color: inherit;
}

.nav-toggle-item {
  display: flex;
  align-items: center;
}

.nav-circle {
  margin-left: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.nav-circle:hover {
  transform: scale(1.1);
}

.icon {
  width: 1.2rem;
  height: 1.2rem;
}

.theme-label {
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 0.25rem;
  padding: 0.3rem 0.5rem;
  white-space: nowrap;
  font-size: 0.8rem;
  text-align: center;
  z-index: 9999;
}


body.light-mode .navbar {
  background-color: #f3f3f3;
  border-top: 4px solid #ccc;
  color: #000;
}

body.light-mode .nav-item {
  border: 1px solid #444;
  color: #000;
}

body.light-mode .nav-circle {
  border: 1px solid #000;
}

body.light-mode .theme-label {
  background-color: #f3f3f3;
  color: #000;
  border: 1px solid #000;
}

@media screen and (max-width: 480px) {
  /* Keep the navbar horizontal but make it smaller and centered */
  .navbar {
    display: flex;
    flex-direction: row;        /* Remain horizontal */
    justify-content: center;    /* Center horizontally */
    align-items: center;        /* Center vertically */
    padding: 1rem;           /* Slightly less padding on mobile */
  }

  /* Ensure the nav list is horizontal and centered */
  .nav-list {
    display: flex;
    flex-direction: row;        /* Horizontal layout */
    justify-content: center;    /* Center horizontally */
    align-items: center;        /* Center vertically */
    margin: 0;
    padding: 0;
    margin-left: 3rem;
  }

  /* Make each nav item smaller and let width adjust automatically */
  .nav-item {
    width: auto;                /* Override the fixed width */
    padding: 0.5rem 1rem;       /* Reduce padding for mobile */
    font-size: 0.9rem;          /* Slightly smaller text (optional) */
    margin: 0;                  /* Remove extra margins if any */
  }

  /* Keep the theme toggle inline with other items if you want */
  .nav-toggle-item {
    margin-top: 0;
  }

  .nav-circle {
    margin-left: 1.5rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 2.0rem;
    height: 2.0rem;
    border: 1px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s;
  }
}

</style>
