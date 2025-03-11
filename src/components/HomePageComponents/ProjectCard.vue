<template>
  <div class="project-card">

    <transition name="fade">
      <h2 v-if="showName" class="project-name">{{ project.projectName }}</h2>
    </transition>


    <transition name="fade">
      <img
        v-if="showImage"
        :src="project.projectImage"
        alt="Project Image"
        class="project-image"
      />
    </transition>


    <transition name="fade">
      <p v-if="showDescription" class="project-description">
        {{ project.projectDescription }}
      </p>
    </transition>


    <transition name="fade">
      <div v-if="showLinks" class="project-links">
        <a
          v-for="(link, index) in project.links"
          :key="index"
          :href="link.url"
          target="_blank"
          rel="noopener"
        >
          {{ link.label }}
        </a>
      </div>
    </transition>


    <transition name="fade">
      <hr v-if="showSeparator" class="project-separator" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface ProjectLink {
  label: string
  url?: string
}

interface Project {
  projectName: string
  projectImage: string
  projectDescription: string
  links: ProjectLink[]
}

const props = defineProps<{ project: Project, animate: boolean }>();

const showName = ref(false);
const showImage = ref(false);
const showDescription = ref(false);
const showLinks = ref(false);
const showSeparator = ref(false);


function animateCard() {
  setTimeout(() => {
    showName.value = true;
    setTimeout(() => {
      showImage.value = true;
      setTimeout(() => {
        showDescription.value = true;
        setTimeout(() => {
          showLinks.value = true;
          setTimeout(() => {
            showSeparator.value = true;
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  }, 300);
}


watch(() => props.animate, (newVal) => {
  if (newVal) {
    animateCard();
  }
});


onMounted(() => {
  if (props.animate) {
    animateCard();
  }
});
</script>

<style>


.project-card {
  padding: 1rem;
  text-align: left;
  font-family: monospace;
}


.project-name {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.project-image {
  width: 128px;
  height: 128px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.project-description {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.project-links a {
  text-decoration: underline;
  margin-right: 1rem;

  color: inherit;
}

.project-separator {
  border: none;
  border-top: 2px solid;
  margin-top: 1.5rem;
}

/* If you want the separator to switch color:
   body.dark-mode .project-separator { border-top-color: #fff; }
   body.light-mode .project-separator { border-top-color: #000; }
*/


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
