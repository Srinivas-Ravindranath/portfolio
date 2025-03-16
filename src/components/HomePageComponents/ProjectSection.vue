<template>
  <section ref="sectionRef" class="projects-section">

    <h1 class="section-heading">{{ typedHeading }}</h1>


    <transition-group name="fade" tag="div" class="projects-list">
      <template v-for="project in projects" :key="project.id">

        <ProjectCard :project="project" :animate="animateProjects" />
      </template>
    </transition-group>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProjectCard from './ProjectCard.vue'

interface ProjectLink {
  label: string
  url?: string
}

interface Project {
  id: number
  projectName: string
  projectImage: string
  projectDescription: string
  links: ProjectLink[]
}

const projects = ref<Project[]>([
  {
    id: 1,
    projectName: "Automation Demo",
    projectImage: "/images/automation.png",
    projectDescription:
      "An automation demo that showcases setting up a simple web app on AWS using Jenkins and Terraform and also showcases some automation scripts that can be run which leverages python and shell scripts",
    links: [
      { label: "Python", url: "https://github.com/Srinivas-Ravindranath/automation-demo/tree/main/python" },
      { label: "Jenkins", url: "https://github.com/Srinivas-Ravindranath/automation-demo/tree/main/jenkinsfiles" },
      { label: "Shell", url: "https://github.com/Srinivas-Ravindranath/automation-demo/tree/main/shell/PatchManager" },
      { label: "Terraform", url: "https://github.com/Srinivas-Ravindranath/automation-demo/tree/main/python/Terraform" },
    ]
  },
  {
    id: 2,
    projectName: "MLOps",
    projectImage: "images/ml.png",
    projectDescription: "Building an end-to-end MLOps pipeline that leverages best Ops practices on AWS and CI/CD Tools",
    links: [
      { label: "Under Construction" },
    ]
  }
]);


const typedHeading = ref("");
const animateProjects = ref(false);
const sectionRef = ref<HTMLElement | null>(null);


function typeHeading(text: string, speed: number) {
  return new Promise<void>((resolve) => {
    let index = 0;
    const interval = setInterval(() => {
      typedHeading.value += text[index];
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}


onMounted(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          typeHeading("Projects", 100).then(() => {
            animateProjects.value = true;
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});
</script>

<style>

.projects-section {
  margin: 2rem auto;
  max-width: 1000px;
  padding: 1rem;
  font-family: monospace;
  text-align: center;
}


.section-heading {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}


.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}


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
