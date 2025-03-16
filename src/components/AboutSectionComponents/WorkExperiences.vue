<template>
  <section class="experience-section">
    <article
      v-for="(item, index) in experiences"
      :key="index"
      class="experience"
      :class="{ visible: visibleIndices.includes(index) }"
      :data-index="index"
    >
      <h2 class="job-title">{{ item.title }}</h2>


      <div class="company-line">
        <span class="company">{{ item.company }}</span>
        <span class="date-right">{{ item.date }}</span>
      </div>

      <p class="description">
        {{ item.summary }}
      </p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'


const experiences = [
  {
    title: 'DevOps Engineer',
    company: 'Syncron',
    date: 'Oct 2021 – Aug 2023',
    summary: `Led the creation of reusable Terraform modules, boosted CI/CD performance with specialized EKS worker
              nodes, and transformed Jenkins scripts into Python-based Jinja templates to cut pipeline runtimes by 35%.`
  },
  {
    title: 'Associate DevOps Engineer',
    company: 'Syncron',
    date: 'Mar 2021 – Aug 2021',
    summary: `Enhanced SFTP security with IP whitelisting (slashing intrusions by 80%), oversaw AWS resource optimization,
              and automated routine tasks in Python/Shell to streamline daily operations.`
  },
  {
    title: 'DevOps Intern',
    company: 'Syncron',
    date: 'Sep 2020 – Feb 2021',
    summary: `Implemented AWS CloudWatch Insights for real-time SFTP server monitoring (cut incident response by 40%),
              automated Terraform/Jenkins pipelines, and built Python scripts for internal reporting.`
  },
  {
    title: 'Cloud Developer Intern',
    company: 'Pace Wisdom',
    date: 'Jun 2019 – Jul 2019',
    summary: `Created a self-service Python tool that tapped into AWS accounts to reveal vital EC2, Lambda, S3, and RDS info,
              vastly improving multi-account visibility.`
  }
]

const visibleIndices = ref<number[]>([])

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const index = parseInt(entry.target.getAttribute('data-index') || '', 10)
      if (entry.isIntersecting && !visibleIndices.value.includes(index)) {
        visibleIndices.value.push(index)
      }
    })
  }, {
    threshold: 0.1
  })

  const articles = document.querySelectorAll('.experience')
  articles.forEach(el => observer.observe(el))
})
</script>

<style scoped>
.experience-section {
  width: 80%;
  max-width: 900px;
  margin: 4rem auto;
  color: inherit;
  font-family: monospace;
}


.experience {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  padding-bottom: 2rem;
  border-bottom: 2px solid currentColor;
  margin-bottom: 2rem;
}


.experience:last-child {
  margin-bottom: 5rem;
}


.experience.visible {
  opacity: 1;
  transform: translateY(0);
}


.job-title {
  font-size: 1.8rem;
  margin: 0 0 0.3rem;
  font-weight: bold;
}

.company-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
}


.company {
  font-size: 1.4rem;
}

.date-right {
  font-size: 1rem;
  color: #aaa;
}

.description {
  font-size: 1rem;
  margin: 0;
  line-height: 1.4;
}
</style>
