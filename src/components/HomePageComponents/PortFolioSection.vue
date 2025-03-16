<template>
  <section class="portfolio-section" ref="portfolioSection">

    <h2 class="stack-heading">{{ typedStackTitle }}</h2>
    <p class="stack-description">{{ typedStackDesc }}</p>


    <div class="stack-row top-row">
      <div
        v-for="tech in firstRowItems"
        :key="tech.name"
        class="stack-item"
        :class="{ 'fade-in': isBoxesVisible }"
      >

        <div class="category-header">
          <img
            v-if="tech.image"
            :src="tech.image"
            :alt="tech.name"
            class="category-image-left"
          />
          <h3>{{ tech.name }}</h3>
        </div>


        <ul class="stack-points">
          <li
            v-for="(item, index) in tech.items"
            :key="index"
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.text"
              class="bullet-image"
            />
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>


    <div class="stack-row bottom-row">
      <div
        v-for="tech in secondRowItems"
        :key="tech.name"
        class="stack-item"
        :class="{ 'fade-in': isBoxesVisible }"
      >
        <div class="category-header">
          <img
            v-if="tech.image"
            :src="tech.image"
            :alt="tech.name"
            class="category-image-left"
          />
          <h3>{{ tech.name }}</h3>
        </div>

        <ul class="stack-points">
          <li
            v-for="(item, index) in tech.items"
            :key="index"
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.text"
              class="bullet-image"
            />
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>


    <hr class="portfolio-end-line" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface TechStackItem {
  text: string
  image?: string
}

interface TechStackCategory {
  name: string
  items: TechStackItem[]
  image?: string
}


const techStack = ref<TechStackCategory[]>([
  {
    name: 'Cloud',
    image: 'images/cloud.png',
    items: [
      { text: 'AWS - Expert', image: 'images/aws.png' },
      { text: 'Azure - Novice', image: 'images/azure.png' },
    ],
  },
  {
    name: 'Programming & Scripting',
    image: 'images/programming.png',
    items: [
      { text: 'Python', image: 'images/python.png' },
      { text: 'Java', image: 'images/java.png' },
      { text: 'Golang', image: 'images/golang.png' },
      { text: 'Shell Scripting', image: 'images/shell.png' },
    ],
  },
  {
    name: 'Databases',
    image: 'images/databases.png',
    items: [
      { text: 'PostgreSQL', image: 'images/postgres.png' },
      { text: 'DynamoDB', image: 'images/dynamodb.png' },
      { text: 'MongoDB', image: 'images/mongodb.png' },
    ],
  },
  {
    name: 'Containerization & Orchestration',
    image: 'images/containers.png',
    items: [
      { text: 'Docker', image: 'images/docker.png' },
      { text: 'Kubernetes', image: 'images/kubernetes.png' },
      { text: 'ECS', image: 'images/ecs.svg' },
      { text: 'EKS', image: 'images/eks.svg' },
    ],
  },
  {
    name: 'CI/CD',
    image: 'images/cicd.png',
    items: [
      { text: 'Jenkins', image: 'images/jenkins.png' },
      { text: 'GitHub Actions', image: 'images/github.png' },
      { text: 'GitLab CI', image: 'images/gitlab.png' },
    ],
  },
  {
    name: 'Infrastructure as Code',
    image: 'images/iac.png',
    items: [
      { text: 'Terraform', image: 'images/terraform.png' },
      { text: 'CloudFormation', image: 'images/cloudformation.svg' },
      { text: 'AWS CDK', image: 'images/cdk.svg' },
    ],
  },
  {
    name: 'Monitoring & Logging',
    image: 'images/monitoring.png',
    items: [
      { text: 'Prometheus', image: 'images/prometheus.png' },
      { text: 'Grafana', image: 'images/grafana.png' },
      { text: 'CloudWatch', image: 'images/cloudwatch.svg' },
      { text: 'ELK', image: 'images/elasticsearch.png' },
    ],
  },
])


const stackTitleFull = "My Stack"
const stackDescFull = "These are the technologies I've worked with"

const typedStackTitle = ref("")
const typedStackDesc = ref("")

const isInView = ref(false)
const isBoxesVisible = ref(false)
const portfolioSection = ref<HTMLElement | null>(null)

function typeString(target: { value: string }, text: string, speed: number): Promise<void> {
  return new Promise((resolve) => {
    let index = 0
    const intervalId = window.setInterval(() => {
      target.value += text[index]
      index++
      if (index >= text.length) {
        clearInterval(intervalId)
        resolve()
      }
    }, speed)
  })
}

async function startTyping() {
  await typeString(typedStackTitle, stackTitleFull, 50)
  await typeString(typedStackDesc, stackDescFull, 40)
  isBoxesVisible.value = true
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isInView.value) {
        isInView.value = true
        startTyping()
      }
    })
  }, { threshold: 0.2 })

  if (portfolioSection.value) {
    observer.observe(portfolioSection.value)
  }
})


const firstRowItems = techStack.value.slice(0, 4)
const secondRowItems = techStack.value.slice(4)
</script>

<style>

.portfolio-section {
  margin: 0 1rem 0.5rem;
  text-align: center;
  font-family: monospace;
  position: relative;
  padding: 1rem;
}


.stack-heading {
  font-size: 2rem;
  margin-bottom: 0.2rem;
}
.stack-description {
  font-size: 1rem;
  margin-bottom: 2rem;
}

.stack-row {
  display: flex;
  align-items: stretch;
  gap: 2rem;
  margin-bottom: 2rem;
}
.top-row {
  justify-content: center;
}
.bottom-row {
  justify-content: center;
}

.stack-item {
  width: 225px;
  height: 225px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-align: left;
  overflow-y: auto;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.stack-item.fade-in {
  opacity: 1;
  transform: translateY(0);
}

body.dark-mode .stack-item {
  border: 1px solid #fff;
}
body.light-mode .stack-item {
  border: 2px solid #000;
}


.category-header {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
  overflow: hidden;
}
.category-image-left {
  width: 40px;
  height: auto;
}

.stack-points {
  padding-left: 2.5rem;
  margin: 0;
  list-style-type: disc;
}
.stack-points li {
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  box-sizing: border-box;
}
.bullet-image {
  width: 24px;
  height: auto;
  margin-right: 0.5rem;
}

.portfolio-end-line {
  border: none;
  border-top: 2px solid;
  margin: 10rem auto 0;
  width: 80%;
}


@media screen and (max-width: 480px) {
  .portfolio-section {
    padding: 1rem 0.5rem;  /* a bit less horizontal padding */
  }

  /* Use a grid layout for each row on mobile */
  .stack-row {
    display: grid;
    grid-template-columns: 1fr; /* Single column by default on very narrow screens */
    gap: 1rem;
    margin-bottom: 1rem;
  }

  /* If you want two columns on slightly wider phones, use a media query inside another:
     e.g., @media screen and (min-width: 360px) and (max-width: 480px) { ... }
     to change grid-template-columns: 1fr 1fr;
     But for now, let's keep it single column for simplicity. */

  .stack-item {
    width: 100%;   /* Let it stretch naturally */
    max-width: 300px;  /* Optional: cap the width so items don’t get too large */
    height: auto;  /* Remove the fixed height so content can grow */
    margin: 0 auto;/* Center each item within its grid cell */
  }

  /* If you want the text left-aligned even on mobile, remove this override */
  .stack-item {
    text-align: left;
  }

  .category-header {
    margin-bottom: 0.5rem;  /* Tighter spacing on mobile */
  }

  .stack-points {
    padding-left: 1.5rem;   /* Slightly less indentation */
  }

  .stack-points li {
    max-width: 100%;        /* Let text wrap without overflowing */
  }

  .portfolio-end-line {
    margin: 3rem auto 0;    /* Bring the HR closer if desired */
  }
}


</style>
